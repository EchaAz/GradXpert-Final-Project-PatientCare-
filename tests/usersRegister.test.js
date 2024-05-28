const request = require('supertest');
const jwt = require('jsonwebtoken');
const sequelize = require('../seq');
const { app, syncDatabase } = require('../app');
const User = require('../models/users'); 

const testUserEmails = []; 
beforeAll(async () => {
    await syncDatabase()
});

const email = `testuser@example.com`;
testUserEmails.push(email);
describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
        console.log("Halo Ya 1");
        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: `testuser`,
                email: email,
                password: 'password123',
                phoneNumber: '1234567890',
            });
            console.log("Halo Ya 2");
        console.log(response.body); 

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('User created successfully');
        expect(response.body).toHaveProperty('newUser');
        expect(response.body.newUser).toHaveProperty('id');
        expect(response.body.newUser.username).toBe('testuser');
    });

    it('should return 400 if email already exists', async () => {
        console.log("Halo Ya 3");
        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: `newuser`,
                email: email,
                password: 'password123',
                phoneNumber: '0987654321',
            });
            console.log("Halo Ya 4");
        console.log(response.body); 

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Email already exists');
    });

    it('should return 500 if there is an internal server error', async () => {
        jest.spyOn(User, 'findOne').mockImplementation(() => {
            throw new Error('Internal server error');
        });
        console.log("Halo Ya 6");
        const email = `error@example.com`;
        testUserEmails.push(email);

        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: `erroruser`,
                email: email,
                password: 'password123',
                phoneNumber: '1234567890',
            });
            console.log("Halo Ya 7");
        console.log(response.body);

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Internal server error');
    });
});

afterAll(async () => {
    console.log(testUserEmails);
    await User.destroy({ where: { email: testUserEmails } });
    await sequelize.close();
});
