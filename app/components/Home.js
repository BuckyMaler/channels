// @flow
import React, { Component } from 'react';
import LeftColumn from '../containers/LeftColumn';

export default class Home extends Component {
  props: {
    token: string,
    fetchAccessToken: () => void,
    fetchChannels: () => void
  };

  intervalId: number;
  tenMinutes: number;
  interval: () => number;

  constructor(props: any) {
    super(props);
    this.tenMinutes = 600000;
    this.interval = () => setInterval(this.props.fetchAccessToken, this.tenMinutes);
  }

  componentWillMount() {
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
    return (
      <div>
        <LeftColumn />
      </div>
    );
  }
}
