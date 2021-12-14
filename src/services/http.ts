import axios, { AxiosRequestConfig, Method } from 'axios';

// const requestLog: boolean = process.env.REQUEST_LOG === 'true';
const requestLog: boolean = true;

export default class Http {
  auth: any;

  handleException = (e: any) => {
    const { response } = e;
    if (response.status === 401) {
      this.auth.deauthenticatedUser();
      window.location.reload();
    }

    return Promise.reject(e.response || e.message);
  };

  basicConfig = (url: string, method: Method, data?: any): AxiosRequestConfig => {
    const config: AxiosRequestConfig = {};
    config.url = url;
    config.method = method;

    if (data) {
      config.data = data;
    }
    return config;
  };

  get = (url: string, customConfig: any = {}) => {
    requestLog && console.log('GET URL: ' + url);
    const config = this.basicConfig(url, 'GET');
    return axios({ ...config, ...customConfig }).catch(this.handleException);
  };

  post = (url: string, data: any, otherConfig: any = {}) => {
    requestLog && console.log('GET POST: ' + url);
    const config = this.basicConfig(url, 'POST', data);
    return axios({ ...config, ...otherConfig }).catch(this.handleException);
  };

  put = (url: string, data: any, otherConfig: any = {}) => {
    requestLog && console.log('GET PUT: ' + url);
    const config = this.basicConfig(url, 'PUT', data);
    return axios({ ...config, ...otherConfig }).catch(this.handleException);
  };

  deleteRequest = (url: string, data: any, otherConfig: any = {}) => {
    const config = this.basicConfig(url, 'DELETE', data);
    return axios({ ...config, ...otherConfig }).catch(this.handleException);
  };

  combineRequests = (funcArray: any[]) => {
    return axios.all(funcArray).catch(this.handleException);
  };
}
