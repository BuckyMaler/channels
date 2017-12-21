// @flow
import { fromNow } from '../services/moment';

export type CommentItem = {
  id: string,
  snippet: {
    topLevelComment: {
      snippet: {
        authorDisplayName: string,
        authorProfileImageUrl: string,
        textDisplay: string,
        publishedAt: string
      }
    }
  }
};

export default class CommentType {
  id: string;
  author: string;
  avatar: string;
  description: string;
  publishedAt: string;

  constructor(
    id: string,
    author: string,
    avatar: string,
    description: string,
    publishedAt: string
  ) {
    this.id = id;
    this.author = author;
    this.avatar = avatar;
    this.description = description;
    this.publishedAt = publishedAt;
  }

  static from(item: CommentItem): CommentType {
    const { id, snippet: s } = item;
    const { snippet } = s.topLevelComment;
    const author = snippet.authorDisplayName;
    const avatar = snippet.authorProfileImageUrl;
    const description = snippet.textDisplay;
    const publishedAt = fromNow(snippet.publishedAt, 'YYYYMMDD');
    return new CommentType(id, author, avatar, description, publishedAt);
  }
}
