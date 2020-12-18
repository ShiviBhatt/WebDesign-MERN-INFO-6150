'use strict';

module.exports = (app) => {
    const models = require('./models/indexModel'); // index Model
    const routes = require('./routes/indexRoute'); //  index Route
    routes(app);
};