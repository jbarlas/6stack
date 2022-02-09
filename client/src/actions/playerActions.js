import { GET_PLAYERS, ADD_PLAYER, DELETE_PLAYER } from "./types";

export const getPlayers = () => {
    return {
        type: GET_PLAYERS
    }
}