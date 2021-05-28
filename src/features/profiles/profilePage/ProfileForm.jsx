import React from 'react';
import { Formik, Form } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextAreaInput from '../../../app/common/form/MyTextAreaInput';
import { Button } from 'semantic-ui-react';
import * as Yup from 'yup';

export default function ProfileForm({ profile }) {
  return (
    <Formik
      initialValues={{
        displayName: profile.displayName,
        description: profile.description || '',
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required('Name is required'),
      })}
      onSubmit={values => console.log(values)}
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
