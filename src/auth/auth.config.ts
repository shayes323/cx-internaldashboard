// This import loads the firebase namespace along with all its type information.
import firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAeMnIeY0L31GDBaZ7SU5vosd7DWGHAF_g',
  authDomain: 'catapultx.firebaseapp.com',
  databaseURL: 'https://catapultx.firebaseio.com',
  projectId: 'catapultx',
  storageBucket: 'catapultx.appspot.com',
  messagingSenderId: '662251025753',
  appId: '1:662251025753:web:d69eecf648e8074c538848',
  measurementId: 'G-YWZMRM0MGW',
};

firebase.initializeApp(firebaseConfig);
