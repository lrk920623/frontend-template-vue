export function setSession(key, data) {
  if (!key) return

  const filter = JSON.stringify(data)
  sessionStorage.setItem(key, filter)
}

export function getSession(key, isRemove) {
  if (!key) return

  const filter = sessionStorage.getItem(key)
  if (filter) {
    if (isRemove) sessionStorage.removeItem(key)

    return JSON.parse(filter)
  }
  return ''
}

export function setLocal(key, data) {
  if (!key) return

  const filter = JSON.stringify(data)
  localStorage.setItem(key, filter)
}

export function getLocal(key, isRemove) {
  if (!key) return

  const filter = localStorage.getItem(key)

  if (filter) {
    if (isRemove) removeLocal(key)

    return JSON.parse(filter)
  }
  return ''
}

export function removeLocal(key) {
  localStorage.removeItem(key)
}

export function removeSession(key) {
  sessionStorage.removeItem(key)
}
