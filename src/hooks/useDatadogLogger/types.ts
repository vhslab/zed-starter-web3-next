import type { Context } from '@datadog/browser-core'

export type loggerMethod = (message: string, messageContext?: Context) => void

export interface Logger {
  debug: loggerMethod
  info: loggerMethod
  warn: loggerMethod
  error: loggerMethod
}
