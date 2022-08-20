import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey: 'AIzaSyDdxlLbgviC88s6TKUx-2J_tGEPWJ5jxoo',
    authDomain: 'tuantao-apple.firebaseapp.com',
    databaseURL: 'https://tuantao-apple-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'tuantao-apple',
    storageBucket: 'tuantao-apple.appspot.com',
    messagingSenderId: '453618382770',
    appId: '1:453618382770:web:346e11d855e30f450756ab',
    measurementId: 'G-W4KKJZW0N4',
}

export const firebaseAuth = firebase.initializeApp(firebaseConfig)

export const db = getDatabase(firebaseAuth)
export const storage = getStorage(firebaseAuth)

export const auth = firebaseAuth.auth()
