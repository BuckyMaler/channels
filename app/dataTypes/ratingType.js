// @flow
import { stringOrEmpty } from '../utils/utils';

const likeRatingMap = {
  like: true,
  dislike: false
};

const dislikeRatingMap = {
  like: false,
  dislike: true
};

export default class RatingType {
  id: string;
  like: boolean;
  dislike: boolean;

  constructor(
    id: string,
    like: boolean,
    dislike: boolean
  ) {
    this.id = id;
    this.like = like;
    this.dislike = dislike;
  }

  static from(item: any): RatingType {
    const { videoId, rating } = item;
    const id = stringOrEmpty(videoId);
    const like = likeRatingMap[stringOrEmpty(rating)] || false;
    const dislike = dislikeRatingMap[stringOrEmpty(rating)] || false;
    return new RatingType(id, like, dislike);
  }
}
