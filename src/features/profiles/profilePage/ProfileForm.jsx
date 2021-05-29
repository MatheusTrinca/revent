import React from 'react';
import { Formik, Form } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextAreaInput from '../../../app/common/form/MyTextAreaInput';
import { Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { updateProfile } from '../../../app/firestore/firestoreService';

export default function ProfileForm({ profile, setEditMode }) {
  return (
    <Formik
      initialValues={{
        displayName: profile.displayName,
        description: profile.description || '',
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required('Name is required'),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await updateProfile(values);
          setEditMode(false);
        } catch (error) {
          toast.error(error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form">
          <MyTextInput name="displayName" placeholder="Display Name" />
          <MyTextAreaInput rows={4} name="description" placeholder="Description" />
          <Button
            floated="right"
            loading={isSubmitting}
            disabled={isSubmitting || !isValid || !dirty}
            type="submit"
            size="large"
            content="Update profile"
            positive
          />
        </Form>
      )}
    </Formik>
  );
}
