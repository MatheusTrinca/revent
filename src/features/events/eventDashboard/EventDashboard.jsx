import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import EventForm from '../eventForm/EventForm';
import { sampleData } from '../../../app/api/sampleData';

function EventDashboard({ formOpen, setFormOpen, selectedEvent, selectEvent }) {
  const [events, setEvents] = useState(sampleData);

  const handleCreateEvent = event => {
    setEvents([...events, event]);
  };

  const handleUpdateEvent = updatedEvent => {
    setEvents(
      events.map(event => (event.id === updatedEvent.id ? updatedEvent : event))
    );
    selectEvent(null);
  };

  const handleDeleteEvent = eventId => {
    setEvents(events.filter(event => event.id !== eventId));
    setFormOpen(false);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={events}
          selectEvent={selectEvent}
          deleteEvent={handleDeleteEvent}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {formOpen && (
          <EventForm
            createEvent={handleCreateEvent}
            setFormOpen={setFormOpen}
            selectedEvent={selectedEvent}
            key={selectedEvent ? selectedEvent.id : null}
            updateEvent={handleUpdateEvent}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}

export default EventDashboard;
