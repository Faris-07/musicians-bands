const {Sequelize, sequelize} = require('./db');

// TODO - define the Band model
let Band = sequelize.define('Band', {
    name: {
        type: Sequelize.STRING
    },
    genre: {
        type: Sequelize.STRING
    },
    showCount: {
        type: Sequelize.INTEGER
    }
});

module.exports = {
    Band
};