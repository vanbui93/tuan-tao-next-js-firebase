import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
    ADD_PAGE_FAIL,
    ADD_PAGE_REQUEST,
    ADD_PAGE_SUCCESS,
    DELETE_PAGE_FAIL,
    DELETE_PAGE_REQUEST,
    DELETE_PAGE_SUCCESS,
    FETCH_PAGE_FAIL,
    FETCH_PAGE_REQUEST,
    FETCH_PAGE_SUCCESS,
    UPDATE_PAGE_FAIL,
    UPDATE_PAGE_REQUEST,
    UPDATE_PAGE_SUCCESS,
} from '../constants/page'

//gọi api firebase

export const getPageDetail = () => async dispatch => {
    try {
        dispatch({ type: FETCH_PAGE_REQUEST })

        const productRef = ref(db, `pages`)
        onValue(
            productRef,
            async snapshot => {
                const snapshots = await snapshot.val()
                if (snapshot.val() !== null) {
                    dispatch({
                        type: FETCH_PAGE_SUCCESS,
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
            type: FETCH_PAGE_FAIL,
            message: error,
        })
    }
}

//Thêm page
export const addPageObject = (page, id) => async dispatch => {
    try {
        dispatch({
            type: ADD_PAGE_REQUEST,
        })
        const newPage = Object.assign(page, { id })

        set(ref(db, 'pages/' + id), page).catch(error => {
            alert('Có lỗi xảy ra :' + error)
        })
        dispatch({
            type: ADD_PAGE_SUCCESS,
            page: newPage,
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: ADD_PAGE_FAIL,
            message: error,
        })
    }
}

//Xóa page
export const deletePageDetail = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_PAGE_REQUEST,
        })

        const pageDelete = ref(db, `pages/${id}`)
        remove(pageDelete).catch(error => {
            alert('Có lỗi xảy ra :' + error)
        })
        dispatch({
            type: DELETE_PAGE_SUCCESS,
            id,
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_PAGE_FAIL,
            message: error,
        })
    }
}

//Update page
export const updatePageDetail = page => async dispatch => {
    try {
        dispatch({
            type: UPDATE_PAGE_REQUEST,
        })

        const pageUpdate = ref(db, `pages/${page.id}`)
        const valueUpdate = {
            ...page,
            update_date: new Date().toString().replace(/GMT.*/g, ''),
        }

        update(pageUpdate, valueUpdate).catch(error => {
            alert('Có lỗi xảy ra :' + error)
        })
        dispatch({
            type: UPDATE_PAGE_SUCCESS,
            page: valueUpdate,
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_PAGE_FAIL,
            message: error,
        })
    }
}
