const db = require('../db');
const {Queries} = require('../db/queries');
const _ = require('underscore');

module.exports.Product = {
    getproducts: async(req, res) => {
        const result = await db.query(Queries.GET_PRODUCTS_QUERY)
        res.send(result.rows);
    },
    creatproduct: async (req, res) => {
        try {
            const product = _.values(req.body).map(val => val.length? val:null);
            console.log(product);
            // return;
            const result = await db.query(Queries.INSERT_PRODUCT_QUERY,product);
            res.send({success:'true'});

        }catch (error) {
            res.send({error})
        }
    }
}