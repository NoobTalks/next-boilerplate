// @ts-check

const path = require('path');
const { i18n } = require('./next-i18next.config')


/**
* @type {import('next/dist/next-server/server/config').NextConfig}
**/
module.exports = {
  i18n,
  sassOptions: {
    includePaths: [path.resolve(__dirname, 'scss')]
  },
  webpack: (config) => {
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === 'object')
      .oneOf.filter((rule) => Array.isArray(rule.use));

    rules.forEach((rule) => {
      rule.use.forEach((moduleLoader) => {
        if (
          moduleLoader.loader.includes('css-loader/dist') &&
          typeof moduleLoader.options.modules === 'object'
        ) {
          moduleLoader.options = {
            ...moduleLoader.options,
            modules: {
              ...moduleLoader.options.modules,
              exportLocalsConvention: 'camelCase'
            }
          };
        }
      });
    });

    return config;
  }
};
