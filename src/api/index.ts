import { Auth } from './auth'
import { Colleges } from './colleges'
import { dashboard } from './dashboard'
import { Users } from './users'
const allService: { [x: string]: any } = {
  Auth,
  Users,
  dashboard,
  Colleges,
}

export { allService, Auth, Users, dashboard, Colleges }
