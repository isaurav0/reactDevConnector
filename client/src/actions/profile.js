import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    REMOVE_PROFILE,
    GET_PROFILES,
    GET_REPOS
} from './types';


//Get current user's profiles
export const getCurrentProfile = () => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try{
        const res = await axios.get("/api/profile/me", config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err, status: err }
        })
    }
}

//Get all user's profiles
export const getAllProfiles = () => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try{
        const res = await axios.get("/api/profile", config)

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err, status: err }
        })
    }
}

//Get profiles by id
export const getProfileById = userId => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try{
        const res = await axios.get(`/api/profile/user/${userId}`, config)
        
        const data = { profile: res.data }

        dispatch({
            type: GET_PROFILE,
            payload: data
        })

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err, status: err }
        })
    }
}


//create or update profile

export const updateProfile = (formData, history, edit=false) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(formData)

    try {        
        const res = await axios.post('/api/profile', body, config)
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(edit ? 'Profile Updated.': 'Profile Edited.', 'success'))

        if(!edit){
            history.push('/dashboard')
        }
    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error=>{
                dispatch(setAlert(error.msg, 'danger', 2000))
            })
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

}


//add education
export const addEducation = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(formData)

    try {        
        await axios.put('/api/profile/education', body, config)

        dispatch(setAlert('Education Added.', 'success'))

        history.push('/dashboard')
        
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


//add experience
export const addExperience = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(formData)

    try {        
        await axios.put('/api/profile/experience', body, config)
        dispatch(setAlert('Experience Added.', 'success'))

        history.push('/dashboard')
        
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


//delete experience
export const deleteExperience = id => async dispatch => {

    try {        
        const res = await axios.delete(`/api/profile/experience/${id}`)

        window.location.reload()

        dispatch(setAlert(res.data.msg, 'success', 2000))

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

//delete education
export const deleteEducation = id => async dispatch => {

    try {        
        const res = await axios.delete(`/api/profile/education/${id}`)

        window.location.reload()

        dispatch(setAlert(res.data.msg, 'success', 2000))

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

export const deleteAccount = () => async dispatch => {

    window.prompt("Are you sure you want to delete the profile?")

    try {
        await axios.delete(`/api/profile`)
        dispatch({
            type: REMOVE_PROFILE
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//Get github repos by id
export const getGithubRepo = username => async dispatch => {


    try{
        const res = await axios.get(`/api/profile/github/${username}`)
        
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err, status: err }
        })
    }
}


