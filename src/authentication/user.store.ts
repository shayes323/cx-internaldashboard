import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import { OktaAuth, UserClaims } from '@okta/okta-auth-js';

export class UserStore {
  public userInfo: UserClaims | null = null;
  public oktaAuth: OktaAuth | null = null;
  public token: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public setUserInfo(info: UserClaims | null) {
    this.userInfo = info;
  }

  public setToken(token: string | null) {
    this.token = token;
  }

  public setOktaAuth(oktaAuth: OktaAuth | null) {
    this.oktaAuth = oktaAuth;
  }

  public signOut() {
    if (this.oktaAuth) {
      this.oktaAuth.signOut();
    }
  }
}

export const userStore = new UserStore();
export const userStoreContext = createContext(userStore);