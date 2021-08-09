import firebase from 'firebase/app';
import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import { UserStore, userStore } from '../user/user.store';

type AuthApi = Pick<firebase.auth.Auth, 'onAuthStateChanged' | 'signOut' | 'currentUser'>;

export enum AuthState {
  Pending = 'Pending',
  SignedIn = 'SignedIn',
  SignedOut = 'SignedOut',
}

export class AuthStore {
  private pending = false;

  constructor(private authApi: AuthApi, private userStore: UserStore) {
    makeAutoObservable(this);
  }

  getIdToken = () => {
    return this.authApi.currentUser?.getIdToken();
  };

  getAuthState = (): AuthState => {
    const { userInfo, organizations } = this.userStore;

    if (this.pending) {
      return AuthState.Pending;
    }
    if (!!userInfo && !!organizations.length) {
      return AuthState.SignedIn;
    }
    return AuthState.SignedOut;
  };

  observeAuthState = () => {
    this.pending = true;

    return this.authApi.onAuthStateChanged(async user => {
      if (!!user) {
        await this.userStore.loadOrganizations();
      } else {
        this.userStore.clearOrganizations();
      }
      this.userStore.setUserInfo(user?.toJSON());
      this.pending = false;
    });
  };

  signOut = () => {
    localStorage.clear();
    this.authApi.signOut();
  };
}

export const authStore = new AuthStore(firebase.auth(), userStore);
export const authStoreContext = createContext(authStore);