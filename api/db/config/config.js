module.exports = {
  // development: {
  //   use_env_variable: "elephant_url",
  // },
  development: {
    username: "postgres",
    password: null,
    database: "node_sequelize",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "postgres",
    password: null,
    database: "node_sequelize",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "postgres",
    password: null,
    database: "node_sequelize",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
