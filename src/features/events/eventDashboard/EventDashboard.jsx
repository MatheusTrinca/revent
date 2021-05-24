import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventFilters from './EventFilters';
import EventList from './EventList';
import EventListPlaceholder from './EventListPlaceholder';
import {
  getEventsFromFirestore,
  dataFromSnapshot,
} from '../../../app/firestore/firestoreService';
import { useDispatch } from 'react-redux';
import { listenToEvents } from '../eventActions';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../../../app/async/asyncReduces';

function EventDashboard() {
  const { events } = useSelector(state => state.event);
  const { loading } = useSelector(state => state.async);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = getEventsFromFirestore({
      next: snapshot => {
        dispatch(
          listenToEvents(
            snapshot.docs.map(docSnapshot => dataFromSnapshot(docSnapshot))
          )
        );
        dispatch(asyncActionFinish());
      },
      error: error => dispatch(asyncActionError(error)),
      complete: console.log('You will never see this messege'),
    });
    return unsubscribe;
  }, [dispatch]);

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
