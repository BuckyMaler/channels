import React, { Component } from 'react';
import { loadVideo } from '../services/ytPlayer';
import styles from './Player.scss';

export default class Player extends Component {
  props: {
    id: string
  };

  componentDidMount() {
    loadVideo(this.props.id);
  }

  componentWillReceiveProps(nextProps: any) {
    const { id } = this.props;
    const { id: nextId } = nextProps;
    if (id !== nextId) {
      loadVideo(nextId);
    }
  }

  render() {
    return (
      <div className={styles.player}>
        <div id="player" />
      </div>
    );
  }
}
