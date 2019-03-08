import React, {Component} from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';

import "./Login.scss";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember_me: false,
            submitted: false,
            keepLogIn: false
        };
    }

    handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, remember_me } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password, remember_me));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, remember_me, submitted } = this.state;
        return (
            <div id="login-dp">
                <div className="col-md-12">
                    Login via
                    <div className="social-buttons">
                        <a href="#" className="btn btn-fb"><i className="fa fa-facebook"></i> Facebook</a>&nbsp;
                        <a href="#" className="btn btn-tw"><i className="fa fa-twitter"></i> Twitter</a>
                    </div>
                    or
                    <form className="form" role="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                            <label className="sr-only" htmlFor="username">Email address</label>
                            <input type="email" className="form-control" id="username" name="username" value={username} onChange={this.handleChange} placeholder="Email address" required />
                            {submitted && !username && <div className="help-block">Username is required</div> }
                        </div>
                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <label className="sr-only" htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={password} onChange={this.handleChange} placeholder="Password" required />
                            {submitted && !password && <div className="help-block">Password is required</div> }
                            <div className="help-block text-right"><a href="">Forget the password ?</a></div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-block">
                                Sign in {loggingIn &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }                            
                            </button>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" name="remember_me" value={remember_me} onChange={this.handleChange} /> keep me logged-in
                        </label>
                        </div>
                    </form>
                </div>
                <div className="bottom text-center">
                    New here ? <a href="/register"><b>Join Us</b></a>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLogin = connect(mapStateToProps)(Login);
export { connectedLogin as Login }; 