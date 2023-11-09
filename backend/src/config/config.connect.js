const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  'interview',
  'root',
  '',
  {
    host: '127.0.0.1',
    dialect: 'mysql'
  }
);

async function connect() {
  await sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
}

module.exports = { connect};
