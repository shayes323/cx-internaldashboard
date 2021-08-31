import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import firebase from 'firebase/app';
import { UserStore, userStore } from './user.store';

async function errorInterceptor(error: AxiosError) {
  if (error.response?.status === 401 || error.response?.data.message === '401 Unauthorized') {
    await firebase.auth().signOut();
  }
  return Promise.reject(error);
}

export class HttpClient {
  private axios: AxiosInstance;

  constructor(private userStore: UserStore) {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
    this.axios.interceptors.response.use(response => response, errorInterceptor);
  }

  private appendAuthorization = async (config?: AxiosRequestConfig) => {
    const conf = config ?? {};
    const token = this.userStore.token;

    if (!token) {
      return conf;
    }

    if (!conf.headers) {
      conf.headers = {};
    }
    conf.headers['Authorization'] = `Bearer ${token}`;
    return conf;
  };

  public get = async <T = any>(uri: string, conf?: AxiosRequestConfig) =>
    this.axios.get<T>(uri, await this.appendAuthorization(conf));

  public post = async <T = any>(uri: string, data: any, conf?: AxiosRequestConfig) => {
    return this.axios.post<T>(uri, data, await this.appendAuthorization(conf));
  };

  public put = async <T = any>(uri: string, data: any, conf?: AxiosRequestConfig) => {
    return this.axios.put<T>(uri, data, await this.appendAuthorization(conf));
  };

  public patch = async <T = any>(uri: string, data: any, conf?: AxiosRequestConfig) => {
    return this.axios.patch<T>(uri, data, await this.appendAuthorization(conf));
  };

  public delete = async (uri: string, conf?: AxiosRequestConfig) =>
    this.axios.delete(uri, await this.appendAuthorization(conf));

  public createCancelTokenSrc = () => axios.CancelToken.source();
}

export const httpClient = new HttpClient(userStore);