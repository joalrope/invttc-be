const {request, response} = require('express');
const User = require('../models/User');

// middleware for doing role-based permissions
const allowAccessTo = (permittedRoles) => {
    // return a middleware
    return async (req = request, res = response, next) => {
        
        try {
            const user = await User.findById(req.uid);

            if (permittedRoles.includes(user.role)) {
                next(); // role is allowed, so continue on the next middleware
            } else {
                res.status(403).json({
                    // user 
                    ok: false,
                    msg: 'You do not have privileges to execute this operation',
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Please, talk to the administrator'
            });
        }
    }
}

module.exports = {
    allowAccessTo
}
