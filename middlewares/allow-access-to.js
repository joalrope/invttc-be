const {request, response} = require('express');

// middleware for doing role-based permissions
const allowAccessTo = (permittedRoles) => {
  
    return (req = request, res = response, next) => {
        
        try {
            if (permittedRoles.includes(req.role)) {
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
