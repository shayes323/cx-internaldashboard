import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import firebase from 'firebase/app';

export class HttpClient {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.API_PROXY_PATH,
    });
  }

  appendAuthorization = async (config?: AxiosRequestConfig) => {
    const conf = config ?? {};
    const token = await firebase.auth().currentUser?.getIdToken();

    if (!token) {
      return conf;
    }

    if (!conf.headers) {
      conf.headers = {};
    }
    conf.headers['Authorization'] = `Bearer ${token}`;
    return conf;
  };

  get = async <T = any>(uri: string, conf?: AxiosRequestConfig) =>
    this.axios.get<T>(uri, await this.appendAuthorization(conf));

  post = async <T = any>(uri: string, data: any, conf?: AxiosRequestConfig) => {
    return this.axios.post<T>(uri, data, await this.appendAuthorization(conf));
  };

  put = async <T = any>(uri: string, data: any, conf?: AxiosRequestConfig) => {
    return this.axios.put<T>(uri, data, await this.appendAuthorization(conf));
  };

  patch = async <T = any>(uri: string, data: any, conf?: AxiosRequestConfig) => {
    return this.axios.patch<T>(uri, data, await this.appendAuthorization(conf));
  };

  delete = async (uri: string, conf?: AxiosRequestConfig) =>
    this.axios.delete(uri, await this.appendAuthorization(conf));

  createCancelTokenSrc = () => axios.CancelToken.source();
}

export const httpClient = new HttpClient();