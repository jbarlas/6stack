import { GET_PLAYERS, ADD_PLAYER, DELETE_PLAYER } from "./types";

export const getPlayers = () => {
    return {
        type: GET_PLAYERS
    }
}

export const deletePlayer = (id) => {
    return {
        type: DELETE_PLAYER,
        payload: id
    }
}

export const addPlayer = (player) => {
    return {
        type: ADD_PLAYER,
        payload: player
    }
}