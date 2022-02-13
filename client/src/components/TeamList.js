import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
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
                <ListGroup>
                    {players.map(({ id, battleTag, teamid, avgsr, tanksr, dmgsr, suppsr, topHeros }) => (
                        <ListGroupItem>
                            <Button
                                className='remove-btn'
                                color='danger'
                                size='sm'
                                onClick={this.onDeleteClick.bind(this, id)}
                            >
                                &times;
                            </Button>
                            BattleTag: { battleTag },
                            AvgSR: { avgsr }, 
                            TankSR: { tanksr }, 
                            DmgSR: { dmgsr }, 
                            SuppSR: { suppsr }, 
                            Top Heros: { topHeros }
                        </ListGroupItem>
                    ))}
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

export default connect(
    mapStateToProps, 
    { getPlayers, deletePlayer}
) (TeamList);