const path = require('path');

const apiDirectory = path.resolve(__dirname, '../app/api');

const environment = {
  env: process.env.NODE_ENV || 'production', //development production
};

// const dbconfig = {
//   database: 'uni',
//   username: 'root',
//   password: 'admin',
//   host: environment.env === 'development' ? '192.168.189.8' : '192.168.189.8',
//   port: '3306',
//   dialect: 'mysql',
// };

const dbconfig = {
  database: 'uni',
  username: 'root',
  password: environment.env === 'production' ? 'Wrnmmp6666' : 'admin',
  host:
    environment.env === 'production'
      ? 'cdb-iqrua1t7.gz.tencentcdb.com'
      : '192.168.189.8',
  port: environment.env === 'production' ? '10016' : '3306',
  dialect: 'mysql',
};

const tokenSecurity = {
  secret:
    environment.env === 'production'
      ? 'dW5pY21zc3lzdGVtKioqa'
      : 'NEYKR37jCFEH0o5tsbmxvemR7KQv3oZY0yAoa',
  accessExpiresIn: environment.env === 'production' ? '2h' : '8h',
  refreshExpiresIn: environment.env === 'production' ? '8h' : '1 days',
};

// const tokenSecurity = {
//   secret:
//     environment.env === 'development'
//       ? 'NEYKR37jCFEH0o5tsbmxvemR7KQv3oZY0yAo'
//       : 'dW5pY21zc3lzdGVtKioq',
//   accessExpiresIn: environment.env === 'development' ? 10 : '2h',
//   refreshExpiresIn: 30,
// };

const smsExpireTime = {
  expire: 5 * 60 * 1000,
};

module.exports = {
  apiDirectory,
  environment,
  dbconfig,
  tokenSecurity,
  smsExpireTime,
};
