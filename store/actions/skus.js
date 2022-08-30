import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
    ADD_SKUS_FAIL,
    ADD_SKUS_REQUEST,
    ADD_SKUS_SUCCESS,
    DELETE_SKUS_FAIL,
    DELETE_SKUS_REQUEST,
    DELETE_SKUS_SUCCESS,
    FETCH_SKUS_FAIL,
    FETCH_SKUS_REQUEST,
    FETCH_SKUS_SUCCESS,
    UPDATE_SKUS_FAIL,
    UPDATE_SKUS_REQUEST,
    UPDATE_SKUS_SUCCESS,
} from '../constants/skus'

//load sản phẩm
export const getSkus = () => async dispatch => {
    try {
        dispatch({ type: FETCH_SKUS_REQUEST })

        const skuRef = ref(db, 'product_sku')
        onValue(
            skuRef,
            async snapshot => {
                const snapshots = await snapshot.val()
                if (snapshot.val() !== null && snapshot.val !== undefined) {
                    dispatch({
                        type: FETCH_SKUS_SUCCESS,
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
            type: FETCH_SKUS_FAIL,
            message: error,
        })
    }
}

//Thêm sku
export const addSkuObject = (sku, id) => async dispatch => {
    try {
        dispatch({
            type: ADD_SKUS_REQUEST,
        })

        const valueAdd = {
            ...sku,
            id: id,
        }

        set(ref(db, 'product_sku/' + id), valueAdd)
            .then(() => {
                dispatch({
                    type: ADD_SKUS_SUCCESS,
                    sku: valueAdd,
                })
            })
            .catch(error => {
                alert('Có lỗi xảy ra :' + error)
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: ADD_SKUS_FAIL,
            message: error,
        })
    }
}

//Xóa sku
export const deleteSku = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_SKUS_REQUEST,
        })

        const skuDelete = ref(db, `product_sku/${id}`)
        remove(skuDelete)
            .then(() => {
                dispatch({
                    type: DELETE_SKUS_SUCCESS,
                    id,
                })
            })
            .catch(error => {
                alert('Có lỗi xảy ra :' + error)
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_SKUS_FAIL,
            message: error,
        })
    }
}

//Update sku
export const updateSku = sku => async dispatch => {
    try {
        dispatch({
            type: UPDATE_SKUS_REQUEST,
        })

        const skuUpdate = ref(db, `product_sku/${sku.id}`)
        update(skuUpdate, sku)
            .then(() => {
                dispatch({
                    type: UPDATE_SKUS_SUCCESS,
                    sku,
                })
            })
            .catch(error => {
                alert('Có lỗi xảy ra :' + error)
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_SKUS_FAIL,
            message: error,
        })
    }
}
