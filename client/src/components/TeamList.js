import React, { Component } from 'react';
import { Container, 
    ListGroup, 
    ListGroupItem, 
    Button, 
    Table, 
    UncontrolledAccordion, 
    AccordionItem, 
    AccordionHeader, 
 } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getTeams, deleteTeam } from '../actions/teamActions'
import teamReducer from '../reducers/teamReducer';
import PropTypes from 'prop-types';

class TeamList extends Component {

    static propTypes = {
        getTeams: PropTypes.func.isRequired, 
        team: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        this.props.getTeams();
    }

    onDeleteClick = (id) => {
        this.props.deleteTeam(id);
    } 

    render () {
        const { teams } = this.props.team;
        return (
            <Container>
                <UncontrolledAccordion

                >
                    {teams.map(({name, players, _id}) => (
                        <AccordionItem toggler= '#toggler' key={_id}>
                            <AccordionHeader targetId={_id}>
                                {name}
                            </AccordionHeader>
                            <AccordionItem accordionid={_id}>
                                This is where the list of players in the team will go
                            </AccordionItem>
                        </AccordionItem>
                    ))}
                </UncontrolledAccordion>
            </Container>
        );
    }
}


const mapStateToProps = (state) => ({
    team: state.team,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
    mapStateToProps, 
    { getTeams, deleteTeam }
) (TeamList);