// @flow
import React from "react";
import { connect } from "react-redux";
import type { Dispatch } from "../types/Store";
import type { User } from "../types/Custom";

import { userActions } from "../_actions";
import "./Login.scss";

import $ from "jquery";

type Props = {
  dispatch: Dispatch,
  user: User,
  loggingIn: boolean
};

type State = {
  username: string,
  password: string,
  remember_me: boolean,
  submitted: boolean,
  keepLogIn: boolean,
  forgetPass: boolean,
  submitBtnTxt: string,
  loggingIn: boolean
};

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      remember_me: false,
      submitted: false,
      keepLogIn: false,
      forgetPass: false,
      submitBtnTxt: "Login",
      loggingIn: false
    };
    // this.baseState = this.state;
  }

  baseState = this.state;

  componentDidMount() {
    const self = this;
    $("#loginLink").click(function() {
      if (
        !$(this)
          .next()
          .hasClass("show")
      ) {
        self.setState(self.baseState);
      }
    });
  }
  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({ [target.name]: value });
  };

  handleSubmit = () => {
    // e.preventDefault();
    this.setState({ submitted: true });
    const { username, password, remember_me, forgetPass } = this.state;
    const { dispatch } = this.props;
    if (!forgetPass) {
      if (username && password) {
        dispatch(userActions.login(username, password, remember_me));
      }
    } else if (username) {
      // dispatch(userActions.forgetPass(username));
    }
  };

  forgetPassword = () => {
    this.setState({
      forgetPass: true,
      submitBtnTxt: "Continue"
    });
    // this.setState(prevState => ({
    //     forgetPass: !prevState.forgetPass,
    //     forgetMsg: !prevState.forgetPass?'Forget the password?':'Login'
    // }));
    // toastr.success('Forgot username/password', 'Provide email we will send you detail to reset');
  };

  render() {
    const { loggingIn } = this.props;
    const {
      username,
      password,
      remember_me,
      submitBtnTxt,
      submitted,
      forgetPass
    } = this.state;
    return (
      <React.Fragment>
        <a
          href="#"
          className="btn btn-info btn-rounded btn-sm waves-effect waves-light"
          id="loginLink"
          data-toggle="dropdown"
        >
          <b>Login</b>
          <i className="fas fa-sign-in-alt ml-2" />
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <div id="login-dp" className="container">
            <div>
              Login via
              <SocialLogin />
              <p className="text-center">or</p>
              <form className="form" role="form" onSubmit={this.handleSubmit}>
                <div
                  className={
                    "form-group" + (submitted && !username ? " has-error" : "")
                  }
                >
                  <label className="sr-only" htmlFor="username">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="username"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                    placeholder="Email address"
                    required
                  />
                  {submitted && !username && (
                    <div className="help-block">Username is required</div>
                  )}
                </div>
                {!forgetPass && (
                  <React.Fragment>
                    <div
                      className={
                        "form-group" +
                        (submitted && !password ? " has-error" : "")
                      }
                    >
                      <label className="sr-only" htmlFor="password">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        placeholder="Password"
                        required
                      />
                      {submitted && !password && (
                        <div className="help-block">Password is required</div>
                      )}
                    </div>
                    <div className="help-block text-right">
                      <a href="#" onClick={this.forgetPassword}>
                        Forget the password?
                      </a>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          name="remember_me"
                          value={remember_me}
                          onChange={this.handleChange}
                        />{" "}
                        keep me logged-in
                      </label>
                    </div>
                  </React.Fragment>
                )}
                <div className="form-group my-2">
                  <button className="btn btn-primary btn-block">
                    <span>{submitBtnTxt}</span>
                    {loggingIn && (
                      <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    )}
                  </button>
                </div>
              </form>
            </div>
            <div className="bottom text-center">
              New here?{" "}
              <a href="/register" className="btn btn-primary p-2">
                <b>Join Us</b>
              </a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const SocialLogin = () => {
  return (
    <div className="social-buttons d-flex justify-content-between">
      <a href="#" className="btn btn-danger">
        <i className="fab fa-google-plus" /> Google
      </a>
      <a href="#" className="btn btn-fb">
        <i className="fab fa-facebook" /> Facebook
      </a>
      <a href="#" className="btn btn-tw">
        <i className="fab fa-twitter" /> Twitter
      </a>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  const { loggingIn } = state;
  return {
    loggingIn
  };
};

const connectedLogin = connect(mapStateToProps)(Login);
export { connectedLogin as Login };
