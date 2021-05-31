import React from 'react';
import { List, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const EventListAttendee = ({ attendee }) => {
  return (
    <List.Item as={Link} to={`/profile/${attendee.id}`}>
      <Image circular size="mini" src={attendee.photoURL || '/assets/user.png'} />
    </List.Item>
  );
};

export default EventListAttendee;
