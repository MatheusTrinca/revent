import firebase from '../config/firebase';

const db = firebase.firestore();

export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  };
}

export function fetchEventsFromFirestore(
  filter,
  startDate,
  limit,
  lastDocSnapshot = null
) {
  const user = firebase.auth().currentUser;
  let eventsRef = db
    .collection('events')
    .orderBy('date')
    .startAfter(lastDocSnapshot)
    .limit(limit);
  switch (filter) {
    case 'isGoing':
      return eventsRef
        .where('attendeesIds', 'array-contains', user.uid)
        .where('date', '>=', startDate);
    case 'isHosting':
      return eventsRef
        .where('userUid', '==', user.uid)
        .where('date', '>=', startDate);
    default:
      return eventsRef.where('date', '>=', startDate);
  }
}

export function listenToEventFromFirestore(eventId) {
  return db.collection('events').doc(eventId);
}

export function addEventToFirestore(event) {
  const user = firebase.auth().currentUser;
  return db.collection('events').add({
    ...event,
    userUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || null,
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null,
    }),
    attendeesIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
  });
}

export function updateEventInFirestore(event) {
  return db.collection('events').doc(event.id).update(event);
}

export function deleteEventInFirestore(eventId) {
  return db.collection('events').doc(eventId).delete();
}

export function cancelEventToggle(event) {
  return db.collection('events').doc(event.id).update({
    isCancelled: !event.isCancelled,
  });
}

export function setUserProfileData(user) {
  return db
    .collection('users')
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

export function getUserProfile(userId) {
  return db.collection('users').doc(userId);
}

export async function updateProfile(profile) {
  const user = firebase.auth().currentUser;
  try {
    if (user.displayName !== profile.displayName) {
      await user.updateProfile({
        displayName: profile.displayName,
      });
    }
    return await db.collection('users').doc(user.uid).update(profile);
  } catch (error) {
    throw error;
  }
}

export async function updateUserProfilePhoto(downloadURL, filename) {
  const user = firebase.auth().currentUser;
  const userDocRef = db.collection('users').doc(user.uid);
  try {
    const userDoc = await userDocRef.get();
    if (!userDoc.data().photoURL) {
      await db.collection('users').doc(user.uid).update({
        photoURL: downloadURL,
      });
      await user.updateProfile({
        photoURL: downloadURL,
      });
    }
    return db.collection('users').doc(user.uid).collection('photos').add({
      name: filename,
      url: downloadURL,
    });
  } catch (error) {
    throw error;
  }
}

export function getUserPhotos(userUid) {
  return db.collection('users').doc(userUid).collection('photos');
}

export async function setMainPhoto(photo) {
  const user = firebase.auth().currentUser;
  const today = new Date();
  const eventDocQuery = db
    .collection('events')
    .where('attendeesIds', 'array-contains', user.uid)
    .where('date', '>=', today);
  const userFollowingRef = db
    .collection('following')
    .doc(user.uid)
    .collection('userFollowing');

  const batch = db.batch();

  batch.update(db.collection('users').doc(user.uid), {
    photoURL: photo.url,
  });

  try {
    const eventsQuerySnap = await eventDocQuery.get();
    for (let i = 0; i < eventsQuerySnap.docs.length; i++) {
      let eventDoc = eventsQuerySnap.docs[i];
      if (eventDoc.data().hostUid === user.uid) {
        batch.update(eventsQuerySnap.docs[i].ref, {
          hostPhotoURL: photo.url,
        });
      }
      batch.update(eventsQuerySnap.docs[i].ref, {
        attendees: eventDoc.data().attendees.filter(attendee => {
          if (attendee.id === user.uid) {
            attendee.photoURL = photo.url;
          }
          return attendee;
        }),
      });
    }
    const userFollowingSnap = await userFollowingRef.get();
    userFollowingSnap.docs.forEach(docRef => {
      let followingDocRef = db
        .collection('following')
        .doc(docRef.id)
        .collection('userFollowers')
        .doc(user.uid);
      batch.update(followingDocRef, {
        photoURL: photo.url,
      });
    });

    await batch.commit();

    return await user.updateProfile({
      photoURL: photo.url,
    });
  } catch (error) {
    throw error;
  }
}

export function deletePhotoFromCollection(photoId) {
  const userId = firebase.auth().currentUser.uid;
  return db
    .collection('users')
    .doc(userId)
    .collection('photos')
    .doc(photoId)
    .delete();
}

export function addEventAttendance(event) {
  const user = firebase.auth().currentUser;
  return db
    .collection('events')
    .doc(event.id)
    .update({
      attendees: firebase.firestore.FieldValue.arrayUnion({
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL || null,
      }),
      attendeesIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
    });
}

export async function cancelEventAttendance(event) {
  const user = firebase.auth().currentUser;
  try {
    const eventDoc = await db.collection('events').doc(event.id).get();
    return db
      .collection('events')
      .doc(event.id)
      .update({
        attendeesIds: firebase.firestore.FieldValue.arrayRemove(event.id),
        attendees: eventDoc.data().attendees.filter(att => att.id !== user.uid),
      });
  } catch (error) {
    throw error;
  }
}

export function getUserEventsQuery(activeTab, userUid) {
  let eventsRef = db.collection('events');
  const today = new Date();
  switch (activeTab) {
    case 1: // Past Events
      return eventsRef
        .where('attendeesIds', 'array-contains', userUid)
        .where('date', '<=', today)
        .orderBy('date', 'desc');
    case 2: // Hosting
      return eventsRef.where('userUid', '==', userUid).orderBy('date');
    default:
      // Future Events
      return eventsRef
        .where('attendeesIds', 'array-contains', userUid)
        .where('date', '>=', today)
        .orderBy('date');
  }
}

export async function followUser(profile) {
  const user = firebase.auth().currentUser;
  const batch = db.batch();
  try {
    batch.set(
      db
        .collection('following')
        .doc(user.uid)
        .collection('userFollowing')
        .doc(profile.id),
      {
        displayName: profile.displayName,
        photoURL: profile.photoURL,
        uid: profile.id,
      }
    );
    batch.update(db.collection('users').doc(user.uid), {
      followingCount: firebase.firestore.FieldValue.increment(1),
    });
    return await batch.commit();
  } catch (error) {
    throw error;
  }
}

export async function unFollowUser(profile) {
  const user = firebase.auth().currentUser;
  const batch = db.batch();
  try {
    batch.delete(
      db
        .collection('following')
        .doc(user.uid)
        .collection('userFollowing')
        .doc(profile.id)
    );
    batch.update(db.collection('users').doc(user.uid), {
      followingCount: firebase.firestore.FieldValue.increment(-1),
    });
    await batch.commit();
  } catch (error) {
    throw error;
  }
}

export function getFollowingsCollection(profileId) {
  return db.collection('following').doc(profileId).collection('userFollowing');
}

export function getFollowersCollection(profileId) {
  return db.collection('following').doc(profileId).collection('userFollowers');
}

export function getFollowingDoc(profileId) {
  const userUid = firebase.auth().currentUser.uid;
  return db
    .collection('following')
    .doc(userUid)
    .collection('userFollowing')
    .doc(profileId)
    .get();
}
