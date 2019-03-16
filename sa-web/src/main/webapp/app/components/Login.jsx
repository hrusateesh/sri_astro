// @flow
import React from 'react';
import {connect} from 'react-redux';
import type {Dispatch} from '../types/Store';
import type {User} from '../types/Custom';

import {userActions} from '../_actions';
import './Login.scss';

import $ from 'jquery';

type Props = {
  dispatch: Dispatch,
  user: User,
  loggingIn: boolean,
  error: string
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

const initialState = {
  username: '',
  password: '',
  remember_me: false,
  submitted: false,
  keepLogIn: false,
  forgetPass: false,
  submitBtnTxt: 'Login',
  loggingIn: false
};

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
    // this.baseState = this.state;
  }

  baseState = this.state;

  componentDidMount() {
    const self = this;
    $('#loginLink').click(function() {
      if (
        !$(this)
          .next()
          .hasClass('show')
      ) {
        self.setState(initialState);
      }
    });
  }
  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({[target.name]: value});
  };

  handleSubmit = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({submitted: true});
    const {username, password, remember_me, forgetPass} = this.state;
    const {dispatch} = this.props;
    if (!forgetPass) {
      let form = e.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
      if (username && password) {
        dispatch(userActions.login(username, password, remember_me));
        this.setState(initialState);
        form.classList.remove('was-validated');
      }
    } else if (username) {
      // dispatch(userActions.forgetPass(username));
    }
  };

  forgetPassword = () => {
    this.setState({
      forgetPass: true,
      submitBtnTxt: 'Continue'
    });
    // this.setState(prevState => ({
    //     forgetPass: !prevState.forgetPass,
    //     forgetMsg: !prevState.forgetPass?'Forget the password?':'Login'
    // }));
    // toastr.success('Forgot username/password', 'Provide email we will send you detail to reset');
  };

  render() {
    const {loggingIn, error} = this.props;
    const {username, password, remember_me, submitBtnTxt, submitted, forgetPass} = this.state;
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
              <form className="form needs-validation" noValidate role="form" onSubmit={this.handleSubmit}>
                <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                  <label className="sr-only" htmlFor="username">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                    placeholder="Email address"
                    required
                  />
                  {submitted && !username && <div className="invalid-feedback">Username is required</div>}
                </div>
                {!forgetPass && (
                  <React.Fragment>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                      <label className="sr-only" htmlFor="password">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        placeholder="Password"
                        required
                      />
                      {submitted && !password && <div className="invalid-feedback">Password is required</div>}
                      {error && <div className="invalid-feedback d-block font-weight-bold text-center">{error}</div>}
                    </div>
                    <div className="help-block text-right">
                      <a href="#" onClick={this.forgetPassword}>
                        Forget the password?
                      </a>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" name="remember_me" value={remember_me} onChange={this.handleChange} />{' '}
                        keep me logged-in
                      </label>
                    </div>
                  </React.Fragment>
                )}
                <div className="form-group my-2">
                  <button className="btn btn-primary btn-block">
                    <span>{submitBtnTxt}</span>
                    {loggingIn && <i className="fas fa-sync-alt fa-spin ml-2" />}
                  </button>
                </div>
              </form>
            </div>
            <div className="bottom text-center">
              New here?{' '}
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
  const {loggingIn, error} = state.authentication;
  return {
    loggingIn,
    error
  };
};

const connectedLogin = connect(mapStateToProps)(Login);
export {connectedLogin as Login};
