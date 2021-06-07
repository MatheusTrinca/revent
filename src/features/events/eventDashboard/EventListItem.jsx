import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { format } from 'date-fns';

const EventListItem = ({ event }) => {
  const { title, date, description, venue, hostedBy, hostPhotoURL, attendees, userUid } = event;

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image circular size="tiny" src={hostPhotoURL} />
            <Item.Content>
              <Item.Header content={title} />
              <Item.Description>
                Hosted by <Link to={`/profile/${userUid}`}>{hostedBy}</Link>
              </Item.Description>
              {event.isCancelled && (
                <Label
                  style={{ top: -40 }}
                  ribbon="right"
                  color="red"
                  content="This event has been cancelled"
                />
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {format(date, 'MMMM d, yyyy h:mm a')}
          <Icon name="marker" /> {venue.address}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {attendees.length > 0
            ? attendees.map(attendee => <EventListAttendee key={attendee.id} attendee={attendee} />)
            : null}
        </List>
      </Segment>
      <Segment clearing>
        <div>{description}</div>
        <Button as={Link} to={`/events/${event.id}`} color="teal" floated="right" content="View" />
      </Segment>
    </Segment.Group>
  );
};

export default EventListItem;
