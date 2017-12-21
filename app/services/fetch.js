// @flow
const methods = {
  GET: 'GET',
  POST: 'POST'
};

const status = {
  NO_CONTENT: 204
};

export function authRequest(uri: string): Promise<any> {
  const [url, body] = uri.split('?');
  const init = {
    method: methods.POST,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  };
  return fetch(url, init)
    .then(res => {
      if (!res.ok) {
        return Promise.reject();
      }
      return res.json();
    });
}

export function getRequest(uri: string): Promise<any> {
  const init = {
    method: methods.GET,
    headers: { 'Content-Type': 'application/json' }
  };
  return fetch(uri, init)
    .then(res => {
      if (!res.ok) {
        return Promise.reject();
      }
      return res.json();
    });
}

export function postRequest(uri: string, body?: {}): Promise<any> {
  const init = {
    method: methods.POST,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  return fetch(uri, init)
    .then(res => {
      if (!res.ok) {
        return Promise.reject();
      }
      return res.status === status.NO_CONTENT ? res : res.json();
    });
}
