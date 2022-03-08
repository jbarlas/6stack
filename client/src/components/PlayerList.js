import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Table,  } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getPlayers, deletePlayer } from '../actions/playerActions'
import { updateTeam, getTeams } from '../actions/teamActions';
import playerReducer from '../reducers/playerReducer';
import PropTypes from 'prop-types';

class PlayerList extends Component {

    state = {
        players: this.props.players,
        teamid: this.props.teamid
    }

    static propTypes = {
        getPlayers: PropTypes.func.isRequired, 
        teams: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
    }
    
    componentDidMount() {
        //this.props.getPlayers();
        //this.props.getTeams();
    }
    

    onDeleteClick = (id) => {
        const filteredPlayers = this.state.players.filter(player => player.battleTag !== id);
        console.log(filteredPlayers);
        let teamToUpdate = this.props.teams.find(team => team._id === this.state.teamid);
        teamToUpdate.players = filteredPlayers;
        this.setState({ players : filteredPlayers });
        this.props.updateTeam(teamToUpdate);
    } 

    render () {
        const players = this.state.players
        return (
            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Battle Tag</th>
                            <th>Average SR</th>
                            <th>Tank SR</th>
                            <th>Damage SR</th>
                            <th>Support SR</th>
                            <th>Top Heros</th>
                        </tr>
                    </thead>
                    <tbody>
                    {players.map(({ battleTag, avgsr, tanksr, dmgsr, suppsr, topHeros }) => (
                        <tr key={battleTag}>
                            <td>
                                { this.props.isAuthenticated ? 
                                <Button
                                    className='remove-btn'
                                    color='danger'
                                    size='sm'
                                    onClick={this.onDeleteClick.bind(this, battleTag)}
                                >
                                    &times;
                                </Button> : null
                                }

                            </td>
                            <td>{ battleTag }</td>
                            <td>{ avgsr }</td>
                            <td>{ tanksr }</td>
                            <td>{ dmgsr }</td>
                            <td>{ suppsr }</td>
                            <td>{ topHeros }</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Container>
        );
    }
}


const mapStateToProps = (state) => ({
    //players: state.player,
    teams: state.team.teams,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps, 
    { getPlayers, deletePlayer, updateTeam, getTeams }
) (PlayerList);