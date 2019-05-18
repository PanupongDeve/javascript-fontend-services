import firebase from "firebase";
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

