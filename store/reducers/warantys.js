import {
    FETCH_WARANTYS_REQUEST,
    FETCH_WARANTYS_SUCCESS,
    FETCH_WARANTYS_FAIL,
    DELETE_WARANTYS_SUCCESS,
    UPDATE_WARANTYS_REQUEST,
    ADD_WARANTYS_SUCCESS,
} from '../constants/waranty'

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: null,
}

const warantysReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_WARANTYS_REQUEST:
            return {
                ...state,
                requesting: true,
            }
        case FETCH_WARANTYS_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data,
            }
        case FETCH_WARANTYS_FAIL:
            return {
                ...state,
                requesting: false,
                success: false,
                message: payload.message,
            }
        case DELETE_WARANTYS_SUCCESS:
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
        case UPDATE_WARANTYS_REQUEST:
            //update data sau hành động update
            const oldState = Object.values(state.data)?.filter(e => e.id != payload.waranty.id)
            const newState = [...oldState, payload.waranty]
            return {
                ...state,
                data: newState,
            }
        case ADD_WARANTYS_SUCCESS:
            //add data sau hành động add
            return {
                ...state,
            }
        default:
            return state
    }
}

export default warantysReducer
