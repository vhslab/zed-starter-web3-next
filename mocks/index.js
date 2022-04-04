if (typeof window === 'undefined') {
  const { server } = require('./server') // eslint-disable-line no-undef, @typescript-eslint/no-var-requires
  server.listen()
} else {
  const { worker } = require('./browser') // eslint-disable-line no-undef, @typescript-eslint/no-var-requires
  worker.start()
}
