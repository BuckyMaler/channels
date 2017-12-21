// @flow
import type { ChannelItem } from '../dataTypes/channelType';
import type { CommentItem } from '../dataTypes/commentType';
import RatingType from '../dataTypes/ratingType';
import type { RatingItem } from '../dataTypes/ratingType';
import VideoType from '../dataTypes/videoType';
import type { VideoItem } from '../dataTypes/videoType';
import type { State } from '../reducers/index';

export type Action =
  | { type: 'FETCH_ACCESS_TOKEN_REQUEST' }
  | {
      type: 'FETCH_ACCESS_TOKEN_SUCCESS',
      payload: string
    }
  | { type: 'FETCH_ACCESS_TOKEN_FAILURE' }
  | {
      type: 'UPDATE_ACTIVE_VIDEO',
      payload: VideoType
    }
  | {
      type: 'UPDATE_ACTIVE_VIDEO_COUNTS',
      payload: {
        prevRating: RatingType,
        rating: string
      }
    }
  | { type: 'FETCH_CHANNELS_REQUEST' }
  | {
      type: 'FETCH_CHANNELS_SUCCESS',
      payload: ChannelItem[]
    }
  | { type: 'FETCH_CHANNELS_FAILURE' }
  | {
      type: 'UPDATE_ACTIVE_CHANNEL',
      payload: string
    }
  | { type: 'FETCH_COMMENTS_REQUEST' }
  | {
      type: 'FETCH_COMMENTS_SUCCESS',
      payload: {
        items: CommentItem[],
        nextPageToken: string
      }
    }
  | { type: 'FETCH_COMMENTS_FAILURE' }
  | {
      type: 'POST_COMMENT_SUCCESS',
      payload: CommentItem
    }
  | { type: 'FETCH_RATINGS_REQUEST' }
  | {
      type: 'FETCH_RATINGS_SUCCESS',
      payload: RatingItem[]
    }
  | { type: 'FETCH_RATINGS_FAILURE' }
  | {
      type: 'POST_RATING_SUCCESS',
      payload: RatingItem
    }
  | { type: 'FETCH_SEARCH_REQUEST' }
  | {
      type: 'FETCH_SEARCH_SUCCESS',
      payload: {
        items: VideoItem[],
        nextPageToken: string
      }
    }
  | { type: 'FETCH_SEARCH_FAILURE' }
  | {
      type: 'UPDATE_SEARCH_QUERY',
      payload: string
    }
  | { type: 'CLEAR_SEARCH_RESULTS' }
  | { type: 'FETCH_VIDEOS_REQUEST' }
  | {
      type: 'FETCH_VIDEOS_SUCCESS',
      payload: {
        items: VideoItem[],
        nextPageToken: string
      }
    }
  | { type: 'FETCH_VIDEOS_FAILURE' };

export type GetState = () => State;
export type PromiseAction = Promise<Action>;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
