const pool = require("./pool");

module.exports.query = (queryText, queryParams) => {
 return new Promise((resovle, reject) => {
  pool
   .query(queryText, queryParams)
   .then((res) => resovle(res))
   .catch((error) => reject(error));
 });
};