import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventFilters from './EventFilters';
import EventList from './EventList';
import EventListPlaceholder from './EventListPlaceholder';

function EventDashboard() {
  const { events } = useSelector(state => state.event);
  const { loading } = useSelector(state => state.async);

  return (
    <Grid>
      <Grid.Column width={10}>
        {loading && (
          <>
            <EventListPlaceholder />
            <EventListPlaceholder />
          </>
        )}
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventFilters />
      </Grid.Column>
    </Grid>
  );
}

export default EventDashboard;
