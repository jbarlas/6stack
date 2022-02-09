import {v1 as uuid} from 'uuid';
import { GET_PLAYERS, ADD_PLAYER, DELETE_PLAYER } from "../actions/types";

const initialState = {
    players :[
        {
            id : uuid(), 
            battletag: "squirtle",
            teamid: "team1",
            avgsr: "1234",
            tanksr: "2345",
            dmgsr: "3456",
            suppsr: "5678",
            topHeros: ["ana", "zen"]
        }, 
        {
            id : uuid(), 
            battletag: "okay i had to fuck with the store",
            teamid: "team2",
            avgsr: "0989",
            tanksr: "9766",
            dmgsr: "6545",
            suppsr: "2352",
            topHeros: ["ur", "mom"]
        }
    ]
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PLAYERS:
            return {
                ...state
            }
        default:
            return state;
    }
}