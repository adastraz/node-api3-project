import {
    FETCHING_START,
    FETCHING_ERROR,
    USERS
} from '../actions'

const initialState = {
    isLoading: false,
    users: [],
    error: null
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_START:
            return {
                ...state,
                isLoading: true,
                error:null
            }
        case FETCHING_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case USERS:
            return {
                ...state,
                isLoading: false,
                error: null,
                users: action.payload
            }
        default: 
            return state
    }
}