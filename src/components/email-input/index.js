import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EmailInput extends Component {

  render() {
    const { email, onSubmit, mutEmail } = this.props;
    return (
      <div>
        <input type="email" value={email} onChange={mutEmail} />
        <button className="btn btn-primary" onClick={() => onSubmit(email)}>Submit</button>
      </div>
    );
  }
}

EmailInput.propTypes = {
  email: PropTypes.string,
  submitting: PropTypes.bool,
  submitted: PropTypes.bool
}