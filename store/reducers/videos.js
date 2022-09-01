import {
    FETCH_VIDEOS_REQUEST,
    FETCH_VIDEOS_SUCCESS,
    FETCH_VIDEOS_FAIL,
    DELETE_VIDEOS_SUCCESS,
    UPDATE_VIDEOS_SUCCESS,
    ADD_VIDEOS_SUCCESS,
} from '../constants/videos'

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: null,
}

const videosReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_VIDEOS_REQUEST:
            return {
                ...state,
                requesting: true,
            }
        case FETCH_VIDEOS_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data,
            }
        case FETCH_VIDEOS_FAIL:
            return {
                ...state,
                requesting: false,
                success: false,
                message: payload.message,
            }
        case DELETE_VIDEOS_SUCCESS:
            //Xóa data sau hành động xóa
            let deletedData = Object.values(state.data)?.filter(e => {
                return payload.id != e.id
            })
            return {
                ...state,
                requesting: false,
                success: true,
                data: deletedData,
            }
        case UPDATE_VIDEOS_SUCCESS:
            //update data sau hành động update
            const oldState = Object.values(state.data)?.filter(e => e.id != payload.video.id)
            const newState = [...oldState, payload.video]
            return {
                ...state,
                data: newState,
            }
        case ADD_VIDEOS_SUCCESS:
            //add data sau hành động add
            return {
                ...state,
            }
        default:
            return state
    }
}

export default videosReducer
