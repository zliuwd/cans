process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')

environment.config.set('output.publicPath', '/cans/packs/')

module.exports = environment.toWebpackConfig()
