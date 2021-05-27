import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants';

const INITIAL_STATE = {
  authenticated: false,
  currentUser: null,
};

export default function authReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case SIGN_IN_USER:
      return {
        ...state,
        authenticated: true,
        currentUser: {
          email: payload.email,
          photoURL: payload.photoURL,
          uid: payload.uid,
          displayName: payload.displayName,
          providerId: payload.providerData[0].providerId,
        },
      };
    case SIGN_OUT_USER:
      return {
        authenticated: false,
        currentUser: null,
      };
    default:
      return state;
  }
}
