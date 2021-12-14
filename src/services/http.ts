import axios, { AxiosRequestConfig, Method } from 'axios';

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

    const token = this.auth.getToken();
    if (token) {
      config.headers = {
        Authorization: `Bear ${token}`,
      };
    }

    if (data) {
      config.data = data;
    }
    return config;
  };

  get = (url: string, customConfig: any = {}) => {
    const config = this.basicConfig(url, 'GET');
    return axios({ ...config, ...customConfig }).catch(this.handleException);
  };

  post = (url: string, data: any, otherConfig: any = {}) => {
    const config = this.basicConfig(url, 'POST', data);
    return axios({ ...config, ...otherConfig }).catch(this.handleException);
  };

  put = (url: string, data: any, otherConfig: any = {}) => {
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
