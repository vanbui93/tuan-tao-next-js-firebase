import {
    ADD_CMT_SUCCESS,
    DELETE_CMT_SUCCESS,
    FETCH_CMT_FAIL,
    FETCH_CMT_REQUEST,
    FETCH_CMT_SUCCESS,
    UPDATE_CMT_SUCCESS,
} from '../constants/cmt'

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: [],
}

const cmtReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_CMT_REQUEST:
            return {
                ...state,
                requesting: true,
            }
        case FETCH_CMT_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data,
            }
        case FETCH_CMT_FAIL:
            return {
                ...state,
                requesting: false,
                success: false,
                message: payload.message,
            }
        case DELETE_CMT_SUCCESS:
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
        case UPDATE_CMT_SUCCESS:
            //update data sau hành động update
            const oldState = Object.values(state.data)?.filter(e => e.id != payload.cmt.id)
            const newState = [...oldState, payload.cmt]
            return {
                ...state,
                data: newState,
            }
        case ADD_CMT_SUCCESS:
            //add data sau hành động add
            return {
                ...state,
            }
        default:
            return state
    }
}

export default cmtReducer
