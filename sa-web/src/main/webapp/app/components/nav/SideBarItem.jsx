// @flow
import * as React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

type ItemProps = {
  link: string,
  icon: string,
  desc: string,
  subMenuItem?: boolean,
  handleClick?: () => void,
};

class SidebarItem extends React.Component<ItemProps> {
  constructor(props: ItemProps) {
    super(props);
  }

  render() {
    const { link, subMenuItem, icon, desc } = this.props;
    return (
      <li>
        <NavLink
          exact
          activeClassName="active"
          to={link}
          className={"waves-effect" + (subMenuItem ? "" : " collapsible-header")}
          onClick={this.props.handleClick}
        >
          {icon ? <i className={icon} /> : <i className="fas fa-info-circle" />}
          {desc}
        </NavLink>
      </li>
    );
  }
}

export default connect()(SidebarItem);
