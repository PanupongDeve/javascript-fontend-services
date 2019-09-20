import CRUD from './CRUD';

class Cat {

    constructor() {
        this.firebaseCRUD = new CRUD('cats');
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

}

export default Cat;