import React from 'react';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import { addEventChatComment } from '../../../app/firestore/firebaseService';
import { Button } from 'semantic-ui-react';
import MyTextAreaInput from '../../../app/common/form/MyTextAreaInput';

export default function EventDetailedChatForm({ eventId }) {
  return (
    <Formik
      initialValues={{
        comment: '',
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await addEventChatComment(eventId, values.comment);
          resetForm({});
        } catch (error) {
          toast.error(error.message);
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="ui form">
          <MyTextAreaInput
            style={{ marginTop: 10 }}
            name="comment"
            placeholder="Please enter your comment here"
            rows={2}
          />
          <Button loading={isSubmitting} content="Add reply" icon="edit" primary type="submit" />
        </Form>
      )}
    </Formik>
  );
}
