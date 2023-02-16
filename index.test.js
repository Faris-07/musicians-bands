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

    test('can create a Song', async () => {
        const newSong = await Song.create({title: 'Pipe Down', year: 2021})
        const findSong = await Song.findByPk(newSong.id);
        expect(findSong.title).toBe('Pipe Down');
        expect(findSong.year).toBe(2021);
    })

    test('can add multiple songs to a band', async () => {
        const newBand = await Band.create({name: 'OVO', genre: 'RnB', showCount: 30});
        const newSong1 = await Song.create({title: 'Pipe Down', year: 2021});
        const newSong2 = await Song.create({title: 'Fair Trade', year: 2021});
        const newSong3 = await Song.create({title: 'N 2 Deep', year: 2021});
        await newBand.addSong(newSong1);
        await newBand.addSong(newSong2);
        await newBand.addSong(newSong3);
        const bandSongs = await Song.findAll( { where: { bandId: newBand.id } } );
        expect(bandSongs[0].title).toBe('Pipe Down');
        expect(bandSongs[1].title).toBe('Fair Trade');
        expect(bandSongs[2].title).toBe('N 2 Deep');
    })
})