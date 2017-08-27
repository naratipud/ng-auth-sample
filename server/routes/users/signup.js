const config = require('../../config/database');
const jwt = require('jsonwebtoken');
const User = require("../../models/user");

module.exports = (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(403).json({
            success: false,
            errors: {
                '': 'Please pass username and password'
            }
        });
    } else {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
        // save the user
        newUser.save((err) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    errors: {
                        'Username': 'already exists'
                    }
                });
            }

            const token = jwt.sign(newUser, config.secret, { expiresIn: '1h' });
            res.json({
                success: true,
                user: {
                    username: newUser.username,
                    token: token
                }
            });
        });
    }
};