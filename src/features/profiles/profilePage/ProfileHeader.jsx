import React from 'react';
import { Segment, Grid, Item, Header, Statistic, Divider, Reveal, Button } from 'semantic-ui-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { followUser, unFollowUser } from '../../../app/firestore/firestoreService';

export default function ProfileHeader({ profile, isCurrentUser }) {
  const [loading, setLoading] = useState(false);

  async function handleFollowUser() {
    setLoading(true);
    try {
      await followUser(profile);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUnFollowUser() {
    setLoading(true);
    try {
      await unFollowUser(profile);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image avatar size="small" src={profile.photoURL || '/assets/user.png'} />
              <Item.Content verticalAlign="middle">
                <Header
                  as="h1"
                  style={{ display: 'block', marginBottom: 10 }}
                  content={profile.displayName}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group>
            <Statistic label="Followers" value={10} />
            <Statistic label="Following" value={5} />
          </Statistic.Group>
          {!isCurrentUser && (
            <>
              <Divider />
              <Reveal animated="move">
                <Reveal.Content visible style={{ width: '100%' }}>
                  <Button fluid color="teal" content="Following" />
                </Reveal.Content>
                <Reveal.Content hidden style={{ width: '100%' }}>
                  <Button
                    basic
                    loading={loading}
                    onClick={handleFollowUser}
                    fluid
                    color="green"
                    content="Follow"
                  />
                </Reveal.Content>
              </Reveal>
              <Button
                basic
                loading={loading}
                onClick={handleUnFollowUser}
                fluid
                color="red"
                content="Unfollow"
              />
            </>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
