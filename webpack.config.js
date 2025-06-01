// @ts-check

const path = require('path');

/**
 * Docusaurus webpack config customization
 * This will be merged with the default Docusaurus webpack configuration
 */
module.exports = function(context, options) {
  return {
    name: 'custom-webpack-config',
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          alias: {
            // Add path aliases for commonly used directories
            '@': path.resolve(__dirname, 'veritasvault-docs/src'),
            '@components': path.resolve(__dirname, 'veritasvault-docs/src/components'),
            '@theme': path.resolve(__dirname, 'veritasvault-docs/src/theme'),
            '@site': path.resolve(__dirname, 'veritasvault-docs'),
            '@ui': path.resolve(__dirname, 'veritasvault-docs/src/components/ui'),
            '@pages': path.resolve(__dirname, 'veritasvault-docs/src/pages'),
            '@lib': path.resolve(__dirname, 'veritasvault-docs/src/lib')
          }
        }
      };
    }
  };
};