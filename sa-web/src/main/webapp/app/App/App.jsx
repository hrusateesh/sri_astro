import React, { Component, Fragment } from 'react';
import { Router, Route, Switch } from 'react-router';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../components';

import { NavBar } from '../components/NavBar';
import { Home } from '../components/Home';
import { NotFound } from '../components/NotFound';
import { Register } from '../components/Register';
import "./App.scss";

class App extends Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div>
                {alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
                <div className="header">
                    <div className="logo_container">
                        <div className="col-md-4">
                            
                            <div className="row">
                                <div className="view col-2">
                                    <div className="plane main">
                                        <div className="circle"></div>
                                        <div className="circle"></div>
                                        <div className="circle"></div>
                                        <div className="circle"></div>
                                        <div className="circle"></div>
                                        <div className="circle"></div>
                                    </div>
                                </div>
                                <div className="col-5">
                                <a href="/" className="sa-logo"><span className="sri">Sri</span><span className="smText">&#9672;</span>Astrology</a><p className="smText text-right">Past. Present. Future.</p>
                                    
                                </div>
                                </div>
                        </div>
                    </div>                            
                    <div className="clear"></div>
                </div>
                <NavBar />
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/register" component={Register} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 