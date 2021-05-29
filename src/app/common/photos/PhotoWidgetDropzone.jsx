import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Icon, Header } from 'semantic-ui-react';

export default function PhotoWidgetDropzone({ setFiles }) {
  const dropzoneStyles = {
    boder: 'dashed 3px #eee',
    borderRadius: '5px',
    paddingTop: '30px',
    textAlign: 'center',
  };

  const dropzoneActive = {
    border: 'dashed 3px green',
  };

  const onDrop = useCallback(
    acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={isDragActive ? { ...dropzoneActive, ...dropzoneStyles } : { ...dropzoneStyles }}
    >
      <input {...getInputProps()} />
      <Icon name="upload" size="huge" />
      <Header as="h4" content="Drop image here" />
    </div>
  );
}
