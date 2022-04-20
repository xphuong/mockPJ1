const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const questionRoute = require('./question.route');
const playRoute = require('./play.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/users',
        route: userRoute,
    },
    {
        path: '/question',
        route: questionRoute,
    },
    {
        path: '/play',
        route: playRoute,
    },
];


defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});


module.exports = router;
