import React from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';

const EventListItem = ({ event, selectEvent }) => {
  const {
    title,
    date,
    description,
    venue,
    hostedBy,
    hostPhotoURL,
    attendees,
  } = event;
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image circular size="tiny" src={hostPhotoURL} />
            <Item.Content>
              <Item.Header content={title} />
              <Item.Description>Hosted by {hostedBy}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {date}
          <Icon name="marker" /> {venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {attendees.length > 0
            ? attendees.map(attendee => (
                <EventListAttendee key={attendee.id} attendee={attendee} />
              ))
            : null}
        </List>
      </Segment>
      <Segment clearing>
        <div>{description}</div>
        <Button
          color="teal"
          floated="right"
          content="View"
          onClick={() => selectEvent(event)}
        />
      </Segment>
    </Segment.Group>
  );
};

export default EventListItem;
