import React from "react";
import { connect } from "react-redux";

import { currentUser } from "Actions";

// import type { Dispatch } from '../../types';

import "./Home.scss";

type Props = {
  currentUser: Function
};

class Home extends React.Component<Props> {
  componentDidMount() {
    this.props.currentUser();
  }

  render() {
    return (
      <div className="container-fluid">
        <section className="mt-lg-5">
          <div className="row">
            <div className="col-xl-3 col-md-6 mb-4">
              <Card
                title="Courage"
                icon="fas fa-fist-raised light-blue lighten-1"
                value="2134"
                progress={85}
                desc="Better than last week"
              />
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <Card
                title="Children"
                icon="fas fa-child light-blue lighten-1"
                value="2134"
                progress={85}
                desc="Better than last week"
              />
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <Card
                title="Health"
                icon="fas fa-heartbeat light-blue lighten-1"
                value="2134"
                progress={85}
                desc="Better than last week"
              />
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <Card
                title="Spouse"
                icon="fas fa-venus-mars light-blue lighten-1"
                value="2134"
                progress={85}
                desc="Better than last week"
              />
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <Card
                title="Destiny"
                icon="fas fa-user-tie light-blue lighten-1"
                value="2134"
                progress={85}
                desc="Better than last week"
              />
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <Card
                title="Profession"
                icon="fas fa-user-tie light-blue lighten-1"
                value="2134"
                progress={85}
                desc="Better than last week"
              />
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <Card
                title="Income"
                icon="far fa-money-bill-alt light-blue lighten-1"
                value="2134"
                progress={85}
                desc="Better than last week"
              />
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <Card
                title="Mental Peace"
                icon="fas fa-peace light-blue lighten-1"
                value="2134"
                progress={85}
                desc="Better than last week"
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

type CardProps = {
  title: string,
  icon: string,
  progress?: number,
  value: string,
  desc: string
};

const Card = (props: CardProps) => {
  const absProgress = props.progress ? Math.abs(props.progress) : 0;
  return (
    <div className="card card-cascade cascading-admin-card">
      <div className="admin-up">
        <i className={props.icon} />
        <div className="data">
          <p>{props.title}</p>
          <h4 className="font-weight-bold dark-grey-text">{props.value}</h4>
        </div>
      </div>
      <div className="card-body card-body-cascade">
        {props.progress && (
          <div className="progress mb-3">
            <div
              className={"progress-bar " + (props.progress > 0 ? "bg-primary" : "red accent-2")}
              role="progressbar"
              style={{ width: absProgress + "%" }}
              aria-valuenow={absProgress}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        )}
        <p className="card-text">
          {props.desc}
          {props.progress && " (" + absProgress + "%)"}
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  currentUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
