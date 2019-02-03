import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class InfoModal extends Component {
  state = {
    modal: false
  }

  toggle = () => this.setState({
    modal: !this.state.modal
  })

  render() {
    return (
      <div>
        <span className="trigger-info-modal" onClick={this.toggle}>{this.props.trigger}</span>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="info-modal">
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>
            {this.props.children}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggle}>Fechar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

InfoModal.propTypes = {
  title: PropTypes.any,
  trigger: PropTypes.any.isRequired
}

export default InfoModal;
