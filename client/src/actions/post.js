import axios from 'axios';

import {GET_POSTS, ADD_POST} from './types';
import {setAlert} from './alert';


// Get all posts
export const getAllPosts = () => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try{
        const res = await axios.get("/api/post", config)
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch(setAlert("Couldn't load posts. ", 'danger', 3000))
    }
}

// Add post
export const addPost = (name, text) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({name, text})

    try {        
        const res = await axios.post('/api/post', body, config)
        
        dispatch({
            type: ADD_POST,
            payload: res.data['post']
        })

        dispatch(setAlert(res.data.msg, 'success'))

    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error=>{
                dispatch(setAlert(error.msg, 'danger', 2000))
            })
        }
    }
}


// Add reply to a post
export const addReply = (post_id, text) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({text})

    try {        
        const res = await axios.post(`/api/post/comment/${post_id}`, body, config)

        dispatch(setAlert(res.data.msg, 'success'))

        getAllPosts()

    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error=>{
                dispatch(setAlert(error.msg, 'danger', 2000))
            })
        }
    }
}
