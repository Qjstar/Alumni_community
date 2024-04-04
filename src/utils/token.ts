// 封装本地存储数据与读取数据反复噶
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('storekey', token)
}

export const GET_TOKEN = () => {
  return localStorage.getItem('storekey')
}

export const REMOVE_TOKEN = () => {
  localStorage.removeItem('storekey')
}
