const passport = require('passport');
require('../config/passport')(passport);
const booksRouter = require('express').Router();
const Book = require("../models/book");

booksRouter.post('/book', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const token = getToken(req.headers);

    if (token) {
        console.log(req.body);
        const newBook = new Book({
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher
        });

        newBook.save((err) => {
            if (err) {
                return res.json({
                    success: false,
                    errors: {
                        'Save': 'book failed'
                    }
                });
            }
            res.json({
                success: true,
                msg: 'Successful created new book.'
            });
        });
    } else {
        return res.status(401).send({
            success: false,
            errors: {
                '401': 'Unauthorized'
            }
        });
    }
});

booksRouter.get('/book', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const token = getToken(req.headers);

    if (token) {
        Book.find((err, books) => {
            if (err) return next(err);
            res.json(books);
        });
    } else {
        return res.status(401).send({
            success: false,
            errors: {
                '401': 'Unauthorized'
            }
        });
    }
});

getToken = headers => {
    if (headers && headers.authorization) {
        const parted = headers.authorization.split(' ');

        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = booksRouter;