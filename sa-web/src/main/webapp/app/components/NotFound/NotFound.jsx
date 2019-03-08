import React, { Component } from "react";
import { connect } from 'react-redux';
import "./NotFound.scss";

class NotFound extends Component {

    handleClick = () => {
        this.props.history.push("/");
    }

    render() {
        return (
            <div id="notFoundBody">
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="main">
                    <h1>404</h1>
                    <p>It looks like you're lost...<br />That's a trouble?</p>
                    <button type="button" onClick={this.handleClick}>Go back</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps() {
    return {};
}

const connectedNotFound = connect(mapStateToProps)(NotFound);
export { connectedNotFound as NotFound }; 