import {
    ADD_MENUS_SUCCESS,
    DELETE_MENUS_SUCCESS,
    FETCH_MENUS_FAIL,
    FETCH_MENUS_REQUEST,
    FETCH_MENUS_SUCCESS,
    UPDATE_MENUS_SUCCESS,
} from '../constants/menus'

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: [],
}

const menuReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_MENUS_REQUEST:
            return {
                ...state,
                requesting: true,
            }
        case FETCH_MENUS_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data,
            }
        case FETCH_MENUS_FAIL:
            return {
                ...state,
                requesting: false,
                success: false,
                message: payload.message,
            }
        case DELETE_MENUS_SUCCESS:
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
        case UPDATE_MENUS_SUCCESS:
            //update data sau hành động update
            const oldState = Object.values(state.data)?.filter(e => e.id != payload.menu.id)
            const newState = [...oldState, payload.menu]
            return {
                ...state,
                data: newState,
            }
        case ADD_MENUS_SUCCESS:
            //add data sau hành động add
            return {
                ...state,
            }
        default:
            return state
    }
}

export default menuReducer
