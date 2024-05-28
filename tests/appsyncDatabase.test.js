const { syncDatabase } = require('../app');
const sequelize = require('../seq');

beforeAll(async () => {
    await syncDatabase();
});

describe('syncDatabase', () => {
    it('should sync the database successfully', async () => {
        jest.spyOn(sequelize, 'sync').mockResolvedValueOnce();

        console.log = jest.fn();
        await syncDatabase();

        expect(sequelize.sync).toHaveBeenCalledWith({ force: false });
        expect(console.log).toHaveBeenCalledWith('Database synced successfully');
    });

    it('should log an error if syncing the database fails', async () => {
        const error = new Error('Sync failed');
        jest.spyOn(sequelize, 'sync').mockRejectedValueOnce(error);

        console.error = jest.fn();
        await syncDatabase();

        expect(sequelize.sync).toHaveBeenCalledWith({ force: false });
        expect(console.error).toHaveBeenCalledWith('Error syncing database:', error);
    });
});

afterAll(async () => {
    await sequelize.close();
});
