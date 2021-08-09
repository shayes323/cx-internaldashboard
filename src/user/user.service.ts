import { httpClient, HttpClient } from '../common/http-client';
import { AxiosResponse } from 'axios';
// import { OrganizationDto } from '@api/src/users/dto/organization.dto';

export class UserService {
  constructor(private httpClient: HttpClient) {}

  getOrg = (): Promise<AxiosResponse<any[]>> => this.httpClient.get('/users/me/org');
}

export const userService = new UserService(httpClient);