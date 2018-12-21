const { getPolyfillString } = require("polyfill-service");

module.exports.fill = ({ uaString, cache }) =>
  getPolyfillString({
    uaString,
    minify: cache,
    features: {
      "default-3.6": {},
      es6: {},
      es7: {}
    },
    unknown: "polyfill"
  });
