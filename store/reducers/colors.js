import {
    FETCH_COLORS_REQUEST,
    FETCH_COLORS_SUCCESS,
    FETCH_COLORS_FAIL,
    UPDATE_COLORS_SUCCESS,
    DELETE_COLORS_SUCCESS,
    ADD_COLORS_SUCCESS,
} from '../constants/colors'

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: null,
}

const colorsReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_COLORS_REQUEST:
            return {
                ...state,
                requesting: true,
            }
        case FETCH_COLORS_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data,
            }
        case FETCH_COLORS_FAIL:
            return {
                ...state,
                requesting: false,
                success: false,
                message: payload.message,
            }
        case DELETE_COLORS_SUCCESS:
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
        case UPDATE_COLORS_SUCCESS:
            //update data sau hành động update
            const oldState = Object.values(state.data)?.filter(e => e.id != payload.color.id)
            const newState = [...oldState, payload.color]
            return {
                ...state,
                data: newState,
            }
        case ADD_COLORS_SUCCESS:
            //add data sau hành động add
            return {
                ...state,
            }
        default:
            return state
    }
}

export default colorsReducer
