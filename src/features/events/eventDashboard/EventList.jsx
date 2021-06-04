import React from 'react';
import EventListItem from './EventListItem';
import InfiniteScroller from 'react-infinite-scroller';

const EventList = ({ events, getNextEvents, loading, moreEvents }) => {
  return (
    <>
      {events.length !== 0 && (
        <InfiniteScroller
          pageStart={0}
          loadMore={getNextEvents}
          hasMore={!loading && moreEvents}
          initialLoad={false}
        >
          {events.map(event => (
            <EventListItem key={event.id} event={event} />
          ))}
        </InfiniteScroller>
      )}
    </>
  );
};

export default EventList;
