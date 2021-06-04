/* global google */
import React, { useState } from 'react';
import { Segment, Header, Button, Confirm } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listenToEvent } from '../eventActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextAreaInput from '../../../app/common/form/MyTextAreaInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MyPlacesInput from '../../../app/common/form/MyPlacesInput';
import { categoryData } from '../../../app/api/categoryOptions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import {
  listenToEventFromFirestore,
  updateEventInFirestore,
  addEventToFirestore,
  cancelEventToggle,
} from '../../../app/firestore/firestoreService';
import { toast } from 'react-toastify';

const EventForm = ({ match, history }) => {
  const { selectedEvent } = useSelector(state => state.event);

  const dispatch = useDispatch();

  const { loading, error } = useSelector(state => state.async);

  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

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

  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listenToEventFromFirestore(match.params.id),
    data: event => dispatch(listenToEvent(event)),
    deps: [match.params.id, dispatch],
  });

  async function handleCancelToggle(event) {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try {
      await cancelEventToggle(event);
      setLoadingCancel(false);
    } catch (error) {
      setLoadingCancel(true);
      toast.error(error.message);
    }
  }

  if (loading) return <LoadingComponent content="Loading event..." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventInFirestore(values)
              : await addEventToFirestore(values);
            setSubmitting(false);
            history.push('/events');
          } catch (err) {
            toast.error(err);
            setSubmitting(false);
          }
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, isValid, dirty, values }) => (
          <Form className="ui form">
            <Header sub color="teal" content="Event Details" />
            <MyTextInput placeholder="Event Title" name="title" />
            <MySelectInput placeholder="Event Category" name="category" options={categoryData} />
            <MyTextAreaInput placeholder="Description" name="description" rows={2} />
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
            {selectedEvent && (
              <Button
                loading={loadingCancel}
                type="button"
                floated="left"
                color={selectedEvent.isCancelled ? 'green' : 'red'}
                content={selectedEvent.isCancelled ? 'Reactivate event' : 'Cancel event'}
                onClick={() => setConfirmOpen(true)}
              />
            )}
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
      <Confirm
        open={confirmOpen}
        content={
          selectedEvent?.isCancelled
            ? 'This will reactivate the event - Are you sure?'
            : 'This will cancel the event - Are you sure?'
        }
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleCancelToggle(selectedEvent)}
      />
    </Segment>
  );
};

export default EventForm;
