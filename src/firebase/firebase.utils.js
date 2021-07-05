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

  export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    // console.log(collectionRef);

    const batch = firestore.batch();

    objectToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });

    return await batch.commit();
  }

  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map( doc => {
      const {title, items} = doc.data();
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      };
    });
    
    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {});
  };

  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject)
    })
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({promt: 'select_account'});
  // export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export default firebase;
