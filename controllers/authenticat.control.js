const db = require('../db');
const {Queries} = require('../db/queries');
const jwt = require('../util/jwt');
const bcrypt = require('bcrypt');
const {Api401Error, Api404Error} = require('../models/errors/errors');

module.exports = {


    signIn: async(req, res, next) => {
        try {

            const {email, password} = req.body;
            if(!email || !password){
                throw new Api404Error({error:'username and password are wrong.'});
            }

            const result = await db.query(Queries.LOGIN_QUERY, [email]);
            const dbresult = result.rows[0];
            
            if(dbresult == null){
                throw new Api401Error( 'username or password are wrong')
            }

            const isValidPass = await bcrypt.compare(password, dbresult.password);
            if(!isValidPass){
                throw new Api401Error( 'username or password are wrong')
            }

            const token = jwt.generateToken({
                email:dbresult.email,
                role: dbresult.role,
                fullname: dbresult.full_name,
                customerId: dbresult.customer_id
            })
            res.send(JSON.stringify(token));
            
        } catch (error) {
            next(error);
        }
    }
    
}