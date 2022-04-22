import { version } from '../../package.json'

export const DEV_MODE = process.env.NODE_ENV === 'development'
export const VERSION = version
