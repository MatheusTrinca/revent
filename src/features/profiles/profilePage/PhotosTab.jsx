import React, { useState } from 'react';
import { Tab, Grid, Header, Button, Card, Image } from 'semantic-ui-react';
import PhotoUploadWidget from '../../../app/common/photos/PhotoUploadWidget';

export default function AboutTab({ profile, isCurrentUser }) {
  const [editMode, setEditMode] = useState(true);
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="user" content="Photos" />
          {isCurrentUser && (
            <Button
              floated="right"
              content={editMode ? 'Cancel' : 'Add photo'}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <PhotoUploadWidget />
          ) : (
            <Card.Group itemsPerRow={5}>
              <Card>
                <Image src={'/assets/user.png'} />
                <Button.Group fuild widths={2}>
                  <Button color="teal" content="Main" />
                  <Button color="red" icon="trash" />
                </Button.Group>
              </Card>
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
