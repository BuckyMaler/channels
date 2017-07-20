// @flow
export const Methods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

export function authRequest(uri: string): Promise<any> {
  const [url, body] = uri.split('?');
  const init = {
    method: Methods.POST,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  };
  return fetch(new Request(url, init));
}
