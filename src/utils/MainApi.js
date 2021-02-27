export const mainApiUrl = 'https://api.nexplorer.students.nomoreparties.space';

export class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  async signInAsync(data) {
    const response = await fetch(
      this._baseUrl + '/signin',
      this._getRequestOptions('POST', data));

    if (response.status == 401) {
      throw new Error('Некорректные имя пользователя или пароль');
    }

    return await this._readResponseContentAsync(response);
  }

  async signUpAsync(data) {
    const response = await fetch(
      this._baseUrl + '/signup',
      this._getRequestOptions('POST', data));

    if (response.status == 409) {
      throw new Error('Такой пользователь уже есть');
    }

    return await this._readResponseContentAsync(response);
  }

  async getUserAsync(token) {
    const response = await fetch(
      this._baseUrl + '/users/me',
      this._getRequestOptions('GET', null, token));

    return await this._readResponseContentAsync(response);
  }

  async getSavedNewsAsync(token) {
    const response = await fetch(
      this._baseUrl + '/articles',
      this._getRequestOptions('GET', null, token));
      
    return await this._readResponseContentAsync(response);
  }

  async saveNewsAsync(data, token) {
    const response = await fetch(
      this._baseUrl + '/articles',
      this._getRequestOptions('POST', data, token));

    return await this._readResponseContentAsync(response);
  }

  async removeNewsAsync(id, token) {
    const response = await fetch(
      this._baseUrl + '/articles/' + id,
      this._getRequestOptions('DELETE', null, token));

    if (!response.ok) {
      throw new Error(response.statusText);
    }
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
    console.log(response);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }
}

export const mainApi = new MainApi({
  baseUrl: mainApiUrl,
})