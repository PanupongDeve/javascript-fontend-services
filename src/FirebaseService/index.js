import { firebaseRegister } from './register';
import FirebaseAuth from './Authentication';

class FirebaseService {
    constructor() {
        this.firebaseAuth = new FirebaseAuth();
    }

    start() {
        firebaseRegister.plugin();
    }

    getFirebaseAuth() {
        return this.firebaseAuth;
    }
}

export default FirebaseService;