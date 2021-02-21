export const mainApiUrl = 'http://localhost:3001';

export class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  async signInAsync(data) {
    const response = await fetch(
      this._baseUrl + '/signin',
      this._getRequestOptions('POST', data));

    return await this._readResponseContentAsync(response);
  }

  async signUpAsync(data) {
    const response = await fetch(
      this._baseUrl + '/signup',
      this._getRequestOptions('POST', data));

    return await this._readResponseContentAsync(response);
  }

  async getUserAsync(token) {
    const response = await fetch(
      this._baseUrl + '/users/me',
      this._getRequestOptions('GET', null, token));

      return await this._readResponseContentAsync(response);
  }

  _getRequestOptions(method, data, token) {
    const options = { headers: {} };

    if (method) {
      options.method = method;
    }

    if (data) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(data);
    }

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    return options;
  }

  async _readResponseContentAsync(response) {
    if (!response.ok) {
      throw new Error('Ошибка: ' + response.status);
    }

    return await response.json();
  }
}

export const mainApi = new MainApi({
  baseUrl: mainApiUrl,
})