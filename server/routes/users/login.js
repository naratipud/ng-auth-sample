const config = require('../../config/database');
const jwt = require('jsonwebtoken');
const User = require("../../models/user");

module.exports = (req, res) => {
    // console.log('User: ', req.body.user);
    User.findOne({
        username: req.body.username
    }, (err, user) => {
        if (err) throw err;

        if (!user) {
            res.status(404).send({
                success: false,
                errors: {
                    'Email': 'not found'
                }
            });
        } else {
            // check if password matches
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    const token = jwt.sign(user, config.secret, { expiresIn: '1h' });
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        user: {
                            username: user.username,
                            token: token
                        }
                    });
                } else {
                    res.status(403).send({
                        success: false,
                        errors: {
                            'Email or password': 'is invalid'
                        }
                    });
                }
            });
        }
    });
};