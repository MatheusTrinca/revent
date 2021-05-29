import React, { useState } from 'react';
import { Tab, Grid, Header, Button, Divider } from 'semantic-ui-react';
import { format } from 'date-fns';
import ProfileForm from './ProfileForm';

export default function AboutTab({ profile, isCurrentUser }) {
  const [editMode, setEditMode] = useState(false);
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="user" content={`About ${profile.displayName}`} />
          {isCurrentUser && (
            <Button
              floated="right"
              content={editMode ? 'Cancel' : 'Edit'}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <ProfileForm profile={profile} setEditMode={setEditMode} />
          ) : (
            <>
              <div style={{ marginBottom: 10 }}>
                <strong>Member since: {format(profile.createdAt, 'dd MMM yyyy')}</strong>
                <Divider />
                <div>{profile.description || null}</div>
              </div>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
