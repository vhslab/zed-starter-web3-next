import React, { useMemo, useEffect } from 'react'
import { datadogRum } from '@datadog/browser-rum'

import {
  DATA_DOG_SITE,
  DATA_DOG_RUM_APPLICATION_ID,
  DATA_DOG_CLIENT_TOKEN,
  DATA_DOG_SERVICE_NAME,
} from '../../util/datadog'
import { DEV_MODE, VERSION } from '../../util/constants'

import Context from './Context'
import { DatadogRumUser } from './types'

interface Props {
  children: React.ReactNode
}

function DatadogRumProvider({ children }: Props) {
  useEffect(() => {
    datadogRum.init({
      applicationId: DATA_DOG_RUM_APPLICATION_ID,
      clientToken: DATA_DOG_CLIENT_TOKEN,
      site: DATA_DOG_SITE,
      service: DATA_DOG_SERVICE_NAME,
      sampleRate: 20,
      env: DEV_MODE ? 'Dev' : 'Prod',
      version: VERSION,
    })
  })

  const value = useMemo(
    () => ({
      addTiming: (name: string, time?: number) => datadogRum.addTiming(name, time),
      setUser: (user: DatadogRumUser) => datadogRum.setUser(user),
      resetUser: () => datadogRum.removeUser(),
    }),
    [],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default DatadogRumProvider
