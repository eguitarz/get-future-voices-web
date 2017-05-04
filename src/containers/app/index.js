import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmailInput from '../../components/email-input';
import { submit, mutEmail, signIn, signOut } from '../../modules/reducers';
import PropTypes from 'prop-types';

import './styles.css';

export class App extends Component {
  render() {
    const { user, email, onSubmit, mutEmail, onSignIn, onSignOut } = this.props;

    return (
      <div className="App">
        {user ? (
          <button onClick={onSignOut}>Sign Out</button>
        ) : (
          <button onClick={onSignIn}>Sign In</button>
        )}
        <div className="App-header">
          <h2>Get Future Voice</h2>
        </div>
        <p className="App-intro">
          Subscribe
        </p>
        <EmailInput email={email || ''} onSubmit={onSubmit} mutEmail={mutEmail} />
      </div>
    );
  }
}

App.protoTypes = {
  email: PropTypes.string,
  submitting: PropTypes.boolean,
  submitted: PropTypes.boolean ,
  user: PropTypes.object
}

const mapStateToProps = ({ app }) => ({
  email: app.email,
  submmiting: app.submitting,
  submmited: app.submitted,
  user: app.user
});

const mapDispatcherToProps = (dispatch, ownProps) => ({
  onSubmit() {
    dispatch(submit());
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