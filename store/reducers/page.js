import {
    FETCH_PAGE_REQUEST,
    FETCH_PAGE_SUCCESS,
    FETCH_PAGE_FAIL,
    DELETE_PAGE_SUCCESS,
    UPDATE_PAGE_SUCCESS,
    ADD_PAGE_SUCCESS,
} from '../constants/page'

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: null,
}

const pageReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_PAGE_REQUEST:
            return {
                ...state,
                requesting: true,
            }
        case FETCH_PAGE_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data,
            }
        case FETCH_PAGE_FAIL:
            return {
                ...state,
                requesting: false,
                success: false,
                message: payload.message,
            }
        case DELETE_PAGE_SUCCESS:
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
        case UPDATE_PAGE_SUCCESS:
            //update data sau hành động update
            const oldState = Object.values(state.data)?.filter(e => e.id != payload.page.id)
            const newState = [...oldState, payload.page]
            return {
                ...state,
                data: newState,
            }
        case ADD_PAGE_SUCCESS:
            //add data sau hành động add
            return {
                ...state,
            }
        default:
            return state
    }
}

export default pageReducer
