import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
    ADD_COLLECTIONS_FAIL,
    ADD_COLLECTIONS_REQUEST,
    ADD_COLLECTIONS_SUCCESS,
    DELETE_COLLECTIONS_FAIL,
    DELETE_COLLECTIONS_REQUEST,
    DELETE_COLLECTIONS_SUCCESS,
    FETCH_COLLECTIONS_FAIL,
    FETCH_COLLECTIONS_REQUEST,
    FETCH_COLLECTIONS_SUCCESS,
    UPDATE_COLLECTIONS_FAIL,
    UPDATE_COLLECTIONS_REQUEST,
    UPDATE_COLLECTIONS_SUCCESS,
} from '../constants/collections'

//gọi api firebase
export const getCollection = () => async dispatch => {
    try {
        dispatch({ type: FETCH_COLLECTIONS_REQUEST })

        const collectionRef = ref(db, 'collections')
        onValue(
            collectionRef,
            async snapshot => {
                const snapshots = await snapshot.val()
                if (snapshot.val() !== null) {
                    dispatch({
                        type: FETCH_COLLECTIONS_SUCCESS,
                        data: snapshots,
                    })
                }
            },
            {
                onlyOnce: true,
            }
        )
    } catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_COLLECTIONS_FAIL,
            message: error,
        })
    }
}

//Thêm collection
export const addCollectionObject = (collection, id) => async dispatch => {
    try {
        dispatch({
            type: ADD_COLLECTIONS_REQUEST,
        })

        const newCollect = Object.assign(collection, { id })

        set(ref(db, 'collections/' + id), newCollect).catch(error => {
            alert('Có lỗi xảy ra :' + error)
        })
        dispatch({
            type: ADD_COLLECTIONS_SUCCESS,
            collection: newCollect,
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: ADD_COLLECTIONS_FAIL,
            message: error,
        })
    }
}

//Xóa collection
export const deleteCollection = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_COLLECTIONS_REQUEST,
        })

        const collectionDelete = ref(db, `collections/${id}`)
        remove(collectionDelete).catch(error => {
            alert('Có lỗi xảy ra :' + error)
        })
        dispatch({
            type: DELETE_COLLECTIONS_SUCCESS,
            id,
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_COLLECTIONS_FAIL,
            message: error,
        })
    }
}

//Update collection
export const updateCollection = collection => async dispatch => {
    try {
        dispatch({
            type: UPDATE_COLLECTIONS_REQUEST,
        })

        const collectionUpdate = ref(db, `collections/${collection.id}`)
        update(collectionUpdate, collection).catch(error => {
            alert('Có lỗi xảy ra :' + error)
        })
        dispatch({
            type: UPDATE_COLLECTIONS_SUCCESS,
            collection,
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_COLLECTIONS_FAIL,
            message: error,
        })
    }
}
