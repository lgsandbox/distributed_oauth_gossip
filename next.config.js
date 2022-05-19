module.exports = {
  exportTrailingSlash: true,
  reactStrictMode: false,
  exportPathMap: function() {
    return {
      '/': { page: '/' },
    }
    }
};