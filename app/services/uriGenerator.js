// @flow
import urls from '../constants/urls';
import authParams from '../constants/authParams';

function buildUriWithQueryParams(url: string, params: {}): string {
  const paramKeys = Object.keys(params);
  const queryParams = paramKeys.map(key => `${key}=${params[key]}&`).join('');
  return url + queryParams.slice(0, -1);
}

export function getAuthRequestUri(): string {
  const defaultParams = {
    client_id: authParams.CLIENT_ID,
    redirect_uri: authParams.REDIRECT_URI,
    scope: authParams.SCOPE,
    response_type: authParams.RESPONSE_TYPE
  };
  return buildUriWithQueryParams(urls.AUTH, defaultParams);
}

export function getRefreshTokenUri(code: string): string {
  const defaultParams = {
    code,
    client_id: authParams.CLIENT_ID,
    client_secret: authParams.CLIENT_SECRET,
    redirect_uri: authParams.REDIRECT_URI,
    grant_type: authParams.GRANT_TYPE[0]
  };
  return buildUriWithQueryParams(urls.TOKEN, defaultParams);
}

export function getRevokeTokenUri(): string {
  const defaultParams = {
    token: localStorage.getItem('refreshToken')
  };
  return buildUriWithQueryParams(urls.REVOKE, defaultParams);
}

export function getAccessTokenUri(): string {
  const defaultParams = {
    client_id: authParams.CLIENT_ID,
    client_secret: authParams.CLIENT_SECRET,
    grant_type: authParams.GRANT_TYPE[1],
    refresh_token: localStorage.getItem('refreshToken')
  };
  return buildUriWithQueryParams(urls.TOKEN, defaultParams);
}

export function getSubscriptionsUri(): string {
  const defaultParams = {
    part: 'snippet',
    fields: 'items/snippet/resourceId/channelId',
    mine: true,
    maxResults: 50,
    access_token: localStorage.getItem('accessToken')
  };
  return buildUriWithQueryParams(urls.SUBSCRIPTIONS, defaultParams);
}

export function getChannelsUri(subscriptions: string): string {
  const defaultParams = {
    id: subscriptions,
    part: 'snippet,statistics',
    fields: 'items(id,snippet(thumbnails,title),statistics(subscriberCount,videoCount))',
    access_token: localStorage.getItem('accessToken')
  };
  return buildUriWithQueryParams(urls.CHANNELS, defaultParams);
}

export function getVideoIdsUri(params: {}): string {
  const defaultParams = {
    type: 'video',
    part: 'id',
    fields: 'items(id/videoId),nextPageToken,pageInfo,tokenPagination',
    maxResults: 20,
    access_token: localStorage.getItem('accessToken')
  };
  return buildUriWithQueryParams(urls.SEARCH, { ...defaultParams, ...params });
}

export function getVideosUri(videoIds: string): string {
  const defaultParams = {
    id: videoIds,
    part: 'snippet,statistics',
    fields: 'items(id,snippet(publishedAt,thumbnails,title,description),statistics(viewCount,likeCount,dislikeCount))',
    access_token: localStorage.getItem('accessToken')
  };
  return buildUriWithQueryParams(urls.VIDEOS, defaultParams);
}

export function getRatingsUri(videoIds: string): string {
  const defaultParams = {
    id: videoIds,
    access_token: localStorage.getItem('accessToken')
  };
  return buildUriWithQueryParams(urls.GET_RATING, defaultParams);
}

export function postRatingUri(params: {}): string {
  const defaultParams = {
    access_token: localStorage.getItem('accessToken')
  };
  return buildUriWithQueryParams(urls.RATE, { ...defaultParams, ...params });
}

export function getTopLevelCommentsUri(params: {}): string {
  const defaultParams = {
    part: 'id,snippet',
    fields: 'items(id,snippet(topLevelComment(snippet(authorDisplayName,authorProfileImageUrl,textDisplay,publishedAt)))),nextPageToken,pageInfo,tokenPagination',
    maxResults: 20,
    textFormat: 'plainText',
    access_token: localStorage.getItem('accessToken')
  };
  return buildUriWithQueryParams(urls.COMMENT_THREADS, { ...defaultParams, ...params });
}

export function postTopLevelCommentUri(): string {
  const defaultParams = {
    part: 'id,snippet',
    fields: 'id,snippet(topLevelComment(snippet(authorDisplayName,authorProfileImageUrl,textDisplay,publishedAt)))',
    access_token: localStorage.getItem('accessToken')
  };
  return buildUriWithQueryParams(urls.COMMENT_THREADS, defaultParams);
}
