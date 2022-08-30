import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
    ADD_SLIDE_FAIL,
    ADD_SLIDE_REQUEST,
    ADD_SLIDE_SUCCESS,
    DELETE_SLIDE_FAIL,
    DELETE_SLIDE_REQUEST,
    DELETE_SLIDE_SUCCESS,
    FETCH_SLIDE_IMG_FAIL,
    FETCH_SLIDE_IMG_REQUEST,
    FETCH_SLIDE_IMG_SUCCESS,
    UPDATE_SLIDE_FAIL,
    UPDATE_SLIDE_REQUEST,
    UPDATE_SLIDE_SUCCESS,
} from '../constants/slides'

//gọi api firebase
export const getSlides = () => async dispatch => {
    try {
        dispatch({ type: FETCH_SLIDE_IMG_REQUEST })

        const slideRef = ref(db, 'home_slide')
        onValue(
            slideRef,
            async snapshot => {
                const snapshots = await snapshot.val()
                if (snapshot.val() !== null) {
                    dispatch({
                        type: FETCH_SLIDE_IMG_SUCCESS,
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
            type: FETCH_SLIDE_IMG_FAIL,
            message: error,
        })
    }
}

//Thêm slide
export const addSlideObject = (slide, id) => async dispatch => {
    try {
        dispatch({
            type: ADD_SLIDE_REQUEST,
        })

        const valueAdd = {
            ...slide,
            id: id,
        }

        set(ref(db, 'home_slide/' + id), valueAdd)
            .then(() => {
                dispatch({
                    type: ADD_SLIDE_SUCCESS,
                    product: valueAdd,
                })
            })
            .catch(error => {
                alert('Có lỗi xảy ra :' + error)
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: ADD_SLIDE_FAIL,
            message: error,
        })
    }
}

//Xóa slide
export const deleteSlide = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_SLIDE_REQUEST,
        })

        const slideDelete = ref(db, `home_slide/${id}`)
        remove(slideDelete)
            .then(() => {
                dispatch({
                    type: DELETE_SLIDE_SUCCESS,
                    id,
                })
            })
            .catch(error => {
                alert('Có lỗi xảy ra :' + error)
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_SLIDE_FAIL,
            message: error,
        })
    }
}

//Update slide
export const updateSlide = slide => async dispatch => {
    try {
        dispatch({
            type: UPDATE_SLIDE_REQUEST,
        })

        const slideUpdate = ref(db, `home_slide/${slide.id}`)
        update(slideUpdate, slide)
            .then(() => {
                dispatch({
                    type: UPDATE_SLIDE_SUCCESS,
                    slide,
                })
            })
            .catch(error => {
                alert('Có lỗi xảy ra :' + error)
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_SLIDE_FAIL,
            message: error,
        })
    }
}
