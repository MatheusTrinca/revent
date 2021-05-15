import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

const Navbar = ({ setFormOpen }) => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="Revents Logo"
            style={{ marginRight: '15px' }}
          />
          Revents
        </Menu.Item>
        <Menu.Item name="Events" />
        <Menu.Item>
          <Button
            positive
            inverted
            content="Create Event"
            onClick={() => setFormOpen(true)}
          />
        </Menu.Item>
        <Menu.Item position="right">
          <Button basic inverted content="Login" />
          <Button
            basic
            inverted
            content="Signup"
            style={{ marginLeft: '0.5rem' }}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
