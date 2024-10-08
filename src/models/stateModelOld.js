const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const State = sequelize.define('State', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
}, {
  timestamps: false,
});

module.exports = State;
