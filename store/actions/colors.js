import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
    ADD_COLORS_FAIL,
    ADD_COLORS_REQUEST,
    ADD_COLORS_SUCCESS,
    DELETE_COLORS_FAIL,
    DELETE_COLORS_REQUEST,
    DELETE_COLORS_SUCCESS,
    FETCH_COLORS_FAIL,
    FETCH_COLORS_REQUEST,
    FETCH_COLORS_SUCCESS,
    UPDATE_COLORS_FAIL,
    UPDATE_COLORS_REQUEST,
    UPDATE_COLORS_SUCCESS,
} from '../constants/colors'

//load màu
export const getColors = () => async dispatch => {
    try {
        dispatch({ type: FETCH_COLORS_REQUEST })

        const colorRef = ref(db, 'product_color')
        onValue(
            colorRef,
            async snapshot => {
                const snapshots = await snapshot.val()
                if (snapshot.val() !== null && snapshot.val !== undefined) {
                    dispatch({
                        type: FETCH_COLORS_SUCCESS,
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
            type: FETCH_COLORS_FAIL,
            message: error,
        })
    }
}

//Thêm color
export const addColorObject = (color, id) => async dispatch => {
    try {
        dispatch({
            type: ADD_COLORS_REQUEST,
        })

        const valueAdd = {
            ...color,
            id,
        }

        set(ref(db, 'product_color/' + id), valueAdd)
            .then(() => {
                dispatch({
                    type: ADD_COLORS_SUCCESS,
                    color: valueAdd,
                })
            })
            .catch(error => {
                alert('Có lỗi xảy ra :' + error)
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: ADD_COLORS_FAIL,
            message: error,
        })
    }
}

//Xóa color
export const deleteColor = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_COLORS_REQUEST,
        })

        const colorDelete = ref(db, `product_color/${id}`)
        remove(colorDelete)
            .then(() => {
                dispatch({
                    type: DELETE_COLORS_SUCCESS,
                    id,
                })
            })
            .catch(error => {
                alert('Có lỗi xảy ra :' + error)
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_COLORS_FAIL,
            message: error,
        })
    }
}

//Update color
export const updateColor = color => async dispatch => {
    try {
        dispatch({
            type: UPDATE_COLORS_REQUEST,
        })

        const colorUpdate = ref(db, `product_color/${color.id}`)
        update(colorUpdate, color)
            .then(() => {
                dispatch({
                    type: UPDATE_COLORS_SUCCESS,
                    color,
                })
            })
            .catch(error => {
                alert('Có lỗi xảy ra :' + error)
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_COLORS_FAIL,
            message: error,
        })
    }
}
