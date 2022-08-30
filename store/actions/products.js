import { onValue, query, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
    ADD_PRODUCT_FAIL,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_FAIL,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    UPDATE_IMGs_PRODUCT_OBJECT,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
} from '../constants/products'

//load sản phẩm
export const getProduct = () => async dispatch => {
    try {
        dispatch({ type: FETCH_PRODUCTS_REQUEST })

        const productRef = query(ref(db, `products`))
        onValue(
            productRef,
            async snapshot => {
                const snapshots = await snapshot.val()
                if (snapshot.val() !== null && snapshot.val !== undefined) {
                    dispatch({
                        type: FETCH_PRODUCTS_SUCCESS,
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
            type: FETCH_PRODUCTS_FAIL,
            message: error,
        })
    }
}

//Xóa sản phẩm
export const deleteProduct = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_PRODUCT_REQUEST,
        })

        const productDelete = ref(db, `products/${id}`)
        remove(productDelete)
            .then(() => {
                console.log('Đã xóa sản phẩm thành công sản phẩm', id)
                dispatch({
                    type: DELETE_PRODUCT_SUCCESS,
                    id,
                })
            })
            .catch(error => {
                console.log('Có lỗi xảy ra :' + error)
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            message: error,
        })
    }
}

//Update sản phẩm
export const updateProduct = product => async dispatch => {
    try {
        dispatch({
            type: UPDATE_PRODUCT_REQUEST,
        })

        const productUpdate = ref(db, `products/${product.id}`)
        const valueUpdate = {
            ...product,
            update_date: new Date().toString().replace(/GMT.*/g, ''),
        }
        update(productUpdate, valueUpdate)
            .then(() => {
                dispatch({
                    type: UPDATE_PRODUCT_SUCCESS,
                    product: valueUpdate,
                })
            })
            .catch(error => {
                alert('Có lỗi xảy ra :' + error)
            })
    } catch (error) {
        console.log(error)
    }
}

//Update hình sản phẩm
export const updateImgProduct = (id, images) => async dispatch => {
    try {
        dispatch({
            type: UPDATE_IMGs_PRODUCT_OBJECT,
        })
        const productImgRef = ref(db, `products/${id}`)
        update(productImgRef, {
            images: images,
        })
    } catch (error) {
        console.log(error)
    }
}

//Thêm sản phẩm
export const addProductObject = (product, id) => async dispatch => {
    try {
        dispatch({
            type: ADD_PRODUCT_REQUEST,
        })
        const newProduct = Object.assign(product, { id })
        set(ref(db, 'products/' + id), product)
            .then(() => {
                dispatch({
                    type: ADD_PRODUCT_SUCCESS,
                    page: newProduct,
                })
            })
            .catch(error => {
                alert('Có lỗi xảy ra :' + error)
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: ADD_PRODUCT_FAIL,
            message: error,
        })
    }
}
