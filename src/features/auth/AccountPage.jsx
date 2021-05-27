import { Form, Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header, Label, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { updateUserPassword } from '../../app/firestore/firebaseService';

export default function AccountPage() {
  const { currentUser } = useSelector(state => state.auth);
  return (
    <Segment>
      <Header dividing size="large" content="Account" />
      {currentUser.providerId === 'password' && (
        <>
          <Header sub size="large" color="teal" content="Change Password" />
          <p>Use this form to change your password</p>
          <Formik
            initialValues={{ newPassword1: '', newPassword2: '' }}
            validationSchema={Yup.object({
              newPassword1: Yup.string()
                .required('Password is required')
                .min(6, 'Password must be at least 6 characters'),
              newPassword2: Yup.string().oneOf(
                [Yup.ref('newPassword1'), null],
                'Passwords do not match'
              ),
            })}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                await updateUserPassword(values);
              } catch (error) {
                setErrors({ auth: error.message });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, isValid, dirty, errors }) => (
              <Form className="ui form">
                <MyTextInput
                  name="newPassword1"
                  type="password"
                  content="New Password"
                />
                <MyTextInput
                  name="newPassword2"
                  type="password"
                  content="Confirm Password"
                />
                {errors.auth && (
                  <Label
                    basic
                    color="red"
                    style={{ marginBottom: '10px', width: '100%' }}
                    content={errors.auth}
                  />
                )}
                <Button
                  loading={isSubmitting}
                  disabled={isSubmitting || !isValid || !dirty}
                  type="submit"
                  positive
                  content="Update password"
                />
              </Form>
            )}
          </Formik>
        </>
      )}
      {currentUser.providerId === 'facebook.com' && (
        <>
          <Header color="teal" sub content="Facebook Account" />
          <p>Please visit Facebook for update your account</p>
          <Button
            as={Link}
            to="https://www.facebook.com"
            icon="facebook"
            color="facebook"
            content="Go to Facebook"
          />
        </>
      )}
      {currentUser.providerId === 'google.com' && (
        <>
          <Header color="teal" sub content="Google Account" />
          <p>Please visit Facebook for update your account</p>
          <Button
            as={Link}
            to="https://www.google.com"
            icon="google"
            color="google plus"
            content="Go to Google"
          />
        </>
      )}
    </Segment>
  );
}
