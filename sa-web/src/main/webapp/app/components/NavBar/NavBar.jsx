import React, { Component } from "react";
import { connect } from 'react-redux';
import { Login } from '../Login';
import { userActions } from '../../_actions';

import "./NavBar.scss";

class NavBar extends Component {

    handleLogoutUser() {
        return () => this.props.dispatch(userActions.logout());
    }

    render() {
        const { user } = this.props;
        return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                </ul>
                <ul className="navbar-nav navbar-right">
                    {user &&
                        <li className="nav-item"><span className="navbar-text">Hello {user.firstName}!</span></li>}
                    {user &&  <li className="nav-item"><a className=" nav-link"><i className="fa fa-sign-out fa-lg" aria-hidden="true" onClick={this.handleLogoutUser()}></i></a></li>}
                    {!user &&
                        <li className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" id="loginDropdown" data-toggle="dropdown"><b>Login</b> <span className="caret"></span></a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="loginDropdown">
                                <Login />
                            </div>
                        </li>}
                        
                </ul>
            </div>
        </nav>);
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedNavBar = connect(mapStateToProps)(NavBar);
export { connectedNavBar as NavBar }; 