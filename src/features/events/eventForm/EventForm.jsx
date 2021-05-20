import React, { useState } from 'react';
import { Segment, Header, Button, Form } from 'semantic-ui-react';
import cuid from 'cuid';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateEvent, createEvent } from '../eventActions';
import { Formik } from 'formik';

const EventForm = ({ match, history }) => {
  const selectedEvent = useSelector(state =>
    state.event.events.find(event => event.id === match.params.id)
  );

  const dispatch = useDispatch();

  const initialValues = selectedEvent || {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: '',
  };

  const [values, setValues] = useState(initialValues);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFormSubmit = () => {
    selectedEvent
      ? dispatch(updateEvent({ ...selectedEvent, ...values }))
      : dispatch(
          createEvent({
            ...values,
            id: cuid(),
            hostedBy: 'Bob',
            attendees: [],
            hostPhotoURL: '/assets/user.png',
          })
        );
    history.push('/events');
  };

  return (
    <Segment clearing>
      <Header content={selectedEvent ? 'Edit Event' : 'Create new event'} />
      <Formik
        initialValues={initialValues}
        onSubmit={values => console.log(values)}
      >
        {({ values, handleSubmit, handleChange }) => (
          <Form className="ui form" onSubmit={handleSubmit}>
            <Form.Field>
              <input
                type="text"
                placeholder="Event title"
                name="title"
                value={values.title}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <input
                type="text"
                placeholder="Category"
                name="category"
                value={values.category}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <input
                type="text"
                placeholder="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <input
                type="text"
                placeholder="City"
                name="city"
                value={values.city}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <input
                type="text"
                placeholder="Venue"
                name="venue"
                value={values.venue}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <input
                type="date"
                placeholder="Date"
                name="date"
                value={values.date}
                onChange={handleChange}
              />
            </Form.Field>
            <Button type="submit" floated="right" positive content="Submit" />
            <Button
              type="submit"
              floated="right"
              content="Cancel"
              as={Link}
              to="/events"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default EventForm;
