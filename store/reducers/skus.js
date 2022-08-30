import {
    ADD_SKUS_SUCCESS,
    DELETE_SKUS_SUCCESS,
    FETCH_SKUS_FAIL,
    FETCH_SKUS_REQUEST,
    FETCH_SKUS_SUCCESS,
    UPDATE_SKUS_SUCCESS,
} from '../constants/skus'

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: null,
}

const skusReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_SKUS_REQUEST:
            return {
                ...state,
                requesting: true,
            }
        case FETCH_SKUS_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data,
            }
        case FETCH_SKUS_FAIL:
            return {
                ...state,
                requesting: false,
                success: false,
                message: payload.message,
            }
        case DELETE_SKUS_SUCCESS:
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
        case UPDATE_SKUS_SUCCESS:
            //update data sau hành động update
            const oldState = Object.values(state.data)?.filter(e => e.id != payload.sku.id)
            const newState = [...oldState, payload.sku]
            return {
                ...state,
                data: newState,
            }
        case ADD_SKUS_SUCCESS:
            //add data sau hành động add
            return {
                ...state,
            }
        default:
            return state
    }
}

export default skusReducer
