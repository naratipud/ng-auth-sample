const config = require('../../config/database');
const jwt = require('jsonwebtoken');
const User = require("../../models/user");

module.exports = (req, res) => {
    const token = getToken(req.headers);

    if (token) {
        const decoded = jwt.verify(token, config.secret);
        User.findOne({
            username: decoded.username
        }, (err, user) => {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({
                    success: false,
                    errors: {
                        'Authentication failed!': 'user not found'
                    }
                });
            } else {
                const newToken = jwt.sign(user, config.secret, { expiresIn: '1h' });
                res.json({
                    success: true,
                    msg: 'Welcome in the member area ' + user.username + '!',
                    user: {
                        username: user.username,
                        token: newToken
                    }
                });
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            errors: {
                '': 'No token provided'
            }
        });
    }
};

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