const jwt = require('jsonwebtoken');
const pool = require('../config');

let superadmin = (req,res,next) => {
    
    let token = req.cookies.u_auth;

    if(!token) {
        return res.status(403).send({
            message: "No token provided"
        });
    }

    jwt.verify(token,'asd', (err,decode) => {
        if(err) throw err 
        const role = pool.query("SELECT * FROM users WHERE id = $1 RETURNING role",
        [decode], (err,res) => {
            if(err) throw err
        });

        if(role == 1) {
            next();
        }else {
            return res.status(404).send({
                message: "You're not allowed!"
            })
        }
        
    })
}

module.exports = superadmin;