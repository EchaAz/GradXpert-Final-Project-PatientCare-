const { DataTypes } = require('sequelize');
const sequelize = require('../seq');

const Appointment = sequelize.define('Appointment', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Doctors',
      key: 'id'
    }
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Appointment time is required.'
      },
      isFutureDate(value) {
        if (value <= new Date()) {
          throw new Error('Appointment time must be in the future.');
        }
      }
    }
  },
  description: DataTypes.TEXT
});

module.exports = Appointment;
