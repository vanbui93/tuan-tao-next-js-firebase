import {
    ADD_SLIDE_SUCCESS,
    DELETE_SLIDE_SUCCESS,
    FETCH_SLIDE_IMG_FAIL,
    FETCH_SLIDE_IMG_REQUEST,
    FETCH_SLIDE_IMG_SUCCESS,
    UPDATE_SLIDE_SUCCESS,
} from '../constants/slides'

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: [],
}

const slideReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_SLIDE_IMG_REQUEST:
            return {
                ...state,
                requesting: true,
            }
        case FETCH_SLIDE_IMG_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data,
            }
        case FETCH_SLIDE_IMG_FAIL:
            return {
                ...state,
                requesting: false,
                success: false,
                message: payload.message,
            }
        case DELETE_SLIDE_SUCCESS:
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
        case UPDATE_SLIDE_SUCCESS:
            //update data sau hành động update
            const oldState = Object.values(state.data)?.filter(e => e.id != payload.slide.id)
            const newState = [...oldState, payload.slide]
            return {
                ...state,
                data: newState,
            }
        case ADD_SLIDE_SUCCESS:
            //add data sau hành động add
            return {
                ...state,
            }
        default:
            return state
    }
}

export default slideReducer
