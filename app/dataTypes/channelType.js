// @flow
import { commaSeparateNumber } from '../utils/utils';

export interface IChannel {
  id: string,
  snippet: {
    title: string,
    thumbnails: {
      default: { url: string },
      medium: { url: string },
      high: { url: string }
    }
  },
  statistics: {
    subscriberCount: string,
    videoCount: string
  }
}

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

  static from(item: IChannel): ChannelType {
    const { id, snippet, statistics } = item;
    const title = snippet.title;
    const thumbnail = snippet.thumbnails.default.url;
    const videoCount = commaSeparateNumber(statistics.videoCount);
    const subscriberCount = commaSeparateNumber(statistics.subscriberCount);
    return new ChannelType(id, title, thumbnail, videoCount, subscriberCount);
  }
}
