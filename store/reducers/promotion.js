import {
    ADD_PROMOTIONS_SUCCESS,
    DELETE_PROMOTIONS_SUCCESS,
    FETCH_PROMOTIONS_FAIL,
    FETCH_PROMOTIONS_REQUEST,
    FETCH_PROMOTIONS_SUCCESS,
    UPDATE_PROMOTIONS_SUCCESS,
} from '../constants/promotion'

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: null,
}

const promotionReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_PROMOTIONS_REQUEST:
            return {
                ...state,
                requesting: true,
            }
        case FETCH_PROMOTIONS_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data,
            }
        case FETCH_PROMOTIONS_FAIL:
            return {
                ...state,
                requesting: false,
                success: false,
                message: payload.message,
            }
        case DELETE_PROMOTIONS_SUCCESS:
            //Xóa data sau hành động xóa
            let deletedData = Object.values(state.data)?.filter(e => {
                return payload.id !== e.id
            })
            return {
                ...state,
                requesting: false,
                success: true,
                data: deletedData,
            }
        case UPDATE_PROMOTIONS_SUCCESS:
            //update data sau hành động update
            const oldState = Object.values(state.data)?.filter(e => e.id != payload.promotion.id)
            const newState = [...oldState, payload.promotion]
            return {
                ...state,
                data: newState,
            }
        case ADD_PROMOTIONS_SUCCESS:
            //add data sau hành động add
            return {
                ...state,
            }
        default:
            return state
    }
}

export default promotionReducer
