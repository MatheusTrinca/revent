import { React } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventFilters from './EventFilters';
import EventList from './EventList';
import EventListPlaceholder from './EventListPlaceholder';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import { listenToEventsFromFirestore } from '../../../app/firestore/firestoreService';
import { useDispatch } from 'react-redux';
import { listenToEvents } from '../eventActions';

function EventDashboard() {
  const { events } = useSelector(state => state.event);
  const { loading } = useSelector(state => state.async);
  const dispatch = useDispatch();

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(),
    data: events => dispatch(listenToEvents(events)),
    deps: [dispatch],
  });

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
