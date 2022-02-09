import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {v1 as uuid} from 'uuid';

class TeamList extends Component {
    state = {
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
                battletag: "peepee",
                teamid: "team2",
                avgsr: "0989",
                tanksr: "9766",
                dmgsr: "6545",
                suppsr: "2352",
                topHeros: ["ur", "mom"]
            }
        ]
    }

    render () {
        const { players } = this.state;
        return (
            <Container>
                <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={() => {
                        const name = prompt('Enter player battleTag');
                        if (name) {
                            this.setState(state => ({
                                players: [...state.players, 
                                    {
                                    id: uuid(), battletag: name,
                                    teamid: "",
                                    avgsr: "",
                                    tanksr: "",
                                    dmgsr: "",
                                    suppsr: "",
                                    topHeros: []
                                    }]
                            }));
                        }
                    }}>
                    Add Player
                </Button>
            </Container>
        );
    }
}

export default TeamList