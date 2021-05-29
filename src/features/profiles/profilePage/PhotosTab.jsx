import React, { useState } from 'react';
import { Tab, Grid, Header, Button, Card, Image } from 'semantic-ui-react';
import PhotoUploadWidget from '../../../app/common/photos/PhotoUploadWidget';
import { useSelector, useDispatch } from 'react-redux';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import { getUserPhotos, setMainPhoto } from '../../../app/firestore/firestoreService';
import { listenToUserPhotos } from '../profileActions';
import { toast } from 'react-toastify';
import { deleteFromFirebaseStorage } from '../../../app/firestore/firebaseService';
import { deletePhotoFromCollection } from '../../../app/firestore/firestoreService';

export default function AboutTab({ profile, isCurrentUser }) {
  const [editMode, setEditMode] = useState(false);
  const { loading } = useSelector(state => state.async);
  const { photos } = useSelector(state => state.profile);
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState({ isUpdating: false, target: null });
  const [deleting, setDeleting] = useState({ isDeleting: false, target: null });

  useFirestoreCollection({
    query: () => getUserPhotos(profile.id),
    data: photos => dispatch(listenToUserPhotos(photos)),
    deps: [profile.id, dispatch],
  });

  async function handleSetMainPhoto(photo, target) {
    setUpdating({ isUpdating: true, target });
    try {
      await setMainPhoto(photo);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdating({ isUpdating: false, target: null });
    }
  }

  async function handleDeletePhoto(photo, target) {
    setDeleting({ isDeleting: true, target });
    try {
      await deleteFromFirebaseStorage(photo.name);
      await deletePhotoFromCollection(photo.id);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting({ isDeleting: false, target: null });
    }
  }

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="user" content="Photos" />
          {isCurrentUser && (
            <Button
              floated="right"
              content={editMode ? 'Cancel' : 'Add photo'}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <PhotoUploadWidget setEditMode={setEditMode} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {photos.map(photo => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  <Button.Group fuild widths={2}>
                    <Button
                      name={photo.id}
                      loading={updating.isUpdating && updating.target === photo.id}
                      onClick={e => handleSetMainPhoto(photo, e.target.name)}
                      basic
                      color="teal"
                      content="Main"
                    />
                    <Button
                      name={photo.id}
                      loading={deleting.isDeleting && deleting.target === photo.id}
                      onClick={e => handleDeletePhoto(photo, e.target.name)}
                      disabled={photo.url === profile.photoURL}
                      basic
                      color="red"
                      icon="trash"
                    />
                  </Button.Group>
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
