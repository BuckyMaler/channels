// @flow
import { fromNow } from '../services/moment';
import { commaSeparateNumber } from '../utils/utils';

export type VideoItem = {
  id: string,
  snippet: {
    publishedAt: string,
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
};

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

  static from(item: VideoItem): VideoType {
    const { id, snippet, statistics } = item;
    const { title, description, thumbnails } = snippet;
    const { likeCount, dislikeCount } = statistics;
    const thumbnail = thumbnails.high.url;
    const publishedAt = fromNow(snippet.publishedAt, 'YYYYMMDD');
    const viewCount = commaSeparateNumber(statistics.viewCount);
    return new VideoType(
      id,
      title,
      thumbnail,
      description,
      publishedAt,
      viewCount,
      likeCount,
      dislikeCount
    );
  }
}
