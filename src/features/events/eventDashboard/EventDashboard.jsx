import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Loader } from 'semantic-ui-react';
import EventFilters from './EventFilters';
import EventList from './EventList';
import EventListPlaceholder from './EventListPlaceholder';
import { useDispatch } from 'react-redux';
import { fetchEvents, clearEvents } from '../eventActions';
import EventsFeed from './EventsFeed';

function EventDashboard() {
  const limit = 2;
  const { events, moreEvents } = useSelector(state => state.event);
  const { loading } = useSelector(state => state.async);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const { authenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [lastDocSnapshot, setLastDocSnapshot] = useState(null);
  const [predicate, setPredicate] = useState(
    new Map([
      ['startDate', new Date()],
      ['filter', 'all'],
    ])
  );

  useEffect(() => {
    setLoadingInitial(true);
    dispatch(fetchEvents(predicate, limit)).then(lastVisible => {
      setLastDocSnapshot(lastVisible);
      setLoadingInitial(false);
    });
    return () => {
      dispatch(clearEvents());
    };
  }, [dispatch, predicate]);

  function handleFetchNextEvents() {
    dispatch(fetchEvents(predicate, limit, lastDocSnapshot)).then(lastVisible => {
      setLastDocSnapshot(lastVisible);
    });
  }

  function handleSetPredicate(key, value) {
    dispatch(clearEvents());
    setLastDocSnapshot(null);
    setPredicate(new Map(predicate.set(key, value)));
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        {loadingInitial && (
          <>
            <EventListPlaceholder />
            <EventListPlaceholder />
          </>
        )}
        <EventList
          events={events}
          getNextEvents={handleFetchNextEvents}
          loading={loading}
          moreEvents={moreEvents}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {authenticated && <EventsFeed />}
        <EventFilters loading={loading} predicate={predicate} setPredicate={handleSetPredicate} />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loading} />
      </Grid.Column>
    </Grid>
  );
}

export default EventDashboard;
