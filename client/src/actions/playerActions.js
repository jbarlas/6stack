import axios from 'axios';
import { GET_PLAYERS, ADD_PLAYER, DELETE_PLAYER, PLAYERS_LOADING } from "./types";

export const getPlayers = () => dispatch => {
    dispatch(setPlayersLoading());
    axios
        .get('/api/players')
        .then(res => 
            dispatch({
                type: GET_PLAYERS,
                payload: res.data
            }))
}

export const addPlayer = (player) => dispatch => {
    axios
        .post('/api/players/add', player)
        .then(res => 
            dispatch({
                type: ADD_PLAYER,
                payload: res.data
            }))
}

export const deletePlayer = (id) => dispatch => {
    axios
        .delete(`/api/players/delete/${id}`)
        .then(res => 
            dispatch({
                type: DELETE_PLAYER,
                payload: id
            }))
}

export const setPlayersLoading = () => {
    return {
        type: PLAYERS_LOADING
    };
}