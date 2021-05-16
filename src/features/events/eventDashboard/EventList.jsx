import React from 'react';
import EventListItem from './EventListItem';

const EventList = ({ events, selectEvent }) => {
  return (
    <>
      {events.map(event => (
        <EventListItem key={event.id} event={event} selectEvent={selectEvent} />
      ))}
    </>
  );
};

export default EventList;
