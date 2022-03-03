import { GET_TEAMS, ADD_TEAM, DELETE_TEAM, TEAMS_LOADING } from "../actions/types";

const initialState = {
    teams : [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_TEAMS:
            return {
                ...state,
                teams: action.payload,
                loading: false
            };
        case DELETE_TEAM:
            return {
                ...state,
                teams: state.players.filter(team => team._id !== action.payload)
            };
        case ADD_TEAM:
            return {
                ...state,  
                teams: [...state.teams, action.payload]
            };
        case TEAMS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}