const Appointment = require('../models/appointments')

exports.createAppointment = async (req, res) => {
    try {
        const { userId, doctorId, time, description } = req.body;
            const newAppointment = await Appointment.create({
            userId,
            doctorId,
            time,
            description
        });
        return res.status(201).json({
                message: 'Appointment created successfully',
                newAppointment
              });
    } catch (error) {
        // console.error(error)
        // console.error(error.name)
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

exports.getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
        // console.log(error.message);
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json({ appointment });
    } catch (error) {
        // console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        await appointment.destroy();
        return res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findByPk(id);
        if(!appointment) {
            return res.status(404).json({error: 'Appointment not found'})
        } else {
            const { userId, doctorId, time, description } = req.body;
            await appointment.update({
            userId,
            doctorId,
            time,
            description
        });
        }
        return res.status(200).json({
            statusCode: 200,
            message: 'Appointment updated successfully'
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = process.env;
// const Appointment = require('../models/appointments');

// // Middleware function to check authorization token
// const authorizeToken = (req, res, next) => {
//     const token = req.headers.authorization;
//     if (!token) {
//         return res.status(403).json({ error: 'Authorization token is required' });
//     }

//     try {
//         const decodedToken = jwt.verify(token, JWT_SECRET);
//         req.userId = decodedToken.userId;
//         next();
//     } catch (error) {
//         return res.status(403).json({ error: 'Invalid or expired token' });
//     }
// };

// exports.createAppointment = async (req, res) => {
//     try {
//         authorizeToken(req, res, async () => {
//             const { userId, doctorId, time, description } = req.body;
//             const newAppointment = await Appointment.create({
//                 userId,
//                 doctorId,
//                 time,
//                 description
//             });
//             return res.status(201).json({
//                 message: 'Appointment created successfully',
//                 newAppointment
//             });
//         });
//     } catch (error) {
//         console.error(error)
//         console.error(error.name)
//         if (error.name === 'SequelizeValidationError') {
//             return res.status(400).json({ error: error.message });
//         } else {
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//     }
// };

// exports.getAppointmentById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const appointment = await Appointment.findByPk(id);
//         if (!appointment) {
//         // console.log(error.message);
//             return res.status(404).json({ error: 'Appointment not found' });
//         }
//         res.status(200).json({ appointment });
//     } catch (error) {
//         // console.log(error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// exports.deleteAppointmentById = async (req, res) => {
//     try {
//         authorizeToken(req, res, async () => {
//         const { id } = req.params;
//         const appointment = await Appointment.findByPk(id);
//         if (!appointment) {
//             return res.status(404).json({ error: 'Appointment not found' });
//         }
//         await appointment.destroy();
//         return res.status(200).json({ message: 'Appointment deleted successfully' });
//     });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// exports.updateAppointment = async (req, res) => {
//     try {
//         authorizeToken(req, res, async () => {
//         const { id } = req.params;
//         const appointment = await Appointment.findByPk(id);
//         if(!appointment) {
//             return res.status(404).json({error: 'Appointment not found'})
//         } else {
//             const { userId, doctorId, time, description } = req.body;
//             await appointment.update({
//             userId,
//             doctorId,
//             time,
//             description
//         });
//         }
//         return res.status(200).json({
//             statusCode: 200,
//             message: 'Appointment updated successfully'
//         })
//     });
//     } catch (error) {
//         // console.log(error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };