// @flow
import { fromNow } from '../services/moment';
import { commaSeparateNumber } from '../utils/utils';

export interface IVideo {
  id: string,
  snippet: {
    publishedAt: Date,
    title: string,
    description: string,
    thumbnails: {
      default: { url: string, width: number, height: number },
      medium: { url: string, width: number, height: number },
      high: { url: string, width: number, height: number }
    }
  },
  statistics: {
    viewCount: string,
    likeCount: string,
    dislikeCount: string
  }
}

export default class VideoType {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  publishedAt: Date;
  viewCount: string;
  likeCount: string;
  dislikeCount: string;

  constructor(
    id: string,
    title: string,
    thumbnail: string,
    description: string,
    publishedAt: Date,
    viewCount: string,
    likeCount: string,
    dislikeCount: string
  ) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
    this.description = description;
    this.publishedAt = publishedAt;
    this.viewCount = viewCount;
    this.likeCount = likeCount;
    this.dislikeCount = dislikeCount;
  }

  static from(item: IVideo): VideoType {
    const { id, snippet, statistics } = item;
    const title = snippet.title;
    const thumbnail = snippet.thumbnails.high.url;
    const description = snippet.description;
    const publishedAt = fromNow(snippet.publishedAt, 'YYYYMMDD');
    const viewCount = commaSeparateNumber(statistics.viewCount);
    const likeCount = statistics.likeCount;
    const dislikeCount = statistics.dislikeCount;
    return new VideoType(id, title, thumbnail, description, publishedAt, viewCount, likeCount, dislikeCount);
  }
}
