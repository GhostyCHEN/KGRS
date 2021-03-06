/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1614844590240_8969";

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: "121.4.120.180",
      // port
      port: "3306",
      // username
      user: "dgm",
      // password
      password: "ZXCasdqwe123!@#",
      // database
      database: "KGRS",
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ["http://127.0.0.1:3001", "http://127.0.0.1:3000"],
  };

  config.cors = {
    // origin: "http://127.0.0.1:3001",
    // origin: "http://localhost:3000",
    credentials: true, //允许Cook跨域
    allowMethods: "GET,HEAD.PUT,POST,DELETE,PATCH,OPTIONS",
  };

  return {
    ...config,
    ...userConfig,
  };
};
