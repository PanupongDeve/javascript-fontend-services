import firebase from "firebase/app";
import 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import { firebaseConfig } from './config';
class FirebaseInitial {
  constructor() {
    this.config = firebaseConfig;
  }

  plugin() {
    console.log("CONNECT FIREBASE STATUS ---> SUCCESS");
    firebase.initializeApp(this.config);
  }

  getFirebase() {
    return firebase;
  }
}

export const firebaseRegister = new FirebaseInitial();

