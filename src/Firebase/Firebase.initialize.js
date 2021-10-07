import { initializeApp } from 'firebase/app'
import firebaseConfig from './Firebase.config';

const initializeAppAuthentication = () =>{
    initializeApp( firebaseConfig);
}

export default initializeAppAuthentication ;