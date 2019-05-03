// @flow
import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import PerfectScrollbar from "perfect-scrollbar";
import * as Waves from "node-waves";

import type { Action } from "../types";
import type { Alert } from "../types";

import { history } from "Helpers";
import { clearAlert } from "Actions";
import { NavBar, SideBar, SideBarMenu, SideBarItem, Footer } from "../components";
import { Home, SignUp, SignUpSuccess } from "../components";
import { ConsentBanner, CookiePolicy, PrivacyPolicy, TermsOfService } from "../components";

import "perfect-scrollbar/css/perfect-scrollbar.css";

const NotFound = React.lazy(() => import(/* webpackChunkName: "notFound" */ "../components/pages/NotFound"));

type Props = {
  dispatch: Dispatch<Action>,
  alert: Alert
};
type GistType = {
  icon?: string,
  desc: string,
  children?: Array<GistType>,
  link?: string
};

type State = {
  gists: Array<GistType>
};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      gists: [
        {
          icon: "fa fa-tachometer-alt",
          desc: "Dashboards",
          children: [{ link: "/", desc: "Home" }, { link: "/dash/dash02.html", desc: "Version 2" }]
        },
        {
          icon: "fas fa-user-tie",
          desc: "User",
          children: [{ link: "/signup", icon: "fa fa-bolt", desc: "Sign Up" }]
        },
        { link: "/g/12345", icon: "far fa-bell", desc: "Alerts" }
      ]
    };

    const { dispatch } = this.props;
    history.listen(() => {
      // clear alert on location change
      dispatch(clearAlert());
    });
  }

  /* eslint-disable no-undef */
  componentDidMount() {
    new PerfectScrollbar("#root");
    Waves.attach(".button", ["waves-button", "waves-float"]);
    Waves.init();
  }

  render() {
    const { alert, dispatch } = this.props;
    const { gists } = this.state;
    if (alert.message) {
      setTimeout(() => dispatch(clearAlert()), 4000);
    }
    return (
      <Router history={history}>
        <React.Fragment>
          {alert.message && (
            <div className="snackbar">
              <div className={`msg  ${alert.type}`}>{alert.message}</div>
            </div>
          )}
          <ConsentBanner />
          <header>
            <SideBar>
              {gists ? (
                gists.map((gist: any) => {
                  return gist.children ? (
                    <SideBarMenu key={gist.desc} icon={gist.icon} desc={gist.desc}>
                      {gist.children.map((subGist: any) => {
                        return (
                          <SideBarItem key={subGist.link} icon={subGist.icon} link={subGist.link} desc={subGist.desc} />
                        );
                      })}
                    </SideBarMenu>
                  ) : (
                    <SideBarItem key={gist.link} link={gist.link} icon={gist.icon} desc={gist.desc} />
                  );
                })
              ) : (
                <div>Loading ... </div>
              )}
            </SideBar>
            <NavBar />
          </header>
          <main className="p-3">
            <React.Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signupSuccess" component={SignUpSuccess} />
                <Route path="/g/:gistId" component={Gist} />
                <Route path="/legal/cookie-policy" component={CookiePolicy} />
                <Route path="/legal/privacy-policy" component={PrivacyPolicy} />
                <Route path="/legal/terms-of-service" component={TermsOfService} />
                <Route component={NotFound} />
              </Switch>
            </React.Suspense>
          </main>
          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}

const Gist = (props: any) => {
  return <div>{props.match.params.gistId}</div>;
};

const mapStateToProps = (state: any) => {
  const { alert } = state;
  return {
    alert
  };
};

export default connect(mapStateToProps)(App);
