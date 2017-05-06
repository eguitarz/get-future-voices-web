import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmailInput from '../../components/email-input';
import { submit, mutEmail, signIn, signOut } from '../../modules/reducers';
import PropTypes from 'prop-types';

import './styles.css';

export class App extends Component {
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
        <EmailInput email={email || ''} onSubmit={onSubmit} mutEmail={mutEmail} />
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
  email: app.email,
  submmiting: app.submitting,
  submmited: app.submitted
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