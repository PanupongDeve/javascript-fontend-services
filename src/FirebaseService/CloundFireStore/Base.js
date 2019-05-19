import {
  firebaseRegister
} from '../register';

import moment from "moment";


export class Base {
  constructor() {
    this.firebase = firebaseRegister.getFirebase();
    this.moment = moment;
    this.status = {
      Active: 'Active',
      Inactive: 'Inactive'
    }
  }
  async getLastKey() {
    const db = this.createDatabase();
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

  createDatabase() {
    const db = this.firebase.firestore();

    return db;
  }

  async create(data) {
    try {
      const db = this.createDatabase();
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

  async getAll() {
    try {
      const db = this.createDatabase();
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
      const db = this.createDatabase();
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
      const db = this.createDatabase();
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
      const db = this.createDatabase();
      editData.updatedAt = this.moment().format();

      await db
        .collection(this.collection)
        .doc(documentId)
        .update(editData);
      return 'update successfully.';
    } catch (error) {
      console.log("Error");
      throw Promise.reject(error);
    }
  }

  async softDeleteById(documentId) {
    try {
      const db = this.createDatabase();
      const deletedData = {
        deletedAt: this.moment().format(),
        status: this.status.Inactive
      };

      await db
        .collection(this.collection)
        .doc(documentId)
        .update(deletedData);
      return 'deleted successfully';
    } catch (error) {
      console.log("Error");
      throw Promise.reject(error);
    }
  }

  async restoreById(documentId) {
    try {
      const db = this.createDatabase();
      const updatedData = {
        updatedAt: this.moment().format(),
        status: this.status.Active
      };

      await db
        .collection(this.collection)
        .doc(documentId)
        .update(updatedData);
      return 'restore successfully.';
    } catch (error) {
      console.log("Error");
      throw Promise.reject(error);
    }
  }

  async includOptionalField(data, name, extendedModel) {
    try {
      let extendData = data;
      const fetchedData = await extendedModel.getAll();

      fetchedData.forEach(d => {
        if (d.documentId === extendData[`${name}_documentId`]) {
          extendData[name] = d;
        }
      });

      return extendData;
    } catch (error) {
      console.log("Error");
      throw Promise.reject(error);
    }
  }
}