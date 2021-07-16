const db = require('../db');
const {Queries} = require('../db/queries');
const jwt = require('../util/jwt');
const bcrypt = require('bcrypt');

module.exports = {


    signIn: async(req, res) => {
        try {

            const {email, password} = req.body;
            if(!email || !password){
                throw new Error({error:'username and password are wrong.'});
            }

            
            const result = await db.query(Queries.LOGIN_QUERY, [email]);
            const dbresult = result.rows[0];
            
            if(dbresult == null){
                return res.status(401).send({error: 'username or password are wrong'});
            }

            const isValidPass = await bcrypt.compare(password, dbresult.password);
            if(!isValidPass){
                return res.status(401).send({error: 'username or password are wrong'});
            }

            const token = jwt.generateToken({
                email:dbresult.email,
                role: dbresult.role,
                fullname: dbresult.full_name,
                customerId: dbresult.customer_id
            })
            res.send(JSON.stringify(token));
            
        } catch (error) {
            res.status(500).send({error});
        }
    }
    
}