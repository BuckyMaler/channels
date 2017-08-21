// @flow
import React, { Component } from 'react';
import LeftColumn from '../components/LeftColumn';
import type { AccessTokenState } from '../constants/typeAliases';

export default class Home extends Component {
  props: {
    accessToken: AccessTokenState,
    fetchAccessToken: () => void,
    fetchChannels: () => void
  };

  intervalId: number;
  tenMinutes: number;
  interval: () => number;

  constructor() {
    super();
    this.tenMinutes = 600000;
    this.interval = () => setInterval(this.props.fetchAccessToken, this.tenMinutes);
  }

  componentWillMount() {
    this.props.fetchAccessToken();
    this.intervalId = this.interval();
  }

  componentWillReceiveProps(nextProps: any) {
    const { accessToken } = this.props.accessToken;
    const { accessToken: nextAccessToken } = nextProps.accessToken;
    if (!accessToken && nextAccessToken) {
      this.props.fetchChannels();
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <div>
        <LeftColumn />
      </div>
    );
  }
}
