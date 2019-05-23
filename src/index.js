import "@babel/polyfill";
import {
    firebaseRegister
} from './FirebaseService/register';

import {
    cat
} from './FirebaseService/CloundFireStore/model';

import {
    firebaseStorage
} from './FirebaseService/Storage';

import {
    firebaseAuth
} from './FirebaseService/Authentication';

import {
    servicesWorker
} from './ServicesWorker';

console.log('es6 succesfully!');

servicesWorker.register();


// firebaseRegister.plugin();

// const asyncTest = async () => {
//     const functionReciveData = (data) => {
//         console.log('data', data);
//     }
//     const data = await cat.getAll();
//     console.log('data', data);
    
// }

// async function handleChangeFile() {
//     console.log('Hello World');
//     var x = document.getElementById("file-upload");
//     const response = await firebaseStorage.upload('images',x.files[0]);
//     console.log('files', response);
// }

// window.handleChangeFile = handleChangeFile



// asyncTest();

