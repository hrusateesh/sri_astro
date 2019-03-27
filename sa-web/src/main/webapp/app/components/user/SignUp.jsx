// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import type { Dispatch } from '../../types/Store';
import type { User } from '../../types/Custom';

import { PasswordStrengthMeter } from './PasswordStrengthMeter';
import { userActions } from '../../_actions';

type Props = {
  dispatch: Dispatch,
  user: User,
  registering: boolean
};

type State = {
  user: User,
  confPass: string,
  submitted: boolean,
  registering: User,
  learnMore: boolean,
  passStrength: number
};

class SignUp extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      user: {
        id: 0,
        firstName: '',
        lastName: '',
        displayName: '',
        username: '',
        email: '',
        password: '',
        emailOptIn: false
      },
      registering: {},
      confPass: '',
      submitted: false,
      learnMore: false,
      passStrength: 0
    };
  }

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;
    const { user } = this.state;
    if (name == 'confPass') {
      this.setState({
        confPass: e.target.value
      });
    } else {
      this.setState({
        user: {
          ...user,
          [name]: value
        }
      });
    }
    if (name == 'password' || name == 'confPass') {
      // $FlowFixMe: suppressing this error until we can refactor
      const e1: HTMLInputElement = document.getElementById('password');
      // $FlowFixMe: suppressing this error until we can refactor
      const e2: HTMLInputElement = document.getElementById('confPass');
      if (e1.value != e2.value) {
        e2.setCustomValidity('Password not match');
      } else {
        e2.setCustomValidity('');
      }
    }
  };

  handleLearnMore = () => {
    this.setState({
      learnMore: !this.state.learnMore
    });
  };

  handlePassStrength = (strength: number) => {
    // $FlowFixMe: suppressing this error until we can refactor
    const e: HTMLInputElement = document.getElementById('password');
    if (!e) return;
    if (strength < 2) {
      e.setCustomValidity('Passwords is too week');
    } else {
      e.setCustomValidity('');
    }
    this.setState({
      passStrength: strength
    });
  };

  handleSubmit = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault();

    this.setState({ submitted: true });
    const { user, confPass } = this.state;
    const { dispatch } = this.props;
    let form = e.currentTarget;
    var isValidForm = form.checkValidity();
    form.classList.add('was-validated');

    if (user.password != confPass) {
      // $FlowFixMe: suppressing this error until we can refactor
      document.getElementById('confPass').setCustomValidity('Password not match');
      isValidForm = false;
    }
    if (isValidForm) {
      dispatch(userActions.register(user));
    }
  };

  render() {
    const { registering } = this.props;
    const { user, confPass, submitted, learnMore } = this.state;
    return (
      <div className='col-md-7 col-lg-6 col-xl-5 mx-auto'>
        <h4 className='pb-3'>Create your account. It’s free and only takes a minute.</h4>
        <form className='form' name='form' onSubmit={this.handleSubmit} noValidate>
          <div className='form-row form-group'>
            <div className={'col' + (submitted && !user.firstName ? ' has-error' : '')}>
              <input
                type='text'
                className='form-control'
                placeholder='First name'
                name='firstName'
                required
                value={user.firstName}
                onChange={this.handleChange}
              />
              {submitted && !user.firstName && <div className='invalid-feedback'>First Name is required</div>}
            </div>
            <div className={'col' + (submitted && !user.lastName ? ' has-error' : '')}>
              <input
                type='text'
                className='form-control'
                placeholder='Last name'
                name='lastName'
                required
                value={user.lastName}
                onChange={this.handleChange}
              />
              {submitted && !user.lastName && <div className='invalid-feedback'>Last Name is required</div>}
            </div>
          </div>
          <div className='form-row form-group'>
            <div className={'col' + (submitted && !user.displayName ? ' has-error' : '')}>
              <input
                type='text'
                className='form-control'
                placeholder='Display Name'
                name='displayName'
                required
                value={user.displayName}
                onChange={this.handleChange}
              />
              {submitted && !user.displayName && <div className='invalid-feedback'>DisplayName is required</div>}
            </div>
          </div>
          <div className='form-row form-group'>
            <div className={'col' + (submitted && !user.email ? ' has-error' : '')}>
              <input
                type='email'
                className='form-control'
                placeholder='Email'
                name='email'
                required
                value={user.email}
                onChange={this.handleChange}
              />
              <small id='emailHelp' className='form-text text-muted'>
                We&apos;ll never share your email with anyone else.
              </small>
              {submitted && !user.email && <div className='invalid-feedback'>Username is required</div>}
            </div>
          </div>
          <div className='form-row form-group'>
            <div className={'col-6' + (submitted && !user.password ? ' has-error' : '')}>
              <input
                type='password'
                className='form-control'
                placeholder='Password'
                id='password'
                name='password'
                required
                value={user.password}
                onChange={this.handleChange}
              />
              <PasswordStrengthMeter password={user.password} onAccess={this.handlePassStrength} />
              {submitted && !user.password && <div className='invalid-feedback'>Password is required</div>}
            </div>
            <div className={'col-6' + (submitted && !confPass ? ' has-error' : '')}>
              <input
                type='password'
                className='form-control'
                placeholder='Confirm Password'
                id='confPass'
                name='confPass'
                required
                value={confPass}
                onChange={this.handleChange}
              />
              {submitted && (!confPass || confPass != user.password) && (
                <div className='invalid-feedback'>Password not match</div>
              )}
            </div>
          </div>
          <div className='row'>
            <div className='col-1 pr-1' style={{ maxWidth: 'min-content' }}>
              <input
                type='checkbox'
                name='emailOptIn'
                id='opt-in'
                value={user.emailOptIn}
                onChange={this.handleChange}
              />
            </div>
            <div className='col-11 pl-0'>
              <label htmlFor='opt-in' className=''>
                <small>
                  Send me occasional Sri Astrology news, product updates and more. If you opt out, you will still
                  receive notifications and emails triggered by your account activity.{' '}
                  <a href='#' onClick={this.handleLearnMore}>
                    Learn more
                  </a>
                </small>
              </label>
            </div>
          </div>
          {learnMore && (
            <div className='js-learn-more-opt-in-msg fs-caption mt16'>
              <small>
                <div className='font-weight-bold'>We know you hate spam. We do too.</div>
                <p className='mb-0'>That&apos;s why we make it easy to:</p>
                <ol>
                  <li>Choose what types of emails you receive.</li>
                  <li>Unsubscribe if you don&apos;t like our emails.</li>
                </ol>
                <p className='mb-0'>
                  We never, ever share your email address with third parties for marketing purposes.
                </p>
                <p>
                  And we try to be thoughtful about what we send you, based on your interests.{' '}
                  <a href='#' onClick={this.handleLearnMore}>
                    OK, got it
                  </a>
                </p>
              </small>
            </div>
          )}
          <div className='form-group'>
            <button className='btn btn-primary'>Sign up</button>
            {registering && <i className='fas fa-sync-alt fa-spin ml-2' />}
            <Link to='/' className='btn btn-dark'>
              Cancel
            </Link>
          </div>
        </form>
        <div aria-label='notice-message'>
          <small>
            <p className='mb-0'>
              By clicking &#34;Sign up&#34;, you agree to our{' '}
              <a target='_blank' rel='noopener noreferrer' href='/legal/cookie-policy'>
                Cookie Policy
              </a>
              ,{' '}
              <a target='_blank' rel='noopener noreferrer' href='/legal/privacy-policy'>
                Privacy Policy
              </a>
              , and our{' '}
              <a target='_blank' rel='noopener noreferrer' href='/legal/terms-of-service'>
                Terms of Service
              </a>
            </p>
          </small>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  const { registering } = state;
  return {
    registering
  };
};

const connectedSignUp = connect(mapStateToProps)(SignUp);
export { connectedSignUp as SignUp };
