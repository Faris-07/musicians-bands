const {sequelize} = require('./db');
const {Band, Musician} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        await Band.create({name: 'test band name', genre: 'test genre', showCount: 1})
        testBand = await Band.findOne({where: {name: 'test band name'}})
        expect(testBand).toBeInstanceOf(Band);
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        await Musician.create({name: 'test musician name', instrument: 'test instrument'})
        testMusician = await Musician.findOne({where: {name: 'test musician name'}})
        expect(testMusician).toBeInstanceOf(Musician);
    })

    test('can add multiple musicians to a band', async () => {
        const newBand = await Band.create({name: 'OVO', genre: 'RnB', showCount: 30});
        const newMusician1 = await Musician.create({name: 'Drake', instrument: 'Voice'});
        const newMusician2 = await Musician.create({name: 'Dude', instrument: 'Voice'});
        await newBand.addMusician(newMusician1);
        await newBand.addMusician(newMusician2);
        const bandWithMusicians = await Musician.findAll( { where: { name: 'OVO' } });
        expect(bandWithMusicians[0].name).toBe('Drake');
        expect(bandWithMusicians[1].name).toBe('Dude');
    })
})