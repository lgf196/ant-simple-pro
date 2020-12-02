import { Base64 } from 'js-base64'

const baseName = 'ant-simple-pro'
const TOKEN = `${baseName}-token`
const COLLAPSE = `${baseName}-collapse`
const REMEMBER_LOGIN_USER = `${baseName}-remember-user`
const TAG_NAV = `${baseName}-tag-nav`
const ACCESS_MENU = `${baseName}-access-menu`
const USERINFO = `${baseName}-userinfo`

const local = {
  get(key) {
    const encodeText = localStorage.getItem(key)
    if (!encodeText) {
      return null
    }
    try {
      const decodeText = Base64.decode(encodeText)
      return JSON.parse(decodeText)
    } catch (err) {
      console.log(err)
      localStorage.removeItem(key)
    }
  },
  set(key, value) {
    const encodeText = Base64.encode(JSON.stringify(value))
    return localStorage.setItem(key, encodeText)
  }
}

export const setToken = token => {
  return localStorage.setItem(TOKEN, token)
}

export const getToken = () => {
  return localStorage.getItem(TOKEN)
}

export const removeToken = () => {
  return localStorage.removeItem(TOKEN)
}
export const setCollapse = value => {
  return localStorage.setItem(COLLAPSE, value)
}
export const getCollapse = () => {
  return JSON.parse(localStorage.getItem(COLLAPSE))
}

export const setRememberUser = (data) => {
  return local.set(REMEMBER_LOGIN_USER, data)
}

export const getRememberUser = () => {
  return local.get(REMEMBER_LOGIN_USER)
}

export const removeRememberUser = () => {
  return localStorage.removeItem(REMEMBER_LOGIN_USER)
}

export const setTagNav = (data) => {
  return localStorage.setItem(TAG_NAV, JSON.stringify(data))
}

export const getTagNav = () => {
  try {
    const data = localStorage.getItem(TAG_NAV)
    return JSON.parse(data)
  } catch (err) {
    console.log(err)
    removeTagNav()
  }
}

export const removeTagNav = () => {
  return localStorage.removeItem(TAG_NAV)
}

export const setAccessMenus = (data) => {
  return localStorage.setItem(ACCESS_MENU, JSON.stringify(data))
}

export const getAccessMenus = () => {
  try {
    const data = localStorage.getItem(ACCESS_MENU)
    return JSON.parse(data)
  } catch (err) {
    console.log(err)
    removeAccessMenus()
  }
}

export const removeAccessMenus = () => {
  return localStorage.removeItem(ACCESS_MENU)
}

export const setUserInfo = (data) => {
  return localStorage.setItem(USERINFO, JSON.stringify(data))
}

export const getUserInfo = () => {
  try {
    const data = localStorage.getItem(USERINFO)
    return JSON.parse(data)
  } catch (err) {
    console.log(err)
    removeUserInfo()
  }
}

export const removeUserInfo = () => {
  return localStorage.removeItem(USERINFO)
}
