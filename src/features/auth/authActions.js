import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants';
import firebase from '../../app/config/firebase';
import { APP_LOADED } from '../../app/async/asyncReduces';
import {
  getUserProfile,
  dataFromSnapshot,
} from '../../app/firestore/firestoreService';
import { listenToSelectedUserProfile } from '../profiles/profileActions';

export function signInUser(user) {
  return {
    type: SIGN_IN_USER,
    payload: user,
  };
}

export const verifyAuth = () => dispatch => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      dispatch(signInUser(user));
      const profileRef = getUserProfile(user.uid);
      profileRef.onSnapshot(snapshot => {
        dispatch(listenToSelectedUserProfile(dataFromSnapshot(snapshot)));
        dispatch({ type: APP_LOADED });
      });
    } else {
      dispatch(signOutUser());
      dispatch({ type: APP_LOADED });
    }
  });
};

export function signOutUser() {
  return {
    type: SIGN_OUT_USER,
  };
}
