import React, { useMemo, useEffect } from 'react'
import { datadogLogs } from '@datadog/browser-logs'

import { DATA_DOG_CLIENT_TOKEN, DATA_DOG_SITE, DATA_DOG_SERVICE_NAME } from '../../util/datadog'
import { DEV_MODE, VERSION } from '../../util/constants'

import Context from './Context'

interface Props {
  children: React.ReactNode
}

function DatadogLoggerProvider({ children }: Props) {
  const { logger } = datadogLogs

  useEffect(() => {
    datadogLogs.init({
      clientToken: DATA_DOG_CLIENT_TOKEN,
      site: DATA_DOG_SITE,
      service: DATA_DOG_SERVICE_NAME,
      forwardErrorsToLogs: false,
      sampleRate: 100,
      env: DEV_MODE ? 'Dev' : 'Prod',
      version: VERSION,
    })
  })

  const value = useMemo(
    () => ({
      debug: (message, context) => logger.debug(message, context),
      info: (message, context) => logger.info(message, context),
      warn: (message, context) => logger.warn(message, context),
      error: (message, context) => logger.error(message, context),
    }),
    [logger],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default DatadogLoggerProvider
