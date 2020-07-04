import {GET_PROFILE, PROFILE_ERROR, REMOVE_PROFILE, PROFILE_UPDATE, 
        GET_PROFILES, GET_REPOS } from '../actions/types'
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

        case GET_PROFILES:
                return {
                    ...state,
                    profiles: payload,
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

        case PROFILE_UPDATE:
            return { 
                ...state, 
                profile: payload.profile,
            }

        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            }

        default:
            return state
    }
}