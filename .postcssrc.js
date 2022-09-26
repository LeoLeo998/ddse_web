// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    // to edit target browsers: use "browserslist" field in package.json
    'autoprefixer': {},
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
      // exclude: /emoji/i
    }
  }
}
