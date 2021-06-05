import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Divider } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';

export default function UnAuthModal({ history }) {
  const [open, setOpen] = useState(true);
  const { prevLocation } = useSelector(state => state);
  const dispatch = useDispatch();

  function handleClose() {
    if (history && prevLocation) {
      history.push(prevLocation.pathname);
    } else {
      history.push('/events');
    }
    setOpen(false);
  }

  return (
    <Modal open={open} size="mini" onClose={handleClose}>
      <Modal.Header content="You need to be signed in to do that" />
      <Modal.Content>
        <p>Please either login or register to see this content</p>
        <Button.Group>
          <Button
            style={{ marginRight: 1 }}
            fluid
            color="teal"
            content="Login"
            onClick={() => dispatch(openModal({ modalType: 'LoginForm' }))}
          />
          <Button.Or />
          <Button
            style={{ marginLeft: 1 }}
            fluid
            color="green"
            content="Register"
            onClick={() => dispatch(openModal({ modalType: 'RegisterForm' }))}
          />
        </Button.Group>
        <Divider />
        <div style={{ textAlign: 'center' }}>
          <p>Or click cancel to continue as a guest</p>
          <Button onClick={handleClose} content="Cancel" />
        </div>
      </Modal.Content>
    </Modal>
  );
}
