// @flow
import React, { Component } from 'react';
import LeftColumn from '../components/leftColumn';

export default class Home extends Component {
  props: {
    fetchAccessToken: () => void
  }

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
