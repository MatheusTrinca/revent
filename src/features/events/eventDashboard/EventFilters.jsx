import React from 'react';
import { Header, Menu } from 'semantic-ui-react';
import Calendar from 'react-calendar';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setFilter, setStartDate } from '../eventActions';

export default function EventFilters({ loading }) {
  const dispatch = useDispatch();
  const { filter, startDate } = useSelector(state => state.event);
  const { authenticated } = useSelector(state => state.auth);
  return (
    <>
      {authenticated && (
        <Menu vertical size="large" style={{ width: '100%' }}>
          <Header icon="filter" attached color="teal" content="Filters" />
          <Menu.Item
            content="All Events"
            active={filter === 'all'}
            onClick={() => dispatch(setFilter('all'))}
            disabled={loading}
          />
          <Menu.Item
            content="I'm Going"
            active={filter === 'isGoing'}
            onClick={() => dispatch(setFilter('isGoing'))}
            disabled={loading}
          />
          <Menu.Item
            content="I'm Hosting"
            active={filter === 'isHosting'}
            onClick={() => dispatch(setFilter('isHosting'))}
            disabled={loading}
          />
        </Menu>
      )}
      <Header icon="calendar" attached color="teal" content="Select Date" />
      <Calendar
        onChange={date => dispatch(setStartDate(date))}
        value={startDate || new Date()}
        tileDisabled={() => loading}
      />
    </>
  );
}
