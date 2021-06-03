const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

exports.addFollowing = functions.firestore
  .document('following/{userUid}/userFollowing/{profileId}')
  .onCreate(async (snapshot, context) => {
    const following = snapshot.data();
    console.log({ following });
    const userUid = context.params.userUid;
    const profileId = context.params.profileId;
    try {
      const userDoc = await db.collection('users').doc(userUid).get();
      const batch = db.batch();
      batch.set(
        db.collection('following').doc(profileId).collection('userFollowers').doc(userUid),
        {
          displayName: userDoc.data().displayName,
          photoURL: userDoc.data().photoURL,
          uid: userDoc.id,
        }
      );
      batch.update(db.collection('users').doc(profileId), {
        followerCount: admin.firestore.FieldValue.increment(1),
      });

      return await batch.commit();
    } catch (error) {
      return console.log(error);
    }
  });

exports.removeFollowing = functions.firestore
  .document('following/{userUid}/userFollowing/{profileId}')
  .onDelete(async (snapshot, context) => {
    const batch = db.batch();
    const userUid = context.params.userUid;
    const profileId = context.params.profileId;
    batch.delete(
      db.collection('following').doc(profileId).collection('userFollowers').doc(userUid)
    );
    batch.update(db.collection('users').doc(profileId), {
      followerCount: admin.firestore.FieldValue.increment(-1),
    });
    try {
      return await batch.commit();
    } catch (error) {
      return console.log(error);
    }
  });
