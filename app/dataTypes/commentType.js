// @flow
import { stringOrEmpty } from '../utils/utils';
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
    const { id: commentId } = json;
    const { snippet } = json.snippet.topLevelComment;
    const id = stringOrEmpty(commentId);
    const author = stringOrEmpty(snippet.authorDisplayName);
    const avatar = stringOrEmpty(snippet.authorProfileImageUrl);
    const description = stringOrEmpty(snippet.textDisplay);
    const publishedAt = fromNow(stringOrEmpty(snippet.publishedAt), 'YYYYMMDD');
    return new CommentType(id, author, avatar, description, publishedAt);
  }
}
