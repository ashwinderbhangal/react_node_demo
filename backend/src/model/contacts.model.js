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
const Contacts = sequelize.define(
  "contacts",
  {
    // attributes
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: Sequelize.STRING,

      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,

      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,

      allowNull: false,
    },
    country: {
      type: Sequelize.STRING,

      allowNull: true,
    },
    about: {
      type: Sequelize.STRING,

      allowNull: true,
    }
  },
  {
    // options
  }
);

Contacts.sync({ force: false });
module.exports = { Contacts };