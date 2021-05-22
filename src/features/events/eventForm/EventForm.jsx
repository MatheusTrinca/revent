/* global google */
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
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MyPlacesInput from '../../../app/common/form/MyPlacesInput';
import { categoryData } from '../../../app/api/categoryOptions';

const EventForm = ({ match, history }) => {
  const selectedEvent = useSelector(state =>
    state.event.events.find(event => event.id === match.params.id)
  );

  const dispatch = useDispatch();

  const initialValues = selectedEvent || {
    title: '',
    category: '',
    description: '',
    city: {
      address: '',
      latLng: '',
    },
    venue: {
      address: '',
      latLng: '',
    },
    date: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
    category: Yup.string().required('You must provide a category'),
    description: Yup.string().required(),
    city: Yup.object().shape({
      address: Yup.string().required('City is required'),
    }),
    venue: Yup.object().shape({
      address: Yup.string().required('Venue is required'),
    }),
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
        {({ isSubmitting, isValid, dirty, values }) => (
          <Form className="ui form">
            <Header sub color="teal" content="Event Details" />
            <MyTextInput placeholder="Event Title" name="title" />
            <MySelectInput
              placeholder="Event Category"
              name="category"
              options={categoryData}
            />
            <MyTextAreaInput
              placeholder="Description"
              name="description"
              rows={2}
            />
            <Header sub color="teal" content="Event Location Details" />
            <MyPlacesInput placeholder="City" name="city" />
            <MyPlacesInput
              placeholder="Venue"
              disabled={!values.city.latLng}
              name="venue"
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000,
                types: ['establishment'],
              }}
            />
            <MyDateInput
              placeholderText="Event Date"
              name="date"
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
            />
            <Button
              loading={isSubmitting}
              disabled={isSubmitting || !dirty || !isValid}
              type="submit"
              floated="right"
              positive
              content="Submit"
            />
            <Button
              disabled={isSubmitting}
              as={Link}
              to="/events"
              floated="right"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default EventForm;
