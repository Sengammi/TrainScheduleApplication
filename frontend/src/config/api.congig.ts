export const API_URL = `${process.env.APP_URL}/api`
export const API_SERVER_URL = `${process.env.APP_SERVER_URL}/api`

export const getAuthUrl = (strings: string) => `/auth/${strings}`
export const getUsersUrl = (strings: string) => `/users/${strings}`
export const getTrainsUrl = (strings: string) => `/trains/${strings}`
export const getRoutesUrl = (strings: string) => `/routes/${strings}`