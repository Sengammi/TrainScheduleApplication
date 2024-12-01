export const accentColor = '#3AAFA9'
export const bgColor = '#FFFFFF'


export const IS_SERVER = typeof window === 'undefined'
export const IS_CLIENT = typeof window !== 'undefined'

export const IS_PRODUCTION = process.env.APP_ENV === 'production'
