export const actionToken = {
  setToken: (key: string, value: string) => {
    localStorage.setItem(key, value)
  },
  getToken: (key: string) => {
    return localStorage.getItem(key)
  }
}