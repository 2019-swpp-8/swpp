const merge = require('lodash/merge')

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV !== 'production',
    basename: process.env.PUBLIC_PATH,
    isBrowser: typeof window !== 'undefined',
    apiUrl: 'http://localhost:8000',
  },
  test: {},
  development: {},
  production: {
    basename: '/swpp',
    apiUrl: 'https://ldm2468.com/api',
  },
}

module.exports = merge(config.all, config[config.all.env])
