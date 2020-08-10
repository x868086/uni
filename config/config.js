const path = require('path');

const apiDirectory = path.resolve(__dirname, '../app/api');

const environment = {
  env: process.env.NODE_ENV || 'development',
};

const dbconfig = {
  database: 'uni',
  username: 'root',
  password: 'admin',
  host: environment.env === 'development' ? '192.168.189.8' : '192.168.189.8',
  port: '3306',
  dialect: 'mysql',
};

// const dbconfig = {
//   database: 'uni',
//   username: 'root',
//   password: 'Wrnmmp6666',
//   host:
//     environment.env === 'development'
//       ? 'cdb-iqrua1t7.gz.tencentcdb.com'
//       : '192.168.189.8',
//   port: '10016',
//   dialect: 'mysql',
// };

const tokenSecurity = {
  secret:
    environment.env === 'development'
      ? 'NEYKR37jCFEH0o5tsbmxvemR7KQv3oZY0yAoa'
      : 'dW5pY21zc3lzdGVtKioqa',
  accessExpiresIn: environment.env === 'development' ? '8h' : '2h',
  refreshExpiresIn: environment.env === 'development' ? '1 days' : '8h',
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
