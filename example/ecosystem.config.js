module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : 'PRIVATE-API',
      script    : './private-api/src/index.js',
    },
    {
      name      : 'REST-API',
      script    : './rest-api/index.js'
    }
  ]
};
