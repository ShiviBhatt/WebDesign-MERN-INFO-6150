'use strict';

const userRoute = require('./../routes/userRoute'); // user Route
// App call
module.exports = (app) => {
    userRoute(app);
};