import {GET_PROFILE, PROFILE_ERROR, REMOVE_PROFILE} from '../actions/types'
const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true, 
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type){
        case GET_PROFILE:
            return {
                ...state, 
                profile: payload.profile,
                loading: false 
            }

        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

        case REMOVE_PROFILE:
            return {
                ...state,
                profile: null,
                profiles: [],
                repos: [],
                loading: false
            }

        default:
            return state
    }
}