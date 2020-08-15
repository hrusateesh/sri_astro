// @flow
import { userActions } from "Actions";
import $ from "jquery";
import React from "react";
import { connect } from "react-redux";
import type { Dispatch, User } from "../../../types";
import "./Login.scss";

type Props = {
  dispatch: Dispatch,
  user: User,
  loggingIn: boolean,
  error: string,
  popup: boolean,
};

type State = {
  username: string,
  password: string,
  remember_me: boolean,
  submitted: boolean,
  keepLogIn: boolean,
  forgetPass: boolean,
  submitBtnTxt: string,
  loggingIn: boolean,
};

const initialState = {
  username: "",
  password: "",
  remember_me: false,
  submitted: false,
  keepLogIn: false,
  forgetPass: false,
  submitBtnTxt: "Login",
  loggingIn: false,
};

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  baseState = this.state;

  componentDidMount() {
    const self = this;
    $("#loginLink").click(function () {
      var dropdown = $(this).next();
      if (!dropdown.hasClass("show")) {
        self.setState(initialState);
        $("#login").removeClass("was-validated");
      }
    });
  }

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({ [target.name]: value });
  };

  handleSubmit = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password, remember_me, forgetPass } = this.state;
    const { dispatch } = this.props;
    let form = e.currentTarget;
    form.checkValidity();
    form.classList.add("was-validated");
    if (!forgetPass) {
      if (username && password) {
        dispatch(userActions.login(username, password, remember_me));
        this.setState(initialState);
        form.classList.remove("was-validated");
      }
    } else {
      if (username) {
        dispatch(userActions.forgetPass(username));
        $("#loginLink").click();
      }
    }
  };

  forgetPassword = () => {
    this.setState({
      forgetPass: true,
      submitBtnTxt: "Continue",
    });
  };

  render() {
    const { loggingIn, error, popup } = this.props;
    const { username, password, remember_me, submitBtnTxt, submitted, forgetPass } = this.state;
    return (
      <div id="login-dp" className={popup ? "container" : "container col-xl-4 col-lg-6 col-md-7 col-sm-9 col-10 py-2"}>
        <div>
          Login via
          <SocialLogin />
          <div className="text-center">or</div>
          <form
            className="form needs-validation md-form my-0"
            id="login"
            noValidate
            role="form"
            onSubmit={this.handleSubmit}
          >
            <div className={"md-form form-sm" + (submitted && !username ? " has-error" : "")}>
              <i className="fas fa-user prefix" />
              <input
                type="email"
                className="form-control"
                name="username"
                id="username"
                value={username}
                onChange={this.handleChange}
                placeholder="Email address"
                required
              />
              <label className="sr-only" htmlFor="username">
                Email address
              </label>
              {submitted && !username && <div className="invalid-feedback">Email is required</div>}
            </div>
            {!forgetPass && (
              <>
                <div className={"md-form form-sm" + (submitted && !password ? " has-error" : "")}>
                  <i className="fas fa-lock prefix" />
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    value={password}
                    onChange={this.handleChange}
                    placeholder="Password"
                    required
                  />
                  <label className="sr-only" htmlFor="password">
                    Password
                  </label>
                  {submitted && !password && <div className="invalid-feedback">Password is required</div>}
                  {error && <div className="invalid-feedback d-block font-weight-bold text-center">{error}</div>}
                </div>
                <div>
                  <span className="form-check d-inline">
                    <input
                      type="checkbox"
                      id="remember_me"
                      name="remember_me"
                      className=" form-check-input"
                      value={remember_me}
                      onChange={this.handleChange}
                    />
                    <label className="position-static form-check-label" htmlFor="remember_me">
                      {" "}
                      Remember me
                    </label>
                  </span>
                  <a href="#" onClick={this.forgetPassword} className={popup ? "float-right mt-n2" : "float-right"}>
                    Forget the password?
                  </a>
                </div>
              </>
            )}
            <div className="form-group my-3">
              <button className="btn btn-primary btn-block">
                <span>{submitBtnTxt}</span>
                {loggingIn && <i className="fas fa-sync-alt fa-spin ml-2" />}
              </button>
            </div>
          </form>
        </div>
        <div className="bottom text-center">
          New here?{" "}
          <a href="/signup" className="btn btn-primary p-2">
            <b>Join Us</b>
          </a>
        </div>
      </div>
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

type StoreState = {
  authentication: {
    loggingIn: boolean,
    error: string,
  },
};

const mapStateToProps = (state: StoreState) => {
  const { loggingIn, error } = state.authentication;
  return {
    loggingIn,
    error,
  };
};

export default connect(mapStateToProps)(Login);
