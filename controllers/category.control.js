const db = require('../db');
const {Queries} = require('../db/queries');
const {Api404Error, Api500Error} = require('../models/errors/errors');

module.exports.Category = {

    getcategorys: async(req, res, next) => {
        try {
            const result = await db.query(Queries.GET_CATEGORYS_QUERY)
            res.send(result.rows);    
        } catch (error) {
            next(error);
        }
    },

    creatcategory: async(req, res, next) => {
        try {

            let category = req.body;
            for (const key in category) {
                if(!category[key] && key!=="parent_category_id"){
                    throw new Error(`${key} is missing`);
                }
            }
            category = [category.category_name, category.parent_category_id];
            await db.query(Queries.INSERT_CATEGORY_QUERY,category);
            return res.send({success:'true'});

        }catch (error) {
            next(error);
        }
    },

    updateCategory: async(req, res, next) => {
        try {
            const category_id = req.params.id;
            const category_name = req.body.category_name;
            if( !category_id || !category_name){
                throw new Api500Error(`category_name or category_id is missing`);
            }
            const category = [category_name, category_id];
            const result = await db.query(Queries.UPDATE_CATEGORY_QUERY,category);
            if(!result.rowCount){
                throw new Api404Error(`pleas enter right category id`)
            }
            return res.send(result.rows[0]);
        } catch (error) {
            next(error);
        }
    },

    deleteCategory: async(req, res, next) => {
        try {
            const category_id = req.params.id;
            const result = await db.query(Queries.DELETE_CATEGORY_QUERY, [category_id]);
            res.send({success: 'true'});
        } catch (error) {
            next(error);
        }
    }
}