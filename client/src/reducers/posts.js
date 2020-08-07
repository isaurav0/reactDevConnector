import { GET_POSTS, ADD_POST } from '../actions/types';
const initialState = {
    posts: [],
    loading: true
}

export default function ( state = initialState, action ){
    const { payload, type } = action
    
    switch(type){
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case ADD_POST:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        default:
            return state;
    }
}
