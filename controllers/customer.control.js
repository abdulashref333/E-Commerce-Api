const db = require('../db');
const {Queries} = require('../db/queries');
const bcrypt = require('bcrypt');
const {Api404Error, Api500Error} = require('../models/errors/errors');

module.exports.Customer = {

    getCustomers: async(req, res, next) => {
        try {
            const result = await db.query(Queries.GET_CUSTOMERS_QUERY)
            res.send(result.rows);
        } catch (error) {
            next(error)   
        } 
    },

    getProfile: async(req, res, next) =>{
        try {

            const result = await db.query(Queries.GET_PROFILE_QUERY, [req.user.customerId]);
            if(result == null){
                throw new Api500Error('Wrong User Id.');
            }

            req.user = {...req.user, ...result.rows[0]};
            res.send({user:req.user});
        } catch (error) {
            next(error);
        }
    },

    creatCustomer: async(req, res, next) => {
        try {

            let customer = req.body;
            for (const key in customer) {
                if(!req.body[key]){
                    throw new Api500Error( `${key} is missing`)
                }
            }
            // we made this way to not require the arrangement of params.
            const cryptedPass = await bcrypt.hash(customer.password, 10);
            customer = [customer.first_name, customer.last_name, customer.phon_number, customer.email, cryptedPass, customer.role];
            
            const result = await db.query(Queries.INSERT_CUSTOMER_QUERY,customer);
            if(!result){
                throw new Api500Error( `Internal Server Error, Please try again`);
            }

            res.send({success:'true'});
        }catch (error) {
            next(error);
        }
    },
    updateCustomer: async(req, res, next)=>{
        try {
            let customer = req.body;
            for (const key in customer) {
                if(!req.body[key]){
                    return res.status(500).send({error: `${key} is missing`});
                }
            }

            customer = [customer.FIRST_NAME, customer.LAST_NAME, customer.PHON_NUMBER, customer.EMAIL];
            // console.log(customer)

            const result = await db.query(Queries.UPDATE_CUSTOMER_QUERY,customer);
            if(!result){
                throw new Api404Error( `Wrong Email Adress, Please try again`);
            }

            return res.send({success:'true'});
        } catch (error) {
            next(error);
        }
    },
    
    deleteCustomer: async(req, res, next) => {
        try {
            let customerId = req.params.id;
            const result = await db.query(Queries.DELETE_CUSTOMER_QUERY, [customerId]);

            if(!result){
                throw new Api404Error( `User Not Found`);
            }

            res.send({success: 'true'});
        } catch (error) {
            next(error);
        }
    }
}