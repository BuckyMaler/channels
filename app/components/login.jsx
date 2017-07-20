// @flow
import React from 'react';
import { IconChannels, IconGoogle } from './icons';
import { googleAuth } from '../services/authorization';
import styles from './login.scss';

const Login = () => (
  <div className={styles.login}>
    <div className={styles.background} />
    <IconChannels styles={styles} />
    <p className={styles.kicker}>The Mac App For YouTube Channels.</p>
    <button className={styles.btn} onClick={googleAuth}>
      <IconGoogle styles={styles} />
      Sign in with Google
    </button>
  </div>
);

export default Login;
