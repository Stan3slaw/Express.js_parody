module.exports = class Router {
  constructor() {
    this.endpoints = {};
  }

  _request = (method, path, handler) => {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }

    const currentEndpoint = this.endpoints[path];

    if (currentEndpoint[method]) {
      throw new Error(`[${method}] already exist on path ${path}`);
    }

    currentEndpoint[method] = handler;
  };

  get = (path, handler) => {
    this._request('GET', path, handler);
  };

  post = (path, handler) => {
    this._request('POST', path, handler);
  };

  put = (path, handler) => {
    this._request('PUT', path, handler);
  };

  delete = (path, handler) => {
    this._request('DELETE', path, handler);
  };
};
