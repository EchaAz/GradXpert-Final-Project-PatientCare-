const express = require('express');
const app = express();
const path = require('path');
const sequelize = require('./seq');
const doctorRoutes = require('./routes/doctors');
const userRoutes = require('./routes/users');
const appointmentRoutes = require('./routes/appointments');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

app.use('/api/doctors', doctorRoutes);
app.use('/api/users', userRoutes)
app.use('/api/appointments', appointmentRoutes)

async function syncDatabase() {
    try {
      await sequelize.sync({ force: false });
      console.log('Database synced successfully');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  }
  
syncDatabase();

module.exports = {
  app: app,
  syncDatabase: syncDatabase
};

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, console.log(`Server is listening on port ${port}...`));
}


