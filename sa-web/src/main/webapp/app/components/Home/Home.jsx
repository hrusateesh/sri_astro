import React from "react";
import { connect } from "react-redux";
import type { Dispatch } from "../../types/Store";
import { userActions } from "../../_actions";
import "./Home.scss";

type Props = {
  dispatch: Dispatch
};

class Home extends React.Component<Props> {
  componentDidMount() {
    this.props.dispatch(userActions.currentUser());
  }

  render() {
    return (
      <div className="m-3">
        <div className="container-fluid">
          <section className="mt-lg-5">
            <div className="row">
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card card-cascade cascading-admin-card">
                  <div className="admin-up">
                    <i className="far fa-money-bill-alt primary-color" />
                    <div className="data">
                      <p>SALES</p>
                      <h4 className="font-weight-bold dark-grey-text">2000$</h4>
                    </div>
                  </div>
                  <div className="card-body card-body-cascade">
                    <div className="progress mb-3">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "25%" }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                    <p className="card-text">Better than last week (25%)</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card card-cascade cascading-admin-card">
                  <div className="admin-up">
                    <i className="fas fa-chart-line warning-color" />
                    <div className="data">
                      <p>SUBSCRIPTIONS</p>
                      <h4 className="font-weight-bold dark-grey-text">200</h4>
                    </div>
                  </div>
                  <div className="card-body card-body-cascade">
                    <div className="progress mb-3">
                      <div
                        className="progress-bar red accent-2"
                        role="progressbar"
                        style={{ width: "25%" }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                    <p className="card-text">Worse than last week (25%)</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card card-cascade cascading-admin-card">
                  <div className="admin-up">
                    <i className="fas fa-chart-pie light-blue lighten-1" />
                    <div className="data">
                      <p>TRAFFIC</p>
                      <h4 className="font-weight-bold dark-grey-text">20000</h4>
                    </div>
                  </div>
                  <div className="card-body card-body-cascade">
                    <div className="progress mb-3">
                      <div
                        className="progress-bar red accent-2"
                        role="progressbar"
                        style={{ width: "75%" }}
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                    <p className="card-text">Worse than last week (75%)</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card card-cascade cascading-admin-card">
                  <div className="admin-up">
                    <i className="fas fa-chart-bar red accent-2" />
                    <div className="data">
                      <p>ORGANIC TRAFFIC</p>
                      <h4 className="font-weight-bold dark-grey-text">2000</h4>
                    </div>
                  </div>
                  <div className="card-body card-body-cascade">
                    <div className="progress mb-3">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "75%" }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                    <p className="card-text">Better than last week (25%)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

const connectedHome = connect(mapStateToProps)(Home);
export { connectedHome as Home };
