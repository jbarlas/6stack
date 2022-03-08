import React, { Component } from 'react';
import { Container, 
    ListGroup, 
    ListGroupItem, 
    Button, 
    Table, 
    UncontrolledAccordion, 
    Accordion,
    AccordionItem, 
    AccordionBody,
    AccordionHeader, 
 } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getTeams, deleteTeam } from '../actions/teamActions'
import teamReducer from '../reducers/teamReducer';
import PropTypes from 'prop-types';
import PlayerModal from './PlayerModal';
import PlayerList from './PlayerList';

class TeamList extends Component {

    static propTypes = {
        getTeams: PropTypes.func.isRequired, 
        teams: PropTypes.object,
        isAuthenticated: PropTypes.bool,
    }


    state = {
        openTeams: [],
        teams: this.props.teams
    }

    componentDidMount() {
        this.props.getTeams();
    }

    onDeleteClick = (id) => {
        this.props.deleteTeam(id);
    } 

    toggle = (id) => {
        if (this.state.openTeams.includes(id)) {
            this.setState({openTeams: this.state.openTeams.filter(teamId => teamId !== id)})
        } else {
            this.setState({openTeams: [...this.state.openTeams, id]});
        }
    }

    updateteamlist = (teams) => { 
        this.setState({teams: teams})
    }

    render () {
        const { teams } = this.props.teams;
        return (
            <Container>
                <Accordion
                    flush
                    open={this.state.openTeams}
                    toggle={this.toggle}
                >
                    {teams.map(({name, players, _id}) => 
                        <AccordionItem accordionId={_id.toString()}>
                            <AccordionHeader targetId={_id.toString()}>
                                {name}
                            </AccordionHeader>
                            <AccordionBody accordionId={_id.toString()}>
                                <PlayerModal teamid={_id} updateteamlist={this.updateteamlist}/>
                                <PlayerList teamid={_id} players={players}/>
                                { this.props.isAuthenticated ? 
                                <Button
                                    className='remove-btn'
                                    color='danger'
                                    size='sm'
                                    onClick={this.onDeleteClick.bind(this, _id)}
                                >
                                    Delete Team
                                </Button> : null
                                }
                            </AccordionBody>
                        </AccordionItem>)}
                </Accordion>
            </Container>
        );
    }
}


const mapStateToProps = (state) => ({
    teams: state.team,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
    mapStateToProps, 
    { getTeams, deleteTeam }
) (TeamList);