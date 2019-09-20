import moment from "moment";
import FirebaseDataBase from './Database';


class CRUD {
  constructor(collection) {
    this.collection = collection;
    this.firebaseDB = new FirebaseDataBase();
    this.moment = moment;
    this.status = {
      Active: 'Active',
      Inactive: 'Inactive'
    }
  }

  async getLastKey() {
    const db = this.firebaseDB.getFirebaseDatabase();
    const querySnapshot = await db
      .collection(this.collection)
      .orderBy("id", "desc")
      .limit(1)
      .get();
    let key = 0;
    querySnapshot.forEach(doc => {
      key = doc.data().id;
    });
    return key;
  }

  async create(data) {
    try {
      const db = this.firebaseDB.getFirebaseDatabase();
      data.createdAt = this.moment().format();
      data.updatedAt = this.moment().format();
      data.status = this.status.Active;
      data.id = (await this.getLastKey()) + 1;
      const response = await db.collection(this.collection).add(data);
      return response.id;
    } catch (error) {
      throw Promise.reject(error);
    }
  }

  async get() {
    try {
      const db = this.firebaseDB.getFirebaseDatabase();
      const querySnapshot = await db.collection(this.collection).where("status", "==", this.status.Active).get();
      let data = [];
      querySnapshot.forEach(doc => {
        let Objectdata = {
          documentId: doc.id
        };
        Objectdata = Object.assign(Objectdata, doc.data());
        data.push(Objectdata);
      });

      return data;
    } catch (error) {
      throw Promise.reject(error);
    }
  }

  async subscribe(functionReviceData) {
    try {
      const db = this.firebaseDB.getFirebaseDatabase();
      let data = [];
      db.collection(this.collection).where("status", "==", this.status.Active).onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          let Objectdata = {
            documentId: doc.id
          };
          Objectdata = Object.assign(Objectdata, doc.data());
          data.push(Objectdata);
        });

        functionReviceData(data);
        data = [];
      });
    } catch (error) {
      throw Promise.reject(error);
    }
  }

  async getById(documentId) {
    try {
      const db = this.firebaseDB.getFirebaseDatabase();
      const docRef = await db.collection(this.collection).doc(documentId);
      const doc = await docRef.get();
      let objectData = {
        documentId: doc.id
      };


      objectData = Object.assign(objectData, doc.data());
      if (objectData.status === this.status.Inactive) {
        return 'data status inactive.'
      }

      return objectData;
    } catch (error) {
      throw Promise.reject(error);
    }
  }

  async updateById(documentId, editData) {
    try {
      const db = this.firebaseDB.getFirebaseDatabase();
      editData.updatedAt = this.moment().format();

      await db
        .collection(this.collection)
        .doc(documentId)
        .update(editData);
      return true;
    } catch (error) {
      console.log("Error");
      throw Promise.reject(error);
    }
  }

  async softDeleteById(documentId) {
    try {
      const db = this.firebaseDB.getFirebaseDatabase();
      const deletedData = {
        deletedAt: this.moment().format(),
        status: this.status.Inactive
      };

      await db
        .collection(this.collection)
        .doc(documentId)
        .update(deletedData);
      return true;
    } catch (error) {
      console.log("Error");
      throw Promise.reject(error);
    }
  }

  async restoreById(documentId) {
    try {
      const db = this.firebaseDB.getFirebaseDatabase();
      const updatedData = {
        updatedAt: this.moment().format(),
        status: this.status.Active
      };

      await db
        .collection(this.collection)
        .doc(documentId)
        .update(updatedData);
      return true;
    } catch (error) {
      console.log("Error");
      throw Promise.reject(error);
    }
  }

  
}

export default CRUD;