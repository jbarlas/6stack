import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Table,  } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getPlayers, deletePlayer } from '../actions/playerActions'
import playerReducer from '../reducers/playerReducer';
import PropTypes from 'prop-types';

class TeamList extends Component {

    componentDidMount() {
        this.props.getPlayers();
    }

    onDeleteClick = (id) => {
        this.props.deletePlayer(id);
    } 

    render () {
        const { players } = this.props.player;
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
                    {players.map(({ id, battleTag, teamid, avgsr, tanksr, dmgsr, suppsr, topHeros }) => (
                        <tr>
                            <td>
                                <Button
                                    className='remove-btn'
                                    color='danger'
                                    size='sm'
                                    onClick={this.onDeleteClick.bind(this, id)}
                                >
                                    &times;
                                </Button>
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

TeamList.propTypes = {
    getPlayers: PropTypes.func.isRequired, 
    player: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    player: state.player
})

export default connect(
    mapStateToProps, 
    { getPlayers, deletePlayer}
) (TeamList);