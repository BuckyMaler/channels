// @flow
import React, { Component } from 'react';
import LeftColumn from '../containers/LeftColumn';
import Loader from './core/Loader';
import ErrorState from './core/ErrorState';
import styles from './Home.scss';

export default class Home extends Component {
  props: {
    token: string,
    isFetching: boolean,
    error: boolean,
    fetchAccessToken: () => Promise<any>,
    fetchChannels: () => Promise<any>
  };

  intervalId: number;
  tenMinutes: number;
  interval: () => number;

  constructor(props: any) {
    super(props);
    this.tenMinutes = 600000;
    this.interval = () => setInterval(this.props.fetchAccessToken, this.tenMinutes);
  }

  componentDidMount() {
    this.props.fetchAccessToken();
    this.intervalId = this.interval();
  }

  componentWillReceiveProps(nextProps: any) {
    const { token } = this.props;
    const { token: nextToken } = nextProps;
    if (!token && nextToken) {
      this.props.fetchChannels();
    }
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
    if ((isFetching && !token) || error) {
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
      <div>
        <LeftColumn />
      </div>
    );
  }
}
