// @flow
import React, { Component } from 'react';
import BlankState from './core/BlankState';
import Channel from './core/Channel';
import ErrorState from './core/ErrorState';
import Loader from './core/Loader';
import Modal from './core/Modal';
import type { PromiseAction } from '../constants/types';
import ChannelType from '../dataTypes/channelType';
import styles from './ChannelList.scss';

type Props = {
  channels: ChannelType[],
  isFetching: boolean,
  error: boolean,
  activeChannelId: string,
  channelListIsOpen: boolean,
  toggleChannelList: () => void,
  fetchChannels: () => PromiseAction,
  updateActiveChannel: (channel: ChannelType) => void
};

export default class ChannelList extends Component<Props> {
  componentDidMount() {
    this.props.fetchChannels();
  }

  render() {
    const {
      channels,
      isFetching,
      error,
      activeChannelId,
      channelListIsOpen,
      toggleChannelList,
      fetchChannels,
      updateActiveChannel
    } = this.props;
    if (isFetching || error) {
      return (
        <Modal
          isOpen={channelListIsOpen}
          stylesProp={styles}
          handleClick={toggleChannelList}
        >
          {isFetching ? (
            <Loader />
          ) : (
            <ErrorState
              color="black"
              message="Error requesting channels."
              retry={fetchChannels}
            />
          )}
        </Modal>
      );
    }

    return (
      <Modal
        isOpen={channelListIsOpen}
        stylesProp={styles}
        handleClick={toggleChannelList}
      >
        {channels.length ? (
          <ul className={styles.channelList} onClick={toggleChannelList}>
            {channels.map(channel => (
              <Channel
                key={channel.id}
                title={channel.title}
                thumbnail={channel.thumbnail}
                videoCount={channel.videoCount}
                subscriberCount={channel.subscriberCount}
                isActive={channel.id === activeChannelId}
                handleClick={() => updateActiveChannel(channel)}
              />
            ))}
          </ul>
        ) : (
          <BlankState
            color="black"
            message="No channels found."
          />
        )}
      </Modal>
    );
  }
}
