// @flow
export const Methods = {
  GET: 'GET',
  POST: 'POST'
};

export function authRequest(uri: string): Promise<any> {
  const [url, body] = uri.split('?');
  const init = {
    method: Methods.POST,
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
    method: Methods.GET,
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
  const init = body ?
  {
    method: Methods.POST,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  } :
  {
    method: Methods.POST,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };
  return fetch(uri, init)
    .then(res => {
      if (!res.ok) {
        return Promise.reject();
      }
      return res;
    });
}
