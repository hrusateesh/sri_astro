// @flow
import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

type Props = {
  buttonLabel: string,
  className: string
};

type State = {
  modal: boolean
};

class ContactUs extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState((prevState: State) => ({
      modal: !prevState.modal
    }));
  };

  render() {
    return (
      <>
        <a href="#" onClick={this.toggle} className={this.props.className}>
          <i id="navbar-static-contact" alt="Contact us" className="fas fa-envelope" />
          <span className="sr-only">{this.props.buttonLabel}</span>
        </a>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <div className="modal-body mb-0">
              <div className="md-form">
                <i className="fa fa-user prefix" />
                <input type="text" className="form-control" value="" />
                <label className="" data-error="" data-success="">
                  Your name
                </label>
              </div>
              <div className="md-form">
                <i className="fa fa-envelope prefix" />
                <input type="text" className="form-control" value="" />
                <label className="" data-error="" data-success="">
                  Your email
                </label>
              </div>
              <div className="md-form">
                <i className="fa fa-tag prefix" />
                <input type="text" className="form-control" value="" />
                <label className="" data-error="" data-success="">
                  subject
                </label>
              </div>
              <div className="md-form">
                <i className="fa fa-pencil-alt prefix" />
                <textarea className="md-textarea form-control" />
                <label className="" data-error="" data-success="">
                  Your message
                </label>
              </div>
              <div className="text-center mb-1-half">
                <button type="button" className="btn btn-info Ripple-parent mb-2">
                  Send
                  <i className="fa fa-send ml-1" />
                  <div className="Ripple " />
                </button>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Do Something
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default ContactUs;
