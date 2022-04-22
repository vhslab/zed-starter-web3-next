import type { User } from '@datadog/browser-rum-core/cjs/rawRumEvent.types'

export type DatadogRumUser = User

export interface RumProvider {
  addTiming: (name: string, time?: number) => void
  setUser: (user: DatadogRumUser) => void
  resetUser: () => void
}
