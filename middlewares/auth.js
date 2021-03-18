const jwt = require('jsonwebtoken');
const pool = require('../config');

let auth = (req,res,next) => {
    // login esnasında cookie's e yolladığımız token'ı aldık.
    let token = req.cookies.u_auth;

    if(!token) {
        return res.status(403).send({
            message: "No token provided"
        });
    }

    /* kullanıcının token'ı değiştirme ihtimaline karşın, token'ın içerisine 
        gizlenmiş olan id ve o id'nin sahip olduğu token ile mevcut token 
        karşılaştırlır. Buna göre auth durumu sorgulanır.
    */
    jwt.verify(token, 'asd', (err,decode) => {
        pool.query("SELECT id = $ FROM users WHERE token = $2", [decode, token], (err,res) => {
            if(err) return err
        })
        next();
        
    })
}

module.exports = auth;