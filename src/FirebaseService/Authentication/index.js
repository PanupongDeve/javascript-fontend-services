import {
    firebaseRegister
} from '../register';

import {
    user
} from '../CloundFireStore/model';

class Authentication {
    constructor() {
        this.firebase = firebaseRegister.getFirebase();
    }
    async signUp(email, password) {
        try {
            const response = await this.firebase.auth().createUserWithEmailAndPassword(email, password);
            const data = {
                email: email,
                uid: response.user.uid
            }
            if (await this.isAuth()) {
                await this.saveUserProfileToDatabase(data);
                console.log('STATUS ---> REGISTER SUCCESS')
                return await user.getByUID(response.user.uid);
            } else {
                throw "Authentication Fail"
            }
        } catch (error) {
            console.log(error);
        }
    }

    async signUpWithUsername(username, password) {
        try {
            const email = this.migrateToEmail(username);
            const response = await this.firebase.auth().createUserWithEmailAndPassword(email, password);
            const data = {
                username,
                uid: response.user.uid
            }
            if (await this.isAuth()) {
                await this.saveUserProfileToDatabase(data);
                console.log('STATUS ---> REGISTER SUCCESS')
                return await user.getByUID(response.user.uid);
            } else {
                throw "Authentication Fail"
            }
        } catch (error) {
            console.log(error);
        }
    }

    async isAuth() {
        let isAuth;
        await this.firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                isAuth = true;
            } else {
                isAuth = false;
            }
        });
        return isAuth;
    }

    async saveUserProfileToDatabase(data) {
        try {
            await user.create(data);
        } catch (error) {
            console.log(error);
        }

    }

    async getUID() {
        let uid;
        await this.firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                uid = user.uid;
            }
        });
        return uid;
    }

    async login(email, password) {
        try {
            const response = await this.firebase.auth().signInWithEmailAndPassword(email, password);
            if (await this.isAuth()) {
                return user.getByUID(response.user.uid);
            } else {
                throw "Authentication Fail"
            }
        } catch (error) {
            console.log(error);
        }
    }

    async loginWithUsername(username, password) {
        try {
            const email = this.migrateToEmail(username);
            const response = await this.firebase.auth().signInWithEmailAndPassword(email, password);

            if (await this.isAuth()) {
                return user.getByUID(response.user.uid);
            } else {
                throw "Authentication Fail"
            }
        } catch (error) {
            console.log(error);
        }
    }

    async logout() {
        await this.firebase.auth().signOut();
        console.log('Log out successfully');
    }

    migrateToEmail(username) {
        return `${username}@${username}.com`
    }
}

export const firebaseAuth = new Authentication();