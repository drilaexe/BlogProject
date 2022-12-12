const User = require('../models/User');

module.exports = (req, res, next) => {
    User.findById(req.session.userId, (error, user) => {
        console.log(error, user)
        console.log('--')
        if (error || !user) 
            return res.redirect('/');
        next()
    });
}