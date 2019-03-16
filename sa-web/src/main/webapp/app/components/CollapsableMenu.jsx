// @flow
import React from "react";
import { connect } from "react-redux";

type Props = {
  items: any,
  icon: string,
  title: string
};

type State = {
  checked: boolean
};

class CollapsableMenu extends React.Component<Props, State> {
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
    const linkList = Object.keys(this.props.items).map((item: string) => {
      return (
        <a key={item} href={this.props.items[item]} className="waves-effect">
          {item}
        </a>
      );
    });
    return (
      <li>
        <a
          className="collapsible-header waves-effect arrow-r"
          onClick={this.handleClick}
        >
          <i className={"fa " + this.props.icon} />
          {this.props.title}
          <i className="fa fa-angle-down rotate-icon" />
        </a>
        <div
          className="collapsible-body"
          style={{ display: this.state.checked ? "block" : "none" }}
        >
          <ul>{linkList}</ul>
        </div>
      </li>
    );
  }
}

const mapStateToProps = () => {
  return {};
};
const connectedCollapsableMenu = connect(mapStateToProps)(CollapsableMenu);
export { connectedCollapsableMenu as CollapsableMenu };
