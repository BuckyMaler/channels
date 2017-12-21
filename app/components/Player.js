import React, { Component } from 'react';
import { loadVideo } from '../services/ytPlayer';
import styles from './Player.scss';

type Props = {
  activeVideoId: string
};

export default class Player extends Component<Props> {
  componentDidMount() {
    loadVideo(this.props.activeVideoId);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { activeVideoId: id } = this.props;
    const { activeVideoId: nextId } = nextProps;
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
