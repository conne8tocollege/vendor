import { request } from './instance'

export class Users {
  static async currentUser() {
    return request({
      method: 'GET',
      url: 'v1/users/me',
    })
  }
}
