import instance, { request } from './instance'

interface AuthResponse {
  id: number
  name: string
  phone: string
  email: string
  isActive: boolean
  role: string[]
  access_token: string
  refresh_token: string
}
export class Auth {
  static login(email: string, password: string) {
    return instance.post<AuthResponse>(`/v1/auth/sign-in`, { email, password })
  }

  static logout() {
    return request({
      method: 'post',
      url: 'v1/auth/logout',
    })
  }

  static getCurrentUser() {
    return instance.get('v1/user/me')
  }
}
