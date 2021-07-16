const db = require('../db');
const {Queries} = require('../db/queries');
const bcrypt = require('bcrypt');

module.exports.Customer = {

    getCustomers: async(req, res) => {
        const result = await db.query(Queries.GET_CUSTOMERS_QUERY)
        res.send(result.rows);
    },

    getProfile: async(req, res) =>{
        try {
            const result = await db.query(Queries.GET_PROFILE_QUERY, [req.user.customerId]);
            res.send(result.rows);
        } catch (error) {
            res.status(500).send({error:'user not found'})
        }
    },

    creatCustomer: async (req, res) => {
        try {
            let customer = req.body;
            for (const key in customer) {
                if(!req.body[key]){
                    return res.status(500).send({error: `${key} is missing`});
                }
            }
            // we made this way to not require the arrangement of params.
            const cryptedPass = await bcrypt.hash(customer.password, 10);
            customer = [customer.first_name, customer.last_name, customer.phon_number, customer.email, cryptedPass, customer.role];
            // console.log(customer);
            await db.query(Queries.INSERT_CUSTOMER_QUERY,customer);
            res.send({success:'true'});
        }catch (error) {
            res.status(500).send({error});
        }
    },
    updateCustomer: async(req, res) =>{
        try {
            let customer = req.body;
            for (const key in customer) {
                if(!req.body[key]){
                    return res.status(500).send({error: `${key} is missing`});
                }
            }
            customer = [customer.FIRST_NAME, customer.LAST_NAME, customer.PHON_NUMBER, customer.EMAIL];
            // console.log(customer)
            await db.query(Queries.UPDATE_CUSTOMER_QUERY,customer);
            return res.send({success:'true'});
        } catch (error) {
            console.log(error);
            return res.send({error});
        }
    },
    
    deleteCustomer: async(req, res) => {
        try {
            let customerId = req.params.id;
            await db.query(Queries.DELETE_CUSTOMER_QUERY, [customerId]);
            res.send({success: 'true'});
        } catch (error) {
            res.status(500).send({error});
        }
    }
}