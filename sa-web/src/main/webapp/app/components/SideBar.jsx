// @flow
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import type {Dispatch} from '../types/Store';
import {userActions} from '../_actions';

import './SideBar.scss';

type Props = {
  dispatch: Dispatch,
  children: Component
};

class SideBar extends React.Component<Props> {
  handleLogoutUser = () => this.props.dispatch(userActions.logout());

  componentDidMount() {
    new PerfectScrollbar('#slide-out');
  }

  render() {
    return (
      <div id='slide-out' className='side-nav sn-bg-4 fixed'>
        <ul>
          <li>
            <SideBarLogo />
          </li>
          <li>
            <ul className='collapsible collapsible-accordion'>{this.props.children}</ul>
          </li>
        </ul>
      </div>
    );
  }
}

const SideBarLogo = () => (
  <div className='logo-sn text-center'>
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
    <a href='/' className='sa-logo'>
      <span className='sri'>Sri</span>
      <span className='smText'>&#9672;</span>Astrology
    </a>
    <p className='smText text-right'>Past. Present. Future.</p>
  </div>
);

type MenuProps = {
  children: any,
  icon: string,
  desc: string
};
class SidebarMenu extends React.Component<MenuProps, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  handleClick = () => {
    this.setState({
      checked: !this.state.checked
    });
  };

  render() {
    return (
      <li>
        <a className='collapsible-header waves-effect arrow-r' onClick={this.handleClick}>
          <i className={this.props.icon} />
          {this.props.desc}
          <i className='fa fa-angle-down rotate-icon' />
        </a>
        <div className='collapsible-body' style={{display: this.state.checked ? 'block' : 'none'}}>
          <ul>
            {React.Children.map(this.props.children, (child: any) => React.cloneElement(child, {subMenuItem: true}))}
          </ul>
        </div>
      </li>
    );
  }
}

type ItemProps = {
  link: string,
  icon: string,
  desc: string,
  subMenuItem: boolean
};
const SidebarItem = (props: ItemProps) => (
  <li>
    <Link to={props.link} className={'waves-effect' + (props.subMenuItem ? '' : ' collapsible-header')}>
      {props.icon ? <i className={props.icon} /> : <i className='fas fa-info-circle' />}
      {props.desc}
    </Link>
  </li>
);

const mapStateToProps = () => {
  return {};
};
const connectedSideBar = connect(mapStateToProps)(SideBar);
export {connectedSideBar as SideBar, SidebarMenu, SidebarItem};
