require("dotenv").config();
var jwt = require('jsonwebtoken');


module.exports = {

    generateToken: (payload) => {
        return jwt.sign(payload, process.env.SECRET, {expiresIn:"7d"});
    },

    verifyToken: async (req, res, next)=>{
        try {
            const {token} = req.headers;
            if(!token){
                res.status(401).send({error:'unauthorized user'});
            }
            const payload = jwt.verify(token, process.env.SECRET);
            console.log(payload);
            req.user = payload;
            next();
            
        } catch (error) {
            res.status(401).send({error:'unauthorized user.'})
        }
    }
}