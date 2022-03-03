import React, { Component, Fragment } from 'react';
import {
    Collapse, 
    Navbar, 
    NavbarToggler, 
    NavbarBrand, 
    Nav, 
    NavItem, 
    NavLink, 
    Container,
    NavbarText
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal'
import Logout from  './auth/Logout';
import LoginModal from './auth/LoginModal';

class AppNavbar extends Component {
    state = {
        isOpen : false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavbarText>
                    <span className="navbar-text">
                        <strong>{ user ? `Welcome ${user.name}` : ''}</strong>
                    </span>
                </NavbarText>
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        )

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        )

        return (
        
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <NavbarBrand>
                    <img 
                        alt="owlogo" 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Overwatch_circle_logo.svg/1024px-Overwatch_circle_logo.svg.png" 
                        width="30" height="30" 
                        className="d-inline-block align-top"
                    />
                    6stack
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        { isAuthenticated ? authLinks : guestLinks }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavbar);