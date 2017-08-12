// @flow
import uuid from 'uuid';
import { stringOrEmpty, commaSeparateNumber } from '../utils/utils';

export default class ChannelType {
  title: string;
  thumbnail: string;
  videoCount: string;
  subscriberCount: string;
  isActive: boolean;
  id: string;

  constructor(
    title: string,
    thumbnail: string,
    videoCount: string,
    subscriberCount: string,
    isActive: boolean = false,
    id: string = uuid.v4()
  ) {
    this.title = title;
    this.thumbnail = thumbnail;
    this.videoCount = videoCount;
    this.subscriberCount = subscriberCount;
    this.isActive = isActive;
    this.id = id;
  }

  static from(json: any): ChannelType {
    const { snippet, statistics } = json;
    const title = stringOrEmpty(snippet.title);
    const thumbnail = stringOrEmpty(snippet.thumbnails.default.url);
    const videoCount = commaSeparateNumber(stringOrEmpty(statistics.videoCount));
    const subscriberCount = commaSeparateNumber(stringOrEmpty(statistics.subscriberCount));
    return new ChannelType(title, thumbnail, videoCount, subscriberCount);
  }
}
