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
          <h1>Future Voice</h1>
          <p>Whisper yourself in the future.</p>
        </div>
        <div className="App-intro">
          Subscribe to be notified when the app is ready
          {submitted && !error ? (
            <div>Success!</div>
          ) : (
            <EmailInput email={email || ''} onSubmit={onSubmit} mutEmail={mutEmail} />
          )}
        </div>
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