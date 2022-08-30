import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
    ADD_MENUS_REQUEST,
    ADD_MENUS_SUCCESS,
    DELETE_MENUS_FAIL,
    DELETE_MENUS_REQUEST,
    DELETE_MENUS_SUCCESS,
    FETCH_MENUS_FAIL,
    FETCH_MENUS_REQUEST,
    FETCH_MENUS_SUCCESS,
    UPDATE_MENUS_FAIL,
    UPDATE_MENUS_REQUEST,
    UPDATE_MENUS_SUCCESS,
} from '../constants/menus'

//gọi api firebase
export const getMenu = () => async dispatch => {
    try {
        dispatch({ type: FETCH_MENUS_REQUEST })

        const menuRef = ref(db, 'menus')
        onValue(
            menuRef,
            async snapshot => {
                const snapshots = await snapshot.val()
                if (snapshot.val() !== null) {
                    dispatch({
                        type: FETCH_MENUS_SUCCESS,
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
            type: FETCH_MENUS_FAIL,
            message: error,
        })
    }
}

//Thêm menu
export const addMenuObject = (menu, id) => async dispatch => {
    try {
        dispatch({
            type: ADD_MENUS_REQUEST,
        })

        const newMenu = Object.assign(menu, { id })

        set(ref(db, 'menus/' + id), menu).catch(error => {
            alert('Có lỗi xảy ra :' + error)
        })
        dispatch({
            type: ADD_MENUS_SUCCESS,
            menu: newMenu,
        })
    } catch (error) {
        console.log(error)
    }
}

//Xóa menu
export const deleteMenu = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_MENUS_REQUEST,
        })

        const menuDelete = ref(db, `menus/${id}`)
        remove(menuDelete).catch(error => {
            alert('Có lỗi xảy ra :' + error)
        })
        dispatch({
            type: DELETE_MENUS_SUCCESS,
            id,
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_MENUS_FAIL,
            message: error,
        })
    }
}

//Update menu
export const updateMenu = menu => async dispatch => {
    try {
        dispatch({
            type: UPDATE_MENUS_REQUEST,
        })

        const menuUpdate = ref(db, `menus/${menu.id}`)
        update(menuUpdate, menu).catch(error => {
            alert('Có lỗi xảy ra :' + error)
        })
        dispatch({
            type: UPDATE_MENUS_SUCCESS,
            menu,
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_MENUS_FAIL,
            message: error,
        })
    }
}
