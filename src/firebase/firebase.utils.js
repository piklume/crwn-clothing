import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAHZWeUJx5MLKi8_s3dlhv53q-x6T73xdk",
    authDomain: "crwn-db-57aee.firebaseapp.com",
    projectId: "crwn-db-57aee",
    storageBucket: "crwn-db-57aee.appspot.com",
    messagingSenderId: "869926785352",
    appId: "1:869926785352:web:734855fdff77b79550e37d",
    measurementId: "G-W0CCWSNGEM"
  };

  export const createUserProfileDocument = async (userAuth,additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({promt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;