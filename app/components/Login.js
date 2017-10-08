// @flow
import React from 'react';
import { IconChannels, IconGoogle } from './core/Icons';
import { googleAuth } from '../services/authorization';
import styles from './Login.scss';

const Login = () => (
  <div className={styles.login}>
    <div className={styles.background} />
    <IconChannels styles={styles} />
    <p className={styles.kicker}>The Mac App For YouTube Channels.</p>
    <button className={styles.btn} onClick={googleAuth}>
      <IconGoogle className={styles.iconGoogle} />
      Sign in with Google
    </button>
  </div>
);

export default Login;
