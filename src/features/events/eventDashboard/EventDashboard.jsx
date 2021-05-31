import { React, useState } from 'react';
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
  const [predicate, setPredicate] = useState(
    new Map([
      ['startDate', new Date()],
      ['filter', 'all'],
    ])
  );

  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)));
  }

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(predicate),
    data: events => dispatch(listenToEvents(events)),
    deps: [dispatch, predicate],
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
        <EventFilters
          loading={loading}
          predicate={predicate}
          setPredicate={handleSetPredicate}
        />
      </Grid.Column>
    </Grid>
  );
}

export default EventDashboard;
