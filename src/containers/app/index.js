import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmailInput from '../../components/email-input';
import { submit, mutEmail } from '../../modules/reducers';
import PropTypes from 'prop-types';

import './styles.css';

class App extends Component {
  render() {
    const { email, onSubmit, mutEmail } = this.props;

    return (
      <div className="App">
        <div className="App-header">
          <h2>Get Future Voice</h2>
        </div>
        <p className="App-intro">
          Subscribe
        </p>
        <EmailInput email={email} onSubmit={onSubmit} mutEmail={mutEmail} />
      </div>
    );
  }
}

App.protoTypes = {
  email: PropTypes.string,
  submitting: PropTypes.boolean,
  submitted: PropTypes.boolean 
}

const mapStateToProps = (state) => ({
  email: state.email,
  submmiting: state.submitting,
  submmited: state.submitted
});

const mapDispatcherToProps = (dispatch, ownProps) => ({
  onSubmit() {
    dispatch(submit());
  },
  mutEmail(event) {
    dispatch(mutEmail(event));
  }
});

export default connect(mapStateToProps, mapDispatcherToProps)(App);