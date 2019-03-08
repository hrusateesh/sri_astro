import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                confPass: ''
            },
            submitted: false
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="col-4 offset-md-4">
                <h2>Register</h2>
                <form className="form" name="form" onSubmit={this.handleSubmit}>
                    <div className="form-row form-group">
                        <div className={'col' + (submitted && !user.firstName ? ' has-error' : '')}>
                            <input type="text" className="form-control" placeholder="First name" name="firstName" value={user.firstName} onChange={this.handleChange} />
                            {submitted && !user.firstName && <div className="help-block">First Name is required</div>}
                        </div>
                        <div className={'col' + (submitted && !user.lastName ? ' has-error' : '')}>
                            <input type="text" className="form-control" placeholder="Last name" name="lastName" value={user.lastName} onChange={this.handleChange} />
                            {submitted && !user.lastName && <div className="help-block">Last Name is required</div>}
                        </div>
                    </div>
                    <div className="form-row form-group">
                        <div className={'col' + (submitted && !user.username ? ' has-error' : '')}>
                            <input type="email" className="form-control" placeholder="Email" name="username" value={user.username} onChange={this.handleChange} />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            {submitted && !user.username && <div className="help-block">Username is required</div>}
                        </div>
                    </div>
                    <div className="form-row form-group">
                        <div className={'col' + (submitted && !user.password ? ' has-error' : '')}>
                            <input type="password" className="form-control" placeholder="Password" name="password" value={user.password} onChange={this.handleChange} />
                            {submitted && !user.password && <div className="help-block">Password is required</div>}
                        </div>
                        <div className={'col' + (submitted && !user.confPass ? ' has-error' : '')}>
                            <input type="password" className="form-control" placeholder="Confirm Password" name="confPass" value={user.confPass} onChange={this.handleChange} />
                            {submitted && (!user.confPass || user.confPass != user.password) && <div className="help-block">Password not match</div>}
                        </div>
                    </div>
                    <div className="form-row form-group">
                        <div className="col-7">
                            <input type="text" className="form-control" placeholder="City" />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="State" />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Zip" />
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        {registering &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegister = connect(mapStateToProps)(Register);
export { connectedRegister as Register };