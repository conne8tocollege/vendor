import { request } from './instance'

export class Colleges {
  static getAllColleges() {
    return request({
      method: 'GET',
      url: 'v1/colleges/all-colleges',
    })
  }

  static createCollege(payload: any) {
    return request({
      method: 'POST',
      url: 'v1/colleges/create',
      data: payload,
    })
  }

  static addCourse(collegeId: number, payload: any) {
    return request({
      method: 'POST',
      url: `v1/colleges/add-courses?collegeId=${collegeId}`,
      data: payload,
    })
  }

  static updateCollege(id: number, payload: any) {
    return request({
      method: 'PATCH',
      url: `v1/colleges/update/${id}`,
      data: payload,
    })
  }

  static updateCourse(id: number, payload: any) {
    return request({
      method: 'PATCH',
      url: `v1/colleges/update-courses/${id}`,
      data: payload,
    })
  }
}
