import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
    ADD_VIDEOS_FAIL,
    ADD_VIDEOS_REQUEST,
    ADD_VIDEOS_SUCCESS,
    DELETE_VIDEOS_FAIL,
    DELETE_VIDEOS_REQUEST,
    DELETE_VIDEOS_SUCCESS,
    FETCH_VIDEOS_FAIL,
    FETCH_VIDEOS_REQUEST,
    FETCH_VIDEOS_SUCCESS,
    UPDATE_VIDEOS_FAIL,
    UPDATE_VIDEOS_REQUEST,
    UPDATE_VIDEOS_SUCCESS,
} from '../constants/videos'

//load sản phẩm
export const getVideo = () => async dispatch => {
    try {
        dispatch({ type: FETCH_VIDEOS_REQUEST })

        const videoRef = ref(db, 'videos')
        onValue(
            videoRef,
            async snapshot => {
                const snapshots = await snapshot.val()
                if (snapshot.val() !== null && snapshot.val !== undefined) {
                    dispatch({
                        type: FETCH_VIDEOS_SUCCESS,
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
            type: FETCH_VIDEOS_FAIL,
            message: error,
        })
    }
}

//Thêm video
export const addVideoObject = (video, id) => async dispatch => {
    try {
        dispatch({
            type: ADD_VIDEOS_REQUEST,
        })

        const valueAdd = {
            ...video,
            id,
        }

        set(ref(db, 'videos/' + id), valueAdd)
            .then(() => {
                dispatch({
                    type: ADD_VIDEOS_SUCCESS,
                    product: valueAdd,
                })
            })
            .catch(error => {
                alert('Có lỗi xảy ra :' + error)
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: ADD_VIDEOS_FAIL,
            message: error,
        })
    }
}

//Xóa video
export const deleteVideo = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_VIDEOS_REQUEST,
        })

        const videoDelete = ref(db, `videos/${id}`)
        remove(videoDelete)
            .then(() => {
                dispatch({
                    type: DELETE_VIDEOS_SUCCESS,
                    id,
                })
            })
            .catch(error => {
                alert('Có lỗi xảy ra :' + error)
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_VIDEOS_FAIL,
            message: error,
        })
    }
}

//Update video
export const updateVideo = video => async dispatch => {
    try {
        dispatch({
            type: UPDATE_VIDEOS_REQUEST,
        })

        const videoUpdate = ref(db, `videos/${video.id}`)
        update(videoUpdate, video)
            .then(() => {
                dispatch({
                    type: UPDATE_VIDEOS_SUCCESS,
                    video,
                })
            })
            .catch(error => {
                alert('Có lỗi xảy ra :' + error)
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_VIDEOS_FAIL,
            message: error,
        })
    }
}
