const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) => {
    const { username, password } = req.body;
    const validationErrors = [];
    if (username == '' || username == null) {
        validationErrors.push('Username is required')
    }
    if (password == '' || password == null) {
        validationErrors.push('Password is required')
    }
    User.findOne({ username: username }, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user._id
                    res.redirect('/')
                } else {
                    error = validationErrors;

                    if (validationErrors.length == 0) {
                        error = ['Password is incorrect!'];
                    }
                    req.flash('validationErrors', error)
                    res.redirect('/auth/login')
                }
            })
        } else {
            if (validationErrors.length == 0) {
                validationErrors.push('Username  is incorrect!');
            }
            req.flash('validationErrors', validationErrors)
            res.redirect('/auth/login')
        }
    })
}