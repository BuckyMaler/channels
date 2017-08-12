// @flow
export const Methods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

type MethodsType = $Keys<typeof Methods>;

export function authRequest(uri: string): Promise<any> {
  const [url, body] = uri.split('?');
  const init = {
    method: Methods.POST,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  };
  return fetch(url, init)
    .then(res => res.json());
}

export function apiRequest(uri: string, method: MethodsType): Promise<any> {
  const init = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };
  return fetch(uri, init)
    .then(res => res.json());
}
