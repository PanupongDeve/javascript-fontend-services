import {
    Base
} from './Base';


class Cat extends Base {
    constructor(name){
        super();
        this.collection = `${name}s`
    }
}

export default Cat;