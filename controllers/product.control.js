const db = require('../db');
const {Queries} = require('../db/queries');
const {Api404Error} = require('../models/errors/errors');

module.exports.Product = {
    
    getproducts: async(req, res, next) => {
        try {
            const result = await db.query(Queries.GET_PRODUCTS_QUERY)
            res.send(result.rows);
        } catch (error) {
            next(error)   
        }
    },

    creatproduct: async(req, res, next) => {
        try {
            let product = req.body;
            product = [product.product_name, product.unit, product.price_per_unit, product.description, product.product_code, product.category_id]
            await db.query(Queries.INSERT_PRODUCT_QUERY,product);
            res.send({success:'true'});
        }catch (error) {
            next(error)   
        }
    },

    updateProduct: async(req, res, next) => {
        try {
            let product = req.body;
            for (const key in product) {
                if(!product[key]){
                    throw new Error(`${key} is missing`);
                }
            }
            const product_id = req.params.id;
            product = [product.product_name, product.unit, product.price_per_unit, product.description, product.product_code, product.category_id, product_id]
            const result = await db.query(Queries.UPDATE_PRODUCT_QUREY, product);
            if(!result.rowCount){
                throw new Api404Error(`pleas enter right category id`)
            }
            res.send({success:'true'});
        } catch (error) {
            next(error)   
        }
    },

    deleteProduct: async(req, res, next) => {
        try {
            const product_id = req.params.id;
            const result = await db.query(Queries.DELETE_PRODUCT_QUREY, [product_id]);
            if(!result.rowCount){
                throw new Api404Error(`pleas enter right category id`)
            }
            res.send({success:'true'});
        } catch (error) {
            next(error)    
        }
    }
}