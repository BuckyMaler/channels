// @flow
export type RatingItem = {
  videoId: string,
  rating: string
};

const likeMap = {
  like: true,
  dislike: false
};

const dislikeMap = {
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

  static from(item: RatingItem): RatingType {
    const { videoId, rating } = item;
    const like = likeMap[rating] || false;
    const dislike = dislikeMap[rating] || false;
    return new RatingType(videoId, like, dislike);
  }
}
