import CRUD from './CRUD';
import FirebaseDataBase from './Database';

class User {

    constructor() {
        this.firebaseCRUD = new CRUD('users');
        this.FirebaseDatabase = new FirebaseDataBase();
    }

    async get() {
        const response = await this.firebaseCRUD.get();
        return response;
    }

    async create(data) {
        const documentId = await this.firebaseCRUD.create(data);
        return documentId;
    }

    async subscribe(functionReviceData) {
        await this.firebaseCRUD.subscribe(functionReviceData);
    }

    async getById(documentId) {
        const response = await this.firebaseCRUD.getById(documentId);
        return response;
    }

    async updateById(documentId, editData) {
        const response = await this.firebaseCRUD.updateById(documentId, editData);
        return response;
    }

    async softDeleteById(documentId) {
        const response = await this.firebaseCRUD.softDeleteById(documentId);
        return response;
    }

    async restoreById(documentId) {
        const response = await this.firebaseCRUD.restoreById(documentId);
        return response;
    }

    async getByUID(UID) {
        try {
            const db = await this.FirebaseDatabase.getFirebaseDatabase();
            let data = [];
            const querySnapshot = await db
                .collection(this.collection)
                .where("uid", "==", UID)
                .get();
            querySnapshot.forEach(doc => {
                let Objectdata = {
                    documentId: doc.id
                };
                Objectdata = Object.assign(Objectdata, doc.data());
                data.push(Objectdata);
            });
            let user = data[0];
            return user;
        } catch (error) {
            throw Promise.reject(error);
        }
    }
}

export default User;