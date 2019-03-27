// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from '../types/Store';
import type { User } from '../types/Custom';

import { Login } from './user';
import { userActions } from '../_actions';

import './NavBar.scss';

type Props = {
  dispatch: Dispatch,
  user: User
};

type State = {
  scrolled: boolean,
  authentication: {
    user: User
  }
};

class NavBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      scrolled: false,
      authentication: {}
    };
  }

  handleLogoutUser = () => this.props.dispatch(userActions.logout());

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    this.setState({
      scrolled: window.scrollY > 50
    });
  };

  render() {
    const { user } = this.props;
    return (
      <nav
        className={
          'navbar fixed-top navbar-expand-lg scrolling-navbar double-nav ' +
          (this.state.scrolled ? 'top-nav-collapse' : '')
        }
      >
        <div className='float-left'>
          <a
            href='#'
            data-activates='slide-out'
            className='button-collapse black-text'
            data-toggle='collapse'
            data-target='#slide-out'
            aria-controls='slide-out'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <i className='fa fa-bars' />
          </a>
        </div>
        <NavBarLogo />
        <div className='breadcrumb-dn mr-auto'>
          <p>Dashboard v.1</p>
        </div>
        <ul className='nav navbar-nav nav-flex-icons ml-auto'>
          <li className='nav-item dropdown  dropdown-menu-right notifications-nav'>
            <a
              className='nav-link dropdown-toggle waves-effect'
              id='navbarDropdownMenuLink'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <span className='badge red'>3</span> <i className='fa fa-bell' />
              <span className='sr-only'>Notifications</span>
            </a>
            <div className='dropdown-menu dropdown-primary' aria-labelledby='navbarDropdownMenuLink'>
              <a className='dropdown-item waves-effect waves-light' href='#'>
                <i className='fa fa-money mr-2' aria-hidden='true' />
                <span>New order received</span>
                <span className='float-right'>
                  <i className='far  fa-clock' aria-hidden='true' /> 13 min
                </span>
              </a>
              <a className='dropdown-item waves-effect waves-light' href='#'>
                <i className='fa fa-money mr-2' aria-hidden='true' />
                <span>New order received</span>
                <span className='float-right'>
                  <i className='far  fa-clock' aria-hidden='true' /> 33 min
                </span>
              </a>
              <a className='dropdown-item waves-effect waves-light' href='#'>
                <i className='fa fa-line-chart mr-2' aria-hidden='true' />
                <span>Your campaign is about to end</span>
                <span className='float-right'>
                  <i className='far  fa-clock' aria-hidden='true' /> 53 min
                </span>
              </a>
            </div>
          </li>
          <li className='nav-item'>
            <a href='/contact' data-toggle='modal' data-target='#contactForm' className='nav-link waves-effect'>
              <i id='navbar-static-contact' alt='Contact us' className='fas fa-envelope' />
              <span className='sr-only'>Contact us</span>
            </a>
          </li>
          {user && (
            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle waves-effect'
                href='#'
                id='userDropdown'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                <i className='fa fa-user' /> <span className='clearfix d-none d-sm-inline-block'>{user.firstName}</span>
              </a>

              <div className='dropdown-menu dropdown-menu-right' aria-labelledby='userDropdown'>
                <a className='dropdown-item waves-effect waves-light' href='#' onClick={this.handleLogoutUser}>
                  Log Out
                </a>
                <a className='dropdown-item waves-effect waves-light' href='#'>
                  My account
                </a>
              </div>
            </li>
          )}
          {!user && (
            <li className='nav-item dropdown'>
              <Login />
            </li>
          )}
        </ul>
      </nav>
    );
  }
}

const NavBarLogo = () => (
  <div className='logo-sn text-center'>
    <a href='/' className='sa-logo'>
      <span className='sri'>Sri</span>
      <span className='smText'>&#9672;</span>Astrology
    </a>
    <p className='smText text-right'>Past. Present. Future.</p>
  </div>
);

const mapStateToProps = (state: State) => {
  const { authentication } = state;
  const { user } = authentication;
  return {
    user
  };
};

const connectedNavBar = connect(mapStateToProps)(NavBar);
export { connectedNavBar as NavBar };
