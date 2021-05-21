import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../auth/authActions';
import { useSelector } from 'react-redux';

export default function SignedInMenu() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(state => state.auth);
  return (
    <Menu.Item position="right">
      <Image
        avatar
        spaced="right"
        src={currentUser.photoURL || '/assets/user.png'}
      />
      <Dropdown pointing="top left" text={currentUser.email}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/createEvent"
            text="Create Event"
            icon="plus"
          />
          <Dropdown.Item text="My profile" icon="user" />
          <Dropdown.Item
            text="Sign out"
            icon="power"
            onClick={() => {
              dispatch(signOutUser());
              history.push('/');
            }}
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}
