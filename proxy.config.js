const proxy = [
    {
      target: 'http://localhost:8080',
      secure: false,
      changeOrigin: true,
      logLevel: "debug"
    }
  ];
  module.exports = proxy;