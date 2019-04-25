export default function({ route, store, redirect }) {
  // 重定向到首页
  if (route.path === '/') redirect('/home')

  // 构建页面面包屑信息
  route.matched.forEach((s, i) => (s.meta = route.meta[i]))
}
