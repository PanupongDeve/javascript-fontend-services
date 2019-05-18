import "@babel/polyfill";
import {
    firebaseRegister
} from './FirebaseService/register';

import {
    cat
} from './FirebaseService/CloundFireStore/model';

console.log('es6 succesfully!');

firebaseRegister.plugin();

const asyncTest = async () => {
    const functionReciveData = (data) => {
        console.log('data', data);
    }
    const data = await cat.getAll();
    console.log('data', data);
    
}

asyncTest();

