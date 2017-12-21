// @flow
import { authRequest } from './fetch';
import { getAuthRequestUri, getRefreshTokenUri } from './uriGenerator';

const { BrowserWindow } = require('electron').remote;

export function googleAuth(): void {
  const authWindow = new BrowserWindow({
    width: 500,
    height: 562,
    webPreferences: {
      nodeIntegration: false
    }
  });

  const uri = getAuthRequestUri();

  authWindow.loadURL(uri);

  authWindow.on('page-title-updated', (event, title) => {
    if (title.includes('code') || title.includes('error')) {
      getCodeFromTitle(title);
      authWindow.destroy();
    }
  });
}

function getCodeFromTitle(title: string): void {
  const rawCode = /code=([^&]*)/.exec(title) || null;
  const code = (rawCode && rawCode.length > 1) ? rawCode[1] : null;
  exchangeCode(code);
}

function exchangeCode(code: ?string): void {
  if (code) {
    const uri = getRefreshTokenUri(code);
    authRequest(uri) // eslint-disable-line promise/catch-or-return
      .then(json => { // eslint-disable-line promise/always-return
        localStorage.setItem('refreshToken', json.refresh_token);
        location.hash = '/'; // eslint-disable-line no-restricted-globals
      });
  } else {
    alert('An error ocurred logging in with Google. Please try again.');
  }
}

export function requireAuth(): void {
  const isAuthorized = localStorage.getItem('refreshToken');
  location.hash = isAuthorized ? '/' : '/login'; // eslint-disable-line no-restricted-globals
}
