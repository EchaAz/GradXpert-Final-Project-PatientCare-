const Doctor = require('../models/doctors');
const { Op } = require('sequelize');

//Tambahin filter dan sorting, ini untuk main page jadis esuaikan kebutuhannya yang make dimana aja
// Dokumentasi masukin ke vs code di folder api.md agar tau end pointnya apa sama cara make nya
exports.getAllDoctors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    let sortQuery = [];
    if (req.query.sort === 'name') {
      sortQuery.push(['name', 'ASC']);
    }

    let filterQuery = {};
    if (req.query.name) {
      filterQuery.name = { [Op.iLike]: `%${req.query.name}%` };
    }
    if (req.query.speciality) {
      filterQuery.speciality = { [Op.iLike]: `%${req.query.speciality}%` };
    }

    const { count, rows: doctors } = await Doctor.findAndCountAll({
      where: filterQuery,
      offset,
      limit,
      order: sortQuery,
    });

    const totalPages = Math.ceil(count / limit);

    const pagination = {
      totalPages,
      currentPage: page,
      totalDoctors: count,
    };

    res.status(200).json({ doctors, pagination });
  } catch (error) {
    console.error('Error fetching all doctors:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};