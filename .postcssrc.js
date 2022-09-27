// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    // to edit target browsers: use "browserslist" field in package.json
    autoprefixer: {
      overrideBrowserslist: ['Android 4.1', 'IOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
    },
    'postcss-pxtorem': {
      rootValue: 16,
      propList: ['*'],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
      // exclude: /emoji/i
    }
  }
}
