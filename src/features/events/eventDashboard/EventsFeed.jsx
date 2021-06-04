import React, { useEffect } from 'react';
import { Header, Segment, Feed } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  getUserFeedRef,
  firebaseObjectToArray,
} from '../../../app/firestore/firebaseService';
import { listenToUserFeed } from '../../profiles/profileActions';
import EventFeedItem from './EventFeedItem';

export default function EventsFeed() {
  const dispatch = useDispatch();
  const { feed } = useSelector(state => state.profile);

  useEffect(() => {
    getUserFeedRef().on('value', snapshot => {
      if (!snapshot.exists()) return;
      const feed = firebaseObjectToArray(snapshot.val()).reverse();
      dispatch(listenToUserFeed(feed));
    });
    return () => {
      getUserFeedRef().off();
    };
  }, [dispatch]);

  return (
    <>
      <Header attached color="teal" content="News Feed" icon="newspaper" />
      <Segment attached="bottom">
        <Feed>
          {feed.map(post => (
            <EventFeedItem post={post} />
          ))}
        </Feed>
      </Segment>
    </>
  );
}
