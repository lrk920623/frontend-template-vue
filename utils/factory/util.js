export function timeFix() {
  const hour = new Date().getHours()
  return hour < 12 ? '上午好' : hour < 20 ? '下午好' : '晚上好'
}
