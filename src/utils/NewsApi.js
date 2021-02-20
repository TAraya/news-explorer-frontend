export const newsApiUrl = 'https://newsapi.org/v2';
export const newsApiKey = 'b9152e313bfc4159989e019ba0820d61';

export class NewsApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._apiKey = options.apiKey;
  }

  async getEverythingAsync(params) {
    const response = await fetch(
      this._baseUrl + '/everything?' + this._buildSearchString(params));

    if (!response.ok) {
      throw new Error('Ошибка: ' + response.status);
    }

    const data = await response.json();
    return this._mapResult(params.q, data);
  }

  _buildSearchString(params) {
    const allParams = {...params};
    allParams.apiKey = this._apiKey;
    
    if (allParams.from) {
      allParams.from = this._formatDate(allParams.from);
    }

    if (allParams.to) {
      allParams.to = this._formatDate(allParams.to);
    }

    return new URLSearchParams(allParams).toString();
  }

  _formatDate(date) {
    const month = ('0' + (date.getMonth() + 1)).substr(-2);
    const day = ('0' + date.getDate()).substr(-2);
    const year = ('000' + date.getFullYear()).substr(-4);

    return [year, month, day].join('-');
  }

  _mapResult(query, data) {
    if (data.status !== 'ok') {
      throw new Error(data.message);
    }

    return data.articles.map((article, index) => {
      return {
        title: article.title,
        date: article.publishedAt,
        text: article.description,
        link: article.url,
        image: article.urlToImage,
        source: article.source.name,
        keyword: query,
        index,
      };
    });
  }
}

export const newsApi = new NewsApi({
  baseUrl: newsApiUrl,
  apiKey: newsApiKey,
})