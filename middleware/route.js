import { CHANGE_ACTIVE_MENU } from '../types/mutation-types'

export default function({ route, store, redirect }) {
  // 路由变化时 更新侧边栏的activeMenu
  store.commit(CHANGE_ACTIVE_MENU, route.name)

  // 重定向到首页
  if (route.path === '/') redirect('/home')

  // 构建页面面包屑信息
  route.matched.forEach((s, i) => (s.meta = route.meta[i]))
}
