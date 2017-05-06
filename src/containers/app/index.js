import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmailInput from '../../components/email-input';
import { submit, mutEmail, signIn, signOut } from '../../modules/reducers';
import PropTypes from 'prop-types';

import './styles.css';

export class App extends Component {
  render() {
    const { email, onSubmit, mutEmail, error, submitted } = this.props;

    return (
      <div className="App">
        <div className="App-header">
          <h2>Get Future Voice</h2>
        </div>
        <p className="App-intro">
          Subscribe
        </p>
        {submitted && !error ? (
          <div>Success!</div>
        ) : (
          <EmailInput email={email || ''} onSubmit={onSubmit} mutEmail={mutEmail} />
        )}
        <div className="Subscribe__error">{error && error.code}</div>
      </div>
    );
  }
}

App.propTypes = {
  email: PropTypes.string,
  submitting: PropTypes.bool,
  submitted: PropTypes.bool
}

const mapStateToProps = ({ app }) => ({
  error: app.error,
  email: app.email,
  submitting: app.submitting,
  submitted: app.submitted
});

const mapDispatcherToProps = (dispatch, ownProps) => ({
  onSubmit(email) {
    dispatch(submit(email));
  },
  mutEmail(event) {
    dispatch(mutEmail(event));
  },
  onSignIn() {
    let email = window.prompt('email');
    let password = window.prompt('passowrd');
    dispatch(signIn(email, password))
  },
  onSignOut() {
    dispatch(signOut());
  }
});

export default connect(mapStateToProps, mapDispatcherToProps)(App);