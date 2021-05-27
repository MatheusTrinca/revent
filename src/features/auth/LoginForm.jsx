import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button, Label, Divider } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../app/common/modals/modalReducer';
import { signInWithEmail } from '../../app/firestore/firebaseService';
import SocialLogin from './SocialLogin';

export default function LoginForm() {
  const dispatch = useDispatch();
  return (
    <ModalWrapper size="mini" header="Sign in to Revents">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().required().email(),
          password: Yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await signInWithEmail(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            setSubmitting(false);
            setErrors({ auth: 'Invalid username or password' });
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form className="ui form">
            <MyTextInput name="email" placeholder="Email Address" />
            <MyTextInput
              name="password"
              placeholder="Password"
              type="password"
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
              color="teal"
              fluid
              size="large"
              content="Login"
              type="submit"
            />
            <Divider horizontal>or</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
