import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
    ADD_WARANTYS_FAIL,
    ADD_WARANTYS_REQUEST,
    ADD_WARANTYS_SUCCESS,
    DELETE_WARANTYS_FAIL,
    DELETE_WARANTYS_REQUEST,
    DELETE_WARANTYS_SUCCESS,
    FETCH_WARANTYS_FAIL,
    FETCH_WARANTYS_REQUEST,
    FETCH_WARANTYS_SUCCESS,
    UPDATE_WARANTYS_FAIL,
    UPDATE_WARANTYS_REQUEST,
    UPDATE_WARANTYS_SUCCESS,
} from '../constants/waranty'

//load video
export const getWarantys = () => async dispatch => {
    try {
        dispatch({ type: FETCH_WARANTYS_REQUEST })

        const colorRef = ref(db, 'warantys')
        onValue(
            colorRef,
            async snapshot => {
                const snapshots = await snapshot.val()
                if (snapshot.val() !== null && snapshot.val !== undefined) {
                    dispatch({
                        type: FETCH_WARANTYS_SUCCESS,
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
            type: FETCH_WARANTYS_FAIL,
            message: error,
        })
    }
}

//Thêm video
export const addWarantyObject = (waranty, id) => async dispatch => {
    try {
        dispatch({
            type: ADD_WARANTYS_REQUEST,
        })

        const valueAdd = {
            ...waranty,
            id,
        }

        set(ref(db, 'warantys/' + id), valueAdd)
            .then(() => {
                dispatch({
                    type: ADD_WARANTYS_SUCCESS,
                    waranty: valueAdd,
                })
            })
            .catch(error => {
                alert('Có lỗi xảy ra :' + error)
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: ADD_WARANTYS_FAIL,
            message: error,
        })
    }
}

//Xóa video
export const deleteWaranty = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_WARANTYS_REQUEST,
        })

        const videoDelete = ref(db, `warantys/${id}`)
        remove(videoDelete)
            .then(() => {
                dispatch({
                    type: DELETE_WARANTYS_SUCCESS,
                    id,
                })
            })
            .catch(error => {
                alert('Có lỗi xảy ra :' + error)
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_WARANTYS_FAIL,
            message: error,
        })
    }
}

//Update video
export const updateWaranty = video => async dispatch => {
    try {
        dispatch({
            type: UPDATE_WARANTYS_REQUEST,
        })

        const videoUpdate = ref(db, `warantys/${video.id}`)
        update(videoUpdate, video)
            .then(() => {
                dispatch({
                    type: UPDATE_WARANTYS_SUCCESS,
                    waranty,
                })
            })
            .catch(error => {
                alert('Có lỗi xảy ra :' + error)
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_WARANTYS_FAIL,
            message: error,
        })
    }
}
