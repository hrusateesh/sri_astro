import * as React from "react";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";

type Props = {
  cookies: any
};
type State = {
  accepted: boolean
};

class ConsentBanner extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { cookies } = props;
    this.state = {
      accepted: cookies.get("se-consent") || false
    };
  }

  handleClose = () => {
    this.props.cookies.set("se-consent", true, { path: "/" });
    this.setState({
      accepted: true
    });
  };

  render() {
    const { accepted } = this.state;
    return accepted ? null : (
      <div className="fixed-bottom consent-banner" role="banner" aria-hidden="false">
        <div className="text-center bg-dark text-white" role="alertdialog" aria-describedby="notice-message">
          <div className="p-3" aria-label="notice-message">
            <p className="mb-0">
              By using our site, you acknowledge that you have read and understand our{" "}
              <a className="text-white" target="_blank" rel="noopener noreferrer" href="/legal/cookie-policy">
                Cookie Policy
              </a>
              ,{" "}
              <a className="text-white" target="_blank" rel="noopener noreferrer" href="/legal/privacy-policy">
                Privacy Policy
              </a>
              , and our{" "}
              <a className="text-white" target="_blank" rel="noopener noreferrer" href="/legal/terms-of-service">
                Terms of Service
              </a>
              .
              <a className="pl-2" aria-label="notice-dismiss" onClick={this.handleClose}>
                <svg aria-hidden="true" className="iconClear" fill="#fff" width="18" height="18" viewBox="0 0 18 18">
                  <path d="M15 4.41L13.59 3 9 7.59 4.41 3 3 4.41 7.59 9 3 13.59 4.41 15 9 10.41 13.59 15 15 13.59 10.41 9z" />
                </svg>
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(withCookies(ConsentBanner));
