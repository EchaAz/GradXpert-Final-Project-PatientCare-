const { DataTypes } = require('sequelize');
const sequelize = require('../seq');

const Doctor = sequelize.define('Doctor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Name is required.'
      }
    }
  },
  speciality: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Speciality is required.'
      }
    }
  },
  practiceAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Practice address is required.'
      }
    }
  },
  phone: {
    type: DataTypes.STRING,
    validate: {
      is: /^\+?\d{7,15}$/,
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: 'Email is required.'
      },
      isEmail: {
        msg: 'Invalid email format.'
      }
    }
  },
  schedule: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Schedule is required.'
      }
    }
  }
});

module.exports = Doctor;
