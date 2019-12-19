

module.exports = function(config) {
  config.addPassthroughCopy('assets');
  config.addPassthroughCopy('favicon.ico');

  config.addFilter('jsonify', (x) => JSON.stringify(x, null, 2));
  
  return config;
}
