import axios from 'axios';
import { REGISTER_FAIL, REGISTER_SUCCESS } from './types';
import { setAlert } from './alert';


export const register = ({ name, email, password }) => async dispatch => {
    console.log("register called")

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password })

    try {
        const res = axios.post('http://dev.saurab.me/api/users', body, config)
        console.log(res)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    } catch (err) {

        const errors = err.response.data.errors;
        if(errors){
            console.log(errors)
            errors.forEach(error=>{
                setAlert(error, 'danger', 3000)
            })
        }

        dispatch({
            type: REGISTER_FAIL
        })
        console.log(errors)
    }

}