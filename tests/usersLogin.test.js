const request = require('supertest');
const jwt = require('jsonwebtoken');
const sequelize = require('../seq');
const { app, syncDatabase } = require('../app');
const User = require('../models/users'); 

beforeAll(async () => {
    await syncDatabase()
});
describe('POST /api/users/login', () => {
    it('should login a user with valid credentials', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                emailOrUsername: 'Hina',
                password: 'PrefectTeam1111'
            });

        // console.log('======================>',response.body);  

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
        const decodedToken = jwt.verify(response.body.token, process.env.JWT_SECRET);
        expect(decodedToken).toHaveProperty('userId');
    });

    it('should return 404 if user is not found', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                emailOrUsername: `NoAccount`,
                password: 'PrefectTeam1111',
            });

        // console.log('OOOOOOOOOOOOOOOOOOOOOOO>',response.body);  

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('User not found');
    });

    it('should return 401 if password is invalid', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                emailOrUsername: 'Hina',
                password: '12345678'
            });

        // console.log('iiiiiiiiiiiiiiiiiiiiiiii>', response.body);

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Invalid password');
    });

    it('should return 500 if there is an internal server error', async () => {
        jest.spyOn(User, 'findOne').mockImplementation(() => {
            throw new Error('Internal server error');
        });

        const response = await request(app)
            .post('/api/users/login')
            .send({
                emailOrUsername: 'Hina',
                password: 'PrefectTeam1111',
            });

        // console.log('wwwwwwwwwwwwwwwwwwww>', response.body); 

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Internal server error');
    });
});

afterAll(async () => {
    await sequelize.close();
});
