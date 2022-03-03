import axios from 'axios';
import { GET_TEAMS, ADD_TEAM, DELETE_TEAM, TEAMS_LOADING } from "./types";
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getTeams = () => dispatch => {
    dispatch(setTeamsLoading());
    axios
        .get('/api/teams')
        .then(res => 
            dispatch({
                type: GET_TEAMS,
                payload: res.data
            }))
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const addTeam = (team) => (dispatch, getState) => {
    axios
        .post('/api/teams/add', team, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: ADD_TEAM,
                payload: res.data
            }))
            .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const deleteTeam = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/teams/delete/${id}`, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: DELETE_TEAM,
                payload: id
            }))
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const setTeamsLoading = () => {
    return {
        type: TEAMS_LOADING
    };
}