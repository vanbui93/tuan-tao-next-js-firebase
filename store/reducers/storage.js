import {
    FETCH_STORAGE_REQUEST,
    FETCH_STORAGE_SUCCESS,
    FETCH_STORAGE_FAIL,
    DELETE_STORAGE_SUCCESS,
} from '../constants/mediaStorage'

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: [],
}

const storageReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_STORAGE_REQUEST:
            return {
                ...state,
                requesting: true,
            }
        case FETCH_STORAGE_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data,
            }
        case FETCH_STORAGE_FAIL:
            return {
                ...state,
                requesting: false,
                success: false,
                message: payload.message,
            }
        case DELETE_STORAGE_SUCCESS:
            //Xóa data sau hành động xóa
            let deletedData = Object.values(state.data)?.filter(e => {
                return payload.item != e.item
            })
            return {
                ...state,
                requesting: false,
                success: true,
                data: deletedData,
            }
        default:
            return state
    }
}

export default storageReducer
