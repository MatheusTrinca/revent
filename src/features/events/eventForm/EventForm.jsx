import React from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
import cuid from 'cuid';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateEvent, createEvent } from '../eventActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextAreaInput from '../../../app/common/form/MyTextAreaInput';

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

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
    category: Yup.string().required('You must provide a category'),
    description: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
    date: Yup.string().required(),
  });

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
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
        }}
        validationSchema={validationSchema}
      >
        <Form className="ui form">
          <Header sub color="teal" content="Event Details" />
          <MyTextInput placeholder="Event Title" name="title" />
          <MyTextInput placeholder="Event Category" name="category" />
          <MyTextAreaInput
            placeholder="Description"
            name="description"
            rows={2}
          />
          <Header sub color="teal" content="Event Location Details" />
          <MyTextInput placeholder="City" name="city" />
          <MyTextInput placeholder="Venue" name="venue" />
          <MyTextInput placeholder="Event Date" name="date" type="date" />

          <Button type="submit" floated="right" positive content="Submit" />
          <Button as={Link} to="/events" floated="right" content="Cancel" />
        </Form>
      </Formik>
    </Segment>
  );
};

export default EventForm;
