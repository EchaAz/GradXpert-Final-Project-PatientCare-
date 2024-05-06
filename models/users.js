const { DataTypes } = require('sequelize');
const sequelize = require('../seq');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: true,
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
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Password is required.'
      },
      len: {
        args: [5, Infinity],
        msg: 'Password must be at least 5 characters long.'
      }
    }
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true, 
    validate: {
      isPhoneNumber(value) {
        if (value && !/^\+?\d{7,15}$/.test(value)) {
          throw new Error('Invalid phone number.');
        }
      }
    }
  }
});

module.exports = User;
