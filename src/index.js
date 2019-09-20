import "@babel/polyfill";

import FirebaseService from './FirebaseService';
import User from './FirebaseService/CloundFireStore/User';
import Cat from './FirebaseService/CloundFireStore/Cat';

const firebaseService = new FirebaseService();

firebaseService.start();

const firebaseAuth = firebaseService.getFirebaseAuth();

const user = new User();
const cat = new Cat();


const asyncTest = async () => {
    
    const data = await cat.get();
    console.log(data);
   
}

// async function handleChangeFile() {
//     console.log('Hello World');
//     var x = document.getElementById("file-upload");
//     const response = await firebaseStorage.upload('images',x.files[0]);
//     console.log('files', response);
// }

// window.handleChangeFile = handleChangeFile



asyncTest();

