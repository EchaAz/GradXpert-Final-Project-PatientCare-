const request = require('supertest');
const jwt = require('jsonwebtoken');
const sequelize = require('../seq');
const { app, syncDatabase } = require('../app');
const Doctor = require('../models/doctors');

beforeAll(async () => {
    await syncDatabase();
});

describe('GET /api/doctors', () => {
    it('should fetch all doctors with pagination', async () => {
        const response = await request(app)
            .get('/api/doctors')
            .query({ page: 1, limit: 5 });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('doctors');
        expect(response.body).toHaveProperty('pagination');
        expect(response.body.pagination).toHaveProperty('totalPages');
        expect(response.body.pagination).toHaveProperty('currentPage');
        expect(response.body.pagination.currentPage).toBe(1);
    });

    it('should fetch all doctors with name filter', async () => {
        const response = await request(app)
            .get('/api/doctors')
            .query({ name: 'Mine' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('doctors');
        expect(response.body.doctors).toBeInstanceOf(Array);
        response.body.doctors.forEach(doctor => {
            expect(doctor.name).toMatch(/Mine/);
        });
    });

    it('should fetch all doctors with speciality filter', async () => {
        const response = await request(app)
            .get('/api/doctors')
            .query({ speciality: 'Cardiology' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('doctors');
        expect(response.body.doctors).toBeInstanceOf(Array);
        response.body.doctors.forEach(doctor => {
            expect(doctor.speciality).toMatch(/Cardiology/i);
        });
    });

    it('should fetch all doctors with sorting by name', async () => {
        const response = await request(app)
            .get('/api/doctors')
            .query({ sort: 'name' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('doctors');
        expect(response.body.doctors).toBeInstanceOf(Array);
        let previousName = '';
        response.body.doctors.forEach(doctor => {
            expect(doctor.name >= previousName).toBeTruthy();
            previousName = doctor.name;
        });
    });

    it('should return 500 if there is an internal server error', async () => {
        jest.spyOn(Doctor, 'findAndCountAll').mockImplementation(() => {
            throw new Error('Internal server error');
        });

        const response = await request(app)
            .get('/api/doctors')
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Internal server error');
    });
});

describe('GET /api/doctors/:id', () => {
    it('should fetch a doctor by ID', async () => {
        const response = await request(app)
            .get('/api/doctors/1')
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toBe(1);
    });

    it('should return 404 if doctor is not found', async () => {
        const response = await request(app)
            .get('/api/doctors/9999')
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Doctor not found');
    });

    it('should return 500 if there is an internal server error', async () => {
        jest.spyOn(Doctor, 'findByPk').mockImplementation(() => {
            throw new Error('Internal server error');
        });

        const response = await request(app)
            .get('/api/doctors/1')
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Internal server error');
    });
});

afterAll(async () => {
    await sequelize.close();
});
