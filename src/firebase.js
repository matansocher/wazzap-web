import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyDPWq3lQLvl3FJ_9o_QfffYqovo3qtOaas",
  authDomain: "whats-app-c5bba.firebaseapp.com",
  databaseURL: "https://whats-app-c5bba.firebaseio.com",
  projectId: "whats-app-c5bba",
  storageBucket: "whats-app-c5bba.appspot.com",
  messagingSenderId: "638752731394"
};
const fire = firebase.initializeApp(config);
export default fire;