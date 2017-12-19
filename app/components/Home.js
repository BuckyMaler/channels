// @flow
import React, { Component } from 'react';
import ErrorState from './core/ErrorState';
import Loader from './core/Loader';
import type { PromiseAction } from '../constants/types';
import LeftColumn from '../containers/LeftColumn';
import RightColumn from '../containers/RightColumn';
import styles from './Home.scss';

type Props = {
  token: string,
  isFetching: boolean,
  error: boolean,
  fetchAccessToken: () => PromiseAction
};

export default class Home extends Component<Props> {
  intervalId: number;

  componentDidMount() {
    this.props.fetchAccessToken();
    this.intervalId = this.refreshAccessToken();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  refreshAccessToken = (): number => {
    const fiftyMinutes = 3000000;
    return setInterval(this.props.fetchAccessToken, fiftyMinutes);
  }

  render() {
    const {
      token,
      isFetching,
      error,
      fetchAccessToken
    } = this.props;
    if (!token || error) {
      return (
        <div className={styles.home}>
          {isFetching ? (
            <Loader />
          ) : (
            <ErrorState
              color="black"
              message="Error accessing your account."
              retry={fetchAccessToken}
            />
          )}
        </div>
      );
    }

    return (
      <div className={styles.home}>
        <LeftColumn />
        <RightColumn />
      </div>
    );
  }
}
