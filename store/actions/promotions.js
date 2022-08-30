import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
    ADD_PROMOTIONS_FAIL,
    ADD_PROMOTIONS_REQUEST,
    ADD_PROMOTIONS_SUCCESS,
    DELETE_PROMOTIONS_FAIL,
    DELETE_PROMOTIONS_REQUEST,
    DELETE_PROMOTIONS_SUCCESS,
    FETCH_PROMOTIONS_FAIL,
    FETCH_PROMOTIONS_REQUEST,
    FETCH_PROMOTIONS_SUCCESS,
    UPDATE_PROMOTIONS_FAIL,
    UPDATE_PROMOTIONS_REQUEST,
    UPDATE_PROMOTIONS_SUCCESS,
} from './../constants/promotion'

//load khuyến mãi
export const getPromotions = () => async dispatch => {
    try {
        dispatch({ type: FETCH_PROMOTIONS_REQUEST })

        const colorRef = ref(db, 'promotions')
        onValue(
            colorRef,
            async snapshot => {
                const snapshots = await snapshot.val()
                if (snapshot.val() !== null && snapshot.val !== undefined) {
                    dispatch({
                        type: FETCH_PROMOTIONS_SUCCESS,
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
            type: FETCH_PROMOTIONS_FAIL,
            message: error,
        })
    }
}

//Thêm khuyến mãi
export const addPromotionObject = (promotion, id) => async dispatch => {
    try {
        dispatch({
            type: ADD_PROMOTIONS_REQUEST,
        })

        const valueAdd = {
            ...promotion,
            id: id,
        }

        set(ref(db, 'promotions/' + id), valueAdd)
            .then(() => {
                dispatch({
                    type: ADD_PROMOTIONS_SUCCESS,
                    promotion: valueAdd,
                })
            })
            .catch(error => {
                alert('Có lỗi xảy ra :' + error)
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: ADD_PROMOTIONS_FAIL,
            message: error,
        })
    }
}

//Xóa khuyến mãi
export const deletePromotion = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_PROMOTIONS_REQUEST,
        })

        const promotionDelete = ref(db, `promotions/${id}`)
        remove(promotionDelete)
            .then(() => {
                dispatch({
                    type: DELETE_PROMOTIONS_SUCCESS,
                    id,
                })
            })
            .catch(error => {
                alert('Có lỗi xảy ra :' + error)
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_PROMOTIONS_FAIL,
            message: error,
        })
    }
}

//Update promotion
export const updatePromotion = promotion => async dispatch => {
    try {
        dispatch({
            type: UPDATE_PROMOTIONS_REQUEST,
        })

        const promotionUpdate = ref(db, `promotions/${promotion.id}`)
        update(promotionUpdate, promotion)
            .then(() => {
                dispatch({
                    type: UPDATE_PROMOTIONS_SUCCESS,
                    promotion,
                })
            })
            .catch(error => {
                alert('Có lỗi xảy ra :' + error)
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_PROMOTIONS_FAIL,
            message: error,
        })
    }
}
