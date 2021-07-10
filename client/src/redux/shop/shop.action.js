import ShopActionTypes from './shop.types';

import { firestore,convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap  
});

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());

        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap));
         }).catch(error => dispatch(fetchCollectionsFailure(error.message)));

//-----This below block preserved here from the old shop component to populate the collections------//
        // Demo fetch code from firebase REST api
        // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-57aee/databases/(default)/documents/collections')
        // .then(response => response.json())
        // .then(collections => console.log(collections));

        //This code updates the collections using the onSnapshot method instead of get
        // this.unsubscribeFromSnapshot = collectionRef.onSnapshot( async snapshot => {
        //    const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //    updateCollections(collectionsMap);
        //    this.setState({ loading: false });
        // });
//-------------End of preserved block-----------------------------//
    }
};

