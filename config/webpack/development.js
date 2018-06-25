process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const environment = require('./environment');

let DashboardPlugin = require('webpack-dashboard/plugin');
environment.plugins.prepend('DashboardPlugin', new DashboardPlugin());

module.exports = environment.toWebpackConfig();
