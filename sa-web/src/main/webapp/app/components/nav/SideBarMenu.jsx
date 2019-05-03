// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

type MenuProps = {
  children?: any,
  icon?: string,
  desc: string,
  location: any
};

type MenuState = {
  opened: boolean
};

class SidebarMenu extends React.Component<MenuProps, MenuState> {
  constructor(props: MenuProps) {
    super(props);
    this.state = {
      opened: false
    };
  }

  handleOpen = () => {
    this.setState({
      opened: !this.state.opened
    });
  };

  handleChildClick = () => {
    var selected: any =
      this.props.children &&
      this.props.children.find((child: any) => child.props.link === this.props.location.pathname);
    this.setState({
      opened: selected != null
    });
  };

  render() {
    var selected: any =
      this.props.children &&
      this.props.children.find((child: any) => child.props.link === this.props.location.pathname);
    return (
      <li>
        <a
          className={'collapsible-header waves-effect arrow-r ' + (selected ? 'has-subactive' : '')}
          onClick={this.handleOpen}
        >
          <i className={this.props.icon} />
          {this.props.desc}
          <i className='fa fa-angle-down rotate-icon' />
        </a>
        <div className='collapsible-body' style={{ display: this.state.opened || selected ? 'block' : 'none' }}>
          <ul>
            {React.Children.map(this.props.children, (child: any) =>
              React.cloneElement(child, { subMenuItem: true, handleClick: this.handleChildClick })
            )}
          </ul>
        </div>
      </li>
    );
  }
}

export default connect()(withRouter(SidebarMenu));
