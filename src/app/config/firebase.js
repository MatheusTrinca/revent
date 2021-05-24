import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBW6w-MqVmZxhhcCp9NIiydd90kZwDUoR8',
  authDomain: 'revents-db.firebaseapp.com',
  projectId: 'revents-db',
  storageBucket: 'revents-db.appspot.com',
  messagingSenderId: '767407507556',
  appId: '1:767407507556:web:8d187a06f1093b39333771',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
