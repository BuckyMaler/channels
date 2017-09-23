// @flow
import { stringOrEmpty, commaSeparateNumber } from '../utils/utils';
import { fromNow } from '../services/moment';

export default class VideoType {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  publishedAt: string;
  viewCount: string;

  constructor(
    id: string,
    title: string,
    thumbnail: string,
    description: string,
    publishedAt: string,
    viewCount: string,
  ) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
    this.description = description;
    this.publishedAt = publishedAt;
    this.viewCount = viewCount;
  }

  static from(json: any): VideoType {
    const { id: videoId, snippet, statistics } = json;
    const id = stringOrEmpty(videoId);
    const title = stringOrEmpty(snippet.title);
    const thumbnail = stringOrEmpty(snippet.thumbnails.high.url);
    const description = stringOrEmpty(snippet.description);
    const publishedAt = fromNow(stringOrEmpty(snippet.publishedAt), 'YYYYMMDD');
    const viewCount = commaSeparateNumber(stringOrEmpty(statistics.viewCount));
    return new VideoType(id, title, thumbnail, description, publishedAt, viewCount);
  }
}
