import firebase from 'firebase/app';
import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';

// import { OrganizationDto } from '@api/src/users/dto/organization.dto';
import { asWritable } from '../common/as-writable.util';
import { userService, UserService } from './user.service';

export class UserStore {
  readonly userInfo: Readonly<firebase.UserInfo> | null = null;
  readonly organizations: Readonly<any[]> = [];
  organizationError: string | null = null;

  constructor(private userService: UserService) {
    makeAutoObservable(this);
  }

  setUserInfo = (userInfo?: Record<string, any>) => {
    asWritable(this).userInfo = (userInfo ?? null) as firebase.UserInfo;
  };

  loadOrganizations = async () => {
    try {
      this.organizationError = null;
      const { data } = await this.userService.getOrg();
      asWritable(this).organizations = data;
    } catch ({ response }) {
      if (response.data) {
        this.organizationError = response.data.details.Authorization?.message;
      }
    }
  };

  clearOrganizations = () => {
    asWritable(this).organizations = [];
  };

  clearOrganizationError = () => {
    this.organizationError = null;
  };
}

export const userStore = new UserStore(userService);
export const userStoreContext = createContext(userStore);