import React from 'react';
import { List, Image } from 'semantic-ui-react';

const EventListAttendee = ({ attendee }) => {
  return (
    <List.Item>
      <Image
        circular
        size="mini"
        src={attendee.photoURL || '/assets/user.png'}
      />
    </List.Item>
  );
};

export default EventListAttendee;
