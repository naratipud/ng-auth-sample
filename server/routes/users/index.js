const users = require('express').Router();
const passport = require('passport');
require('../../config/passport')(passport);

const login = require('./login')
const signup = require('./signup');
const user = require('./user');

users.post('/login', login);
users.post('/signup', signup);
users.get('/user', passport.authenticate('jwt', { session: false}), user);

module.exports = users;