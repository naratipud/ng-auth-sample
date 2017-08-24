const mongoose = require('mongoose');
const passport = require('passport');
const config = require('../config/database');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("../models/user");
const Book = require("../models/book");

router.post('/signup', (req, res) => {
    if (!req.body.user.username || !req.body.user.password) {
        res.json({
            success: false,
            msg: 'Please pass username and password.'
        });
    } else {
        let newUser = new User({
            username: req.body.user.username,
            password: req.body.user.password
        });
        // save the user
        newUser.save((err) => {
            if (err) {
                return res.json({
                    success: false,
                    msg: 'Username already exists.'
                });
            }
            res.json({
                success: true,
                msg: 'Successful created new user.'
            });
        });
    }
});

router.post('/login', (req, res) => {
    // console.log('User: ', req.body.user);
    User.findOne({
        username: req.body.user.username
    }, (err, user) => {
        if (err) throw err;

        if (!user) {
            res.send({
                success: false,
                msg: 'Authentication failed. User not found.'
            });
        } else {
            // check if password matches
            user.comparePassword(req.body.user.password, (err, isMatch) => {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    let token = jwt.sign(user, config.secret);
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        user: {
                            username: user.username,
                            token: token
                        }
                    });
                } else {
                    res.send({
                        success: false,
                        msg: 'Authentication failed. Wrong password.'
                    });
                }
            });
        }
    });
});

router.post('/book', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    let token = getToken(req.headers);

    if (token) {
        console.log(req.body);
        let newBook = new Book({
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher
        });

        newBook.save((err) => {
            if (err) {
                return res.json({
                    success: false,
                    msg: 'Save book failed.'
                });
            }
            res.json({
                success: true,
                msg: 'Successful created new book.'
            });
        });
    } else {
        return res.status(403).send({
            success: false,
            msg: 'Unauthorized.'
        });
    }
});

router.get('/book', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    let token = getToken(req.headers);

    if (token) {
        Book.find((err, books) => {
            if (err) return next(err);
            res.json(books);
        });
    } else {
        return res.status(403).send({
            success: false,
            msg: 'Unauthorized.'
        });
    }
});

getToken =  (headers) => {
    if (headers && headers.authorization) {
        let parted = headers.authorization.split(' ');
        
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;