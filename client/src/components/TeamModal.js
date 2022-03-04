import React, { Component } from 'react';
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    Form, 
    FormGroup, 
    Label, 
    Input,
    Spinner
} from 'reactstrap';
import { connect } from 'react-redux';
import { addTeam } from '../actions/teamActions';
import { PropTypes } from 'prop-types';

class TeamModal extends Component {
    state = {
        modal: false,
        loading: false,
        name: '',
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object
    }

    toggle = () => {
        this.setState({ 
            modal: !this.state.modal,
        });
    }

    setLoading = () => {
        this.setState({ 
            loading: !this.state.loading
        });
    }

    onChange = (e) => {
        this.setState({ name: e.target.value });
    }


    onSubmit = (e) => {
        e.preventDefault();

        let newTeam = {
            name: this.state.name,
        }

        this.props.addTeam(newTeam)
        
        // close modal
        this.toggle();
    }

    render() {
        return(
            <div>

                { this.props.isAuthenticated ? 
                    <Button
                        color='dark'
                        style={{marginBottom:'2rem'}}
                        onClick={this.toggle}
                        >Add Team
                    </Button> :
                    <h4 className='mb-3 ml-4'>Please log in to create a team</h4>
                }

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Create team</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='player'>Team</Label>
                                <Input
                                    type='text'
                                    name='name'
                                    id='team'
                                    placeholder='Create team'
                                    onChange={this.onChange}
                                />
                                <Button
                                    color='dark'
                                    style={{marginTop: '2rem'}}
                                    type='submit'
                                    block>
                                    Create team
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    teams: state.team,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
    mapStateToProps, 
    { addTeam }
) (TeamModal);