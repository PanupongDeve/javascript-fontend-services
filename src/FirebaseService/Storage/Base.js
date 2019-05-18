import {
    firebaseRegister
} from '../register'

export class Base {
    constructor() {
        this.firebase = firebaseRegister.getFirebase();
    }

    createStorage() {
        const storage = this.firebase.storage();
        return storage;
    }

    async upload(folder, file) {
        const storageRef = this.createStorage().ref();
        const uploadTask = await storageRef.child(`${folder}/${file.name}`).put(file);
        let fileURL = '';
        await uploadTask.ref.getDownloadURL().then(function(downloadURL) {
            fileURL = downloadURL;
        });
        return {
            name: file.name,
            url: fileURL
        };
    }
}

