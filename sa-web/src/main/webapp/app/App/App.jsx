// @flow
import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import { toastr } from "react-redux-toastr";

import type { Dispatch } from "redux";
import type { Action } from "../types/Action";
import type { Alert } from "../types/Custom";

import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { NavBar, SideBar, Footer } from "../components";

import { Home } from "../components/Home";
import { NotFound } from "../components/NotFound";
import { Register } from "../components/Register";
import * as Waves from "node-waves";
import "./App.scss";

type Props = {
  dispatch: Dispatch<Action>,
  alert: Alert
};

class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    const { dispatch } = this.props;
    history.listen(() => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  /* eslint-disable no-undef */
  componentDidMount() {
    Waves.attach(".button", ["waves-button", "waves-float"]);
    Waves.init();
  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        <ReduxToastr
          timeOut={4000}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
        />
        {alert.message && (
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        )}
        {alert.message && (
          <div className="header">
            <div className="logo_container">
              <div className="col-md-4">
                <div className="row">
                  <div className="view col-2">
                    <div className="plane main">
                      <div className="circle" />
                      <div className="circle" />
                      <div className="circle" />
                      <div className="circle" />
                      <div className="circle" />
                      <div className="circle" />
                    </div>
                  </div>
                  <div className="col-5">
                    <a href="/" className="sa-logo">
                      <span className="sri">Sri</span>
                      <span className="smText">&#9672;</span>Astrology
                    </a>
                    <p className="smText text-right">Past. Present. Future.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="clear" />
          </div>
        )}
        <header>
          <SideBar />
          <NavBar />
        </header>
        <main>
          <div>
            <button
              onClick={() => toastr.success("The title", "The message")}
              type="button"
            >
              Toastr Success
            </button>
          </div>
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/register" component={Register} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { alert } = state;
  return {
    alert
  };
};

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
