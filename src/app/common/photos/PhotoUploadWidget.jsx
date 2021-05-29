import React, { useState } from 'react';
import { Grid, Header, Button } from 'semantic-ui-react';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';
import PhotoWidgetCropper from './PhotoWidgetCropper';
import cuid from 'cuid';
import { getFileExtension } from '../util/util';
import { uploadToFirebaseStorage } from '../../firestore/firebaseService';
import { updateUserProfilePhoto } from '../../firestore/firestoreService';
import { toast } from 'react-toastify';

export default function PhotoUploadWidget({ setEditMode }) {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleUploadImage() {
    setLoading(true);
    const filename = cuid() + '.' + getFileExtension(files[0].name);
    const uploadTask = uploadToFirebaseStorage(image, filename);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      error => {
        toast.error(error.message);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          updateUserProfilePhoto(downloadURL, filename)
            .then(() => {
              setLoading(false);
              handleCancelCrop();
              setEditMode(false);
            })
            .catch(err => {
              toast.error(err.message);
              setLoading(false);
            });
        });
      }
    );
  }

  function handleCancelCrop() {
    setFiles([]);
    setImage(null);
    setEditMode(false);
  }

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header textAlign="center" color="teal" sub content="Step 1 - Add Photo" />
        <PhotoWidgetDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header textAlign="center" color="teal" sub content="Step 2 - Resize" />
        {files.length > 0 && (
          <PhotoWidgetCropper setImage={setImage} imagePreview={files[0].preview} />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header textAlign="center" color="teal" sub content="Step 3 - Preview & Upload" />
        {files.length > 0 && (
          <>
            <div
              className="img-preview"
              style={{ minHeight: 200, minWidth: 200, overflow: 'hidden' }}
            />
            <Button.Group>
              <Button
                disabled={loading}
                onClick={handleUploadImage}
                loading={loading}
                positive
                style={{ width: 100 }}
                icon="check"
              />
              <Button
                disabled={loading}
                onClick={handleCancelCrop}
                style={{ width: 100 }}
                icon="close"
              />
            </Button.Group>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
}
