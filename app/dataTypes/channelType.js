// @flow
import { stringOrEmpty, commaSeparateNumber } from '../utils/utils';

export default class ChannelType {
  id: string;
  title: string;
  thumbnail: string;
  videoCount: string;
  subscriberCount: string;

  constructor(
    id: string,
    title: string,
    thumbnail: string,
    videoCount: string,
    subscriberCount: string
  ) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
    this.videoCount = videoCount;
    this.subscriberCount = subscriberCount;
  }

  static from(item: any): ChannelType {
    const { id: channelId, snippet, statistics } = item;
    const id = stringOrEmpty(channelId);
    const title = stringOrEmpty(snippet.title);
    const thumbnail = stringOrEmpty(snippet.thumbnails.default.url);
    const videoCount = commaSeparateNumber(stringOrEmpty(statistics.videoCount));
    const subscriberCount = commaSeparateNumber(stringOrEmpty(statistics.subscriberCount));
    return new ChannelType(id, title, thumbnail, videoCount, subscriberCount);
  }
}
