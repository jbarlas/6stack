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
        team: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
    }


    state = {
        openTeams: []
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
                                <PlayerList teamid={_id} players={players}/>
                                <PlayerModal teamid={_id}/>
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