import React from 'react';
import {
  Button,
  Container,
  Header,
  Icon,
  Image,
  Segment,
} from 'semantic-ui-react';

export default function HomePage({ history }) {
  return (
    <Segment inverted vertical textAlign="center" className="masthead">
      <Container>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            style={{ marginBottom: 11 }}
          />
          Revents
        </Header>
        <Button size="huge" inverted onClick={() => history.push('/events')}>
          Get Started
          <Icon name="right arrow" inverted />
        </Button>
      </Container>
    </Segment>
  );
}
