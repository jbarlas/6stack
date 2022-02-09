import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {v1 as uuid} from 'uuid';
import { connect } from 'react-redux';
import { getPlayers } from '../actions/playerActions'
import playerReducer from '../reducers/playerReducer';
import PropTypes from 'prop-types';

class TeamList extends Component {

    componentDidMount() {
        this.props.getPlayers();
    }

    render () {
        const { players } = this.props.player;
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
                                    id: uuid(), 
                                    battletag: name,
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

                <ListGroup>
                    <TransitionGroup className="team-list">
                        {players.map(({ id, battletag, teamid, avgsr, tanksr, dmgsr, suppsr, topHeros }) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className='remove-btn'
                                        color='danger'
                                        size='sm'
                                        onClick={() => {
                                            this.setState(state => ({
                                                players: state.players.filter(player => player.id !== id)
                                            }));
                                        }}>
                                        &times;
                                    </Button>

                                    BattleTag: {battletag},
                                    AvgSR: { avgsr }, 
                                    TankSR: { tanksr }, 
                                    DmgSR: { dmgsr }, 
                                    SuppSR: { suppsr }, 
                                    Top Heros: { topHeros }
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

TeamList.propTypes = {
    getPlayers: PropTypes.func.isRequired, 
    player: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    player: state.player
})

export default connect(mapStateToProps, { getPlayers }) (TeamList);