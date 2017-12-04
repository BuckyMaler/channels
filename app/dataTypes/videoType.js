// @flow
import { commaSeparateNumber } from '../utils/utils';
import { fromNow } from '../services/moment';

export default class VideoType {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
  dislikeCount: string;

  constructor(
    id: string,
    title: string,
    thumbnail: string,
    description: string,
    publishedAt: string,
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

  static from(json: any): VideoType {
    const { id, snippet, statistics } = json;
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
