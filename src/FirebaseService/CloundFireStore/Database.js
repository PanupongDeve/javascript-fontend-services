import {
    firebaseRegister
  } from '../register';

class FirebaseDataBase {

    getFirebaseDatabase() {
        const firebase = firebaseRegister.getFirebase();
        const db = firebase.firestore();

        return db;
    }
}

export default FirebaseDataBase;