// @flow
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
    const like = likeRatingMap[rating] || false;
    const dislike = dislikeRatingMap[rating] || false;
    return new RatingType(videoId, like, dislike);
  }
}
