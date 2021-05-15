import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/eventDashboard/EventDashboard';
import Navbar from '../../features/nav/Navbar';
import './styles.css';

function App() {
  return (
    <>
      <Navbar />
      <Container className="main">
        <EventDashboard />
      </Container>
    </>
  );
}

export default App;
