import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Contact extends Component {

  state = {
    showContactInfo: false
  };

  onDeleteClick = () => {
    this.props.deleteClickHandler();
  };

  // Function that is called from the h4 button note that an arrow function must be used to maintain the state (now used as an arrow function)
  // onShowClick = (e) => {
  //   console.log();
  //   this.setState({ showContactInfo: !this.state.showContactInfo });
  // }

  render() {
    const { name,email,phone } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
    <div className="card card-body mb-3">
      <h4>{name} <i onClick={ () => this.setState({ showContactInfo: !this.state.showContactInfo })} className="fas fa-sort-down" style={{cursor: 'pointer'}}></i>
      <i className="fas fa-times" style={{cursor: 'pointer', float: 'right', color: '#E55050'}} onClick={this.onDeleteClick}></i>
      </h4>
      {showContactInfo ? (<ul className="list-group">
          <li className="list-group-item">Email: {email}</li>
          <li className="list-group-item">Phone: {phone}</li>
        </ul>) : null }
      </div>
    );
  }
}

// Deprecated in favor of object-based declaration
// Contact.propTypes = {
//   name: PropTypes.string.isRequired,
//   email: PropTypes.string.isRequired,
//   phone: PropTypes.string.isRequired,
// };

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  deleteClickHandler: PropTypes.func.isRequired
}

export default Contact;
