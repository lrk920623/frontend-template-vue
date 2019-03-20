import { getSession } from 'utils/storage'
import { user } from 'utils/constant'

export default ({ app }) => {
  // 判断是否有token，若有则可以访问否则跳转到/login
  app.router.beforeEach((to, from, next) => {
    const token = getSession(user.token)

    if (to.fullPath === '/login') {
      next()
    } else {
      if (!!token) {
        next()
      } else {
        next('/login')
      }
    }
  })
}
