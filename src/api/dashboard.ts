import { request } from './instance'
export class dashboard {
  static getWallet() {
    return request({
      method: 'GET',
      url: 'v1/dashboard/wallet',
    })
  }

  static getColleges() {
    return request({
      method: 'GET', 
      url: 'v1/dashboard/colleges',
    })
  }
}
