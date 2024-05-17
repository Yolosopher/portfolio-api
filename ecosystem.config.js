module.exports = {
  apps: [
    {
      name: "PORTFOLIO-API",
      script: "node ./dist/server.js",
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
