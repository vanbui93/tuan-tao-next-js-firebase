import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
    ADD_CMT_REQUEST,
    ADD_CMT_SUCCESS,
    DELETE_CMT_FAIL,
    DELETE_CMT_REQUEST,
    DELETE_CMT_SUCCESS,
    FETCH_CMT_FAIL,
    FETCH_CMT_REQUEST,
    FETCH_CMT_SUCCESS,
    UPDATE_CMT_FAIL,
    UPDATE_CMT_REQUEST,
    UPDATE_CMT_SUCCESS,
} from '../constants/cmt'

//gọi api firebase
export const getComments = () => async dispatch => {
    try {
        dispatch({ type: FETCH_CMT_REQUEST })

        const cmtRef = ref(db, 'comments')
        onValue(
            cmtRef,
            async snapshot => {
                const snapshots = await snapshot.val()
                if (snapshot.val() !== null) {
                    dispatch({
                        type: FETCH_CMT_SUCCESS,
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
            type: FETCH_CMT_FAIL,
            message: error,
        })
    }
}

//Thêm cmt
export const addCommentObject = (cmt, id) => async dispatch => {
    try {
        dispatch({
            type: ADD_CMT_REQUEST,
        })

        const valueUpdate = {
            ...cmt,
            id: id,
        }

        set(ref(db, 'comments/' + id), valueUpdate).catch(error => {
            alert('Có lỗi xảy ra :' + error)
        })
        dispatch({
            type: ADD_CMT_SUCCESS,
            cmt: valueUpdate,
        })
    } catch (error) {
        console.log(error)
    }
}

//Xóa cmt
export const deleteComment = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_CMT_REQUEST,
        })

        const cmtDelete = ref(db, `comments/${id}`)
        remove(cmtDelete).catch(error => {
            alert('Có lỗi xảy ra :' + error)
        })
        dispatch({
            type: DELETE_CMT_SUCCESS,
            id,
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_CMT_FAIL,
            message: error,
        })
    }
}

//Update cmt
export const updateComment = cmt => async dispatch => {
    try {
        dispatch({
            type: UPDATE_CMT_REQUEST,
        })

        const cmtUpdate = ref(db, `comments/${cmt.id}`)
        update(cmtUpdate, cmt).catch(error => {
            alert('Có lỗi xảy ra :' + error)
        })
        dispatch({
            type: UPDATE_CMT_SUCCESS,
            cmt,
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_CMT_FAIL,
            message: error,
        })
    }
}
