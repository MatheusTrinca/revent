import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export default function PhotoWidgetCropper({ imagePreview, setImage }) {
  const cropper = useRef(null);

  function cropImage() {
    if (typeof cropper.current.getCroppedCanvas() === 'undefined') return;
    cropper.current.getCroppedCanvas().toBlob(blob => {
      return setImage(blob);
    }, 'image/jpeg');
  }

  return (
    <Cropper
      src={imagePreview}
      style={{ height: 200, width: '100%' }}
      aspectRatio={1}
      preview=".img-preview"
      guides={false}
      viewMode={1}
      dragMode="move"
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={cropImage}
      ref={cropper}
    />
  );
}
