import {v1 as uuid} from 'uuid';
import { GET_PLAYERS, ADD_PLAYER, DELETE_PLAYER } from "../actions/types";

const initialState = {
    players :[
        {
            id : uuid(), 
            battleTag: "squirtle",
            teamid: "team1",
            avgsr: "1234",
            tanksr: "2345",
            dmgsr: "3456",
            suppsr: "5678",
            topHeros: ""
        }, 
        {
            id : uuid(), 
            battleTag: "okay i had to fuck with the store",
            teamid: "team2",
            avgsr: "0989",
            tanksr: "9766",
            dmgsr: "6545",
            suppsr: "2352",
            topHeros: ""
        }
    ]
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PLAYERS:
            return {
                ...state
            };
        case DELETE_PLAYER:
            return {
                ...state,
                players: state.players.filter(item => item.id !== action.payload)
            };
        case ADD_PLAYER:
            return {
                ...state,  
                players: [action.payload, ...state.players]
            }
        default:
            return state;
    }
}