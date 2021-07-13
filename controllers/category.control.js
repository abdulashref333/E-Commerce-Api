const db = require('../db');
const {Queries} = require('../db/queries');

module.exports.Category = {

    getcategorys: async(req, res) => {
        const result = await db.query(Queries.GET_CATEGORYS_QUERY)
        res.send(result.rows);
    },

    creatcategory: async (req, res) => {
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
            res.status(500).send({error:error.message, ...error})
        }
    },

    updateCategory: async (req, res) => {
        try {
            const category_id = req.params.id;
            const category_name = req.body.category_name;
            if( !category_id || !category_name){
                throw new Error(`category_name or category_id is missing`);
            }
            const category = [category_name, category_id];
            const result = await db.query(Queries.UPDATE_CATEGORY_QUERY,category);
            if(!result.rowCount){
                throw new Error(`pleas enter right category id`)
            }
            return res.send(result.rows[0]);
        } catch (error) {
            res.status(500).send({error:error.message, ...error})
        }
    },

    deleteCategory: async(req, res) => {
        try {
            const category_id = req.params.id;
            const result = await db.query(Queries.DELETE_CATEGORY_QUERY, [category_id]);
            res.send({success: 'true'});
        } catch (error) {
            res.status(500).send({error:error.message, ...error})
        }
    }
}