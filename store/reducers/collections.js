import {
    FETCH_COLLECTIONS_FAIL,
    FETCH_COLLECTIONS_REQUEST,
    FETCH_COLLECTIONS_SUCCESS,
    UPDATE_COLLECTIONS_SUCCESS,
} from '../constants/collections'

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: [],
}

const collectionReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_COLLECTIONS_REQUEST:
            return {
                ...state,
                requesting: true,
            }
        case FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data,
            }
        case FETCH_COLLECTIONS_FAIL:
            return {
                ...state,
                requesting: false,
                success: false,
                message: payload.message,
            }
        case UPDATE_COLLECTIONS_SUCCESS:
            //update data sau hành động update
            const oldState = Object.values(state.data)?.filter(e => e.id !== payload.collection.id)
            const newState = [...oldState, payload.collection]
            return {
                ...state,
                data: newState,
            }
        default:
            return state
    }
}

export default collectionReducer
