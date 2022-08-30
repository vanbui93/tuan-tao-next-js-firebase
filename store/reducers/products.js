import {
    ADD_PRODUCT_SUCCESS,
    DELETE_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_FAIL,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    UPDATE_PRODUCT_SUCCESS,
} from '../constants/products'

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: null,
}

const productReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                requesting: true,
            }
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data,
            }
        case FETCH_PRODUCTS_FAIL:
            return {
                ...state,
                requesting: false,
                success: false,
                message: payload.message,
            }
        case DELETE_PRODUCT_SUCCESS:
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
        case UPDATE_PRODUCT_SUCCESS:
            //update data sau hành động update
            const oldState = Object.values(state.data)?.filter(e => e.id != payload.product.id)
            const newState = [...oldState, payload.product]
            return {
                ...state,
                data: newState,
            }
        case ADD_PRODUCT_SUCCESS:
            //add data sau hành động add
            return {
                ...state,
            }
        default:
            return state
    }
}

export default productReducer
