// @flow
import { fromNow } from '../services/moment';

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

  static from(json: any): CommentType {
    const { id, snippet: snip } = json;
    const { snippet } = snip.topLevelComment;
    const author = snippet.authorDisplayName;
    const avatar = snippet.authorProfileImageUrl;
    const description = snippet.textDisplay;
    const publishedAt = fromNow(snippet.publishedAt, 'YYYYMMDD');
    return new CommentType(id, author, avatar, description, publishedAt);
  }
}
