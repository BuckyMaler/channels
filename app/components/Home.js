// @flow
import React, { Component } from 'react';
import LeftColumn from '../containers/LeftColumn';
import RightColumn from '../containers/RightColumn';
import Loader from './core/Loader';
import ErrorState from './core/ErrorState';
import styles from './Home.scss';

export default class Home extends Component {
  props: {
    token: string,
    isFetching: boolean,
    error: boolean,
    fetchAccessToken: () => Promise<any>
  };

  intervalId: number;
  fiftyMinutes: number;
  interval: () => number;

  constructor(props: any) {
    super(props);
    this.fiftyMinutes = 3000000;
    this.interval = () => setInterval(this.props.fetchAccessToken, this.fiftyMinutes);
  }

  componentDidMount() {
    this.props.fetchAccessToken();
    this.intervalId = this.interval();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
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
              message={'Error accessing your account.'}
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
