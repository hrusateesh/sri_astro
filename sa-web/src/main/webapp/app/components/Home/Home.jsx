import React from "react";
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import "./Home.scss";

class Home extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.currentUser());
    }

    render() {
        return (
            <div className="m-3">
                <h3>Welcome User</h3>
            </div>
        );
    }
}

const connectedHome = connect(() => {})(Home);
export { connectedHome as Home };