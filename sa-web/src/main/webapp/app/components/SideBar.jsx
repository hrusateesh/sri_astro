// @flow
import React from "react";
import { connect } from "react-redux";
import type { Dispatch } from "../types/Store";
import { CollapsableMenu } from "./CollapsableMenu";
import { userActions } from "../_actions";

import "./SideBar.scss";

// type ThunkAction = (dispatch: Dispatch, getState?: GetState) => any;

type Props = {
  dispatch: Dispatch
};

class SideBar extends React.Component<Props> {
  handleLogoutUser = () => this.props.dispatch(userActions.logout());

  render() {
    return (
      <div id="slide-out" className="side-nav sn-bg-4 fixed">
        <ul className="custom-scrollbar ps ps--theme_default">
          <li className="logo-sn waves-effect">
            <div className="text-center">
              <a
                href="#"
                data-activates="slide-out"
                className="button-collapse black-text"
                data-toggle="collapse"
                data-target="#slide-out"
                aria-controls="slide-out"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="fa fa-bars" />
              </a>
              <a href="/" className="sa-logo">
                <span className="sri">Sri</span>
                <span className="smText">&#9672;</span>Astrology
              </a>
              <p className="smText text-right">Past. Present. Future.</p>
            </div>
          </li>
          <li>
            <ul className="collapsible collapsible-accordion">
              <CollapsableMenu
                title="Dashboards"
                icon="fa-tachometer-alt"
                items={{
                  "Version 1": "#",
                  "Version 2": "#",
                  "Version 3": "#",
                  "Version 4": "#"
                }}
              />
              <CollapsableMenu
                title="Pages"
                icon="fa-image"
                items={{
                  Login: "#",
                  Register: "#",
                  "Version 2": "#",
                  Pricing: "#",
                  "About us": "#"
                }}
              />
              <CollapsableMenu
                title="Forms"
                icon="fa-check-square"
                items={{ Basic: "#", Extended: "#" }}
              />
              <li>
                <a
                  href="../alerts/alerts.html"
                  className="collapsible-header waves-effect"
                >
                  <i className=" far fa-bell" />
                  Alerts
                </a>
              </li>
              <li>
                <a
                  href="../modals/modals.html"
                  className="collapsible-header waves-effect"
                >
                  <i className=" fa fa-bolt" />
                  Modals
                </a>
              </li>
              <li>
                <a
                  href="../charts/charts.html"
                  className="collapsible-header waves-effect"
                >
                  <i className=" fa fa-chart-pie" />
                  Charts
                </a>
              </li>
              <li>
                <a
                  href="../calendar/calendar.html"
                  className="collapsible-header waves-effect"
                >
                  <i className=" far fa-calendar-check" />
                  Calendar
                </a>
              </li>
            </ul>
          </li>
          <div
            className="ps__scrollbar-x-rail"
            style={{ left: "0px", bottom: "0px" }}
          >
            <div
              className="ps__scrollbar-x"
              tabIndex="0"
              style={{ left: "0px", width: "0px" }}
            />
          </div>
          <div
            className="ps__scrollbar-y-rail"
            style={{ top: "0px", right: "0px" }}
          >
            <div
              className="ps__scrollbar-y"
              tabIndex="0"
              style={{ top: "0px", height: "0px" }}
            />
          </div>
        </ul>
        <div className="sidenav-bg mask-strong" />
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};
const connectedSideBar = connect(mapStateToProps)(SideBar);
export { connectedSideBar as SideBar };
