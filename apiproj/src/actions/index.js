import axios from 'axios'
export const FETCHING_START = 'FETCHING_START'
export const FETCHING_ERROR = 'FETCHING_ERROR'
export const USERS = 'USERS'

export const fetchUsers = () => dispatch => {
    console.log('I am in fetch user')
    dispatch ({ type: FETCHING_START })
    axios
        .get('https://obscure-scrubland-65975.herokuapp.com/api/users')
            .then(res => {
                dispatch ({ type: USERS, payload: res.data })
            })
            .catch(err => {
                dispatch ({ type: FETCHING_ERROR, payload: err. response})
            })
}

