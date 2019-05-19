import {
    Base
} from './Base';


class User extends Base {
    constructor(name) {
        super();
        this.collection = `${name}s`
    }

    async getByUID(UID) {
        try {
            const db = this.createDatabase();
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