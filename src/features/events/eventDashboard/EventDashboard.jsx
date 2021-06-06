import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Loader } from 'semantic-ui-react';
import EventFilters from './EventFilters';
import EventList from './EventList';
import EventListPlaceholder from './EventListPlaceholder';
import { useDispatch } from 'react-redux';
import { fetchEvents } from '../eventActions';
import EventsFeed from './EventsFeed';
import { RETAIN_STATE } from '../eventConstants';

function EventDashboard() {
  const limit = 2;
  const {
    events,
    moreEvents,
    filter,
    startDate,
    lastVisible,
    retainState,
  } = useSelector(state => state.event);
  const { loading } = useSelector(state => state.async);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const { authenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (retainState) return;
    setLoadingInitial(true);
    dispatch(fetchEvents(filter, startDate, limit)).then(() => {
      setLoadingInitial(false);
    });
    return () => {
      dispatch({ type: RETAIN_STATE });
    };
  }, [dispatch, filter, startDate, retainState]);

  function handleFetchNextEvents() {
    dispatch(fetchEvents(filter, startDate, limit, lastVisible));
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
        <EventFilters loading={loading} />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loading} />
      </Grid.Column>
    </Grid>
  );
}

export default EventDashboard;
