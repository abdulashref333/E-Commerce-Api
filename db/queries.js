module.exports.Queries = {
 GET_CUSTOMERS_QUERY:`SELECT FIRST_NAME, LAST_NAME, PHON_NUMBER, CUSTOMER_ID, EMAIL,COUNTRY.COUNTRY_NAME, CITY_NAME FROM ECOMMERCE.CUSTOMERS
                      JOIN ECOMMERCE.COUNTRY USING (COUNTRY_ID)  JOIN ECOMMERCE.CITY USING (CITY_ID);`,
 
 INSERT_CUSTOMER_QUERY:`INSERT INTO ecommerce.customers(first_name, last_name, phon_number, email, country_id, city_id)
                        VALUES($1, $2, $3, $4, 1, 1);`,
                        
 GET_PRODUCTS_QUERY: `SELECT PRODUCT_ID, PRODUCT_CODE, PRODUCT_NAME, UNIT, PRICE_PER_UNIT, CATEGORY_ID, CATEGORY_NAME, DESCRIPTION
                      FROM ECOMMERCE.PRODUCT JOIN ECOMMERCE.CATEGORY USING(CATEGORY_ID);`,

 INSERT_PRODUCT_QUERY: `INSERT INTO ECOMMERCE.PRODUCT (PRODUCT_NAME, UNIT, PRICE_PER_UNIT, DESCRIPTION, PRODUCT_CODE, CATEGORY_ID)
                        VALUES($1, $2, $3, $4, $5, $6);`,
                        
 UPDATE_PRODUCT_QUREY: `UPDATE ECOMMERCE.PRODUCT SET  PRODUCT_NAME=$1, UNIT=$2, PRICE_PER_UNIT=$3, DESCRIPTION=$4, PRODUCT_CODE=$5, CATEGORY_ID=$6
                        WHERE PRODUCT_ID=$7 RETURNING *;`,
 
 DELETE_PRODUCT_QUREY: `DELETE FROM ECOMMERCE.PRODUCT WHERE PRODUCT_ID =$1;`,                       

 UPDATE_CUSTOMER_QUERY: `UPDATE ECOMMERCE.CUSTOMERS SET FIRST_NAME=$1, LAST_NAME=$2, PHON_NUMBER=$3
                         WHERE EMAIL=$4;`, 
 
 GET_CATEGORYS_QUERY: `SELECT PC.CATEGORY_ID, PC.CATEGORY_NAME , C.CATEGORY_NAME AS "PARENT_CATEGORY" FROM ECOMMERCE.CATEGORY AS C
                       RIGHT JOIN ECOMMERCE.CATEGORY AS PC ON C.CATEGORY_ID=PC.PARENT_CATEGORY_ID;`,

 INSERT_CATEGORY_QUERY:`INSERT INTO ECOMMERCE.CATEGORY (CATEGORY_NAME, PARENT_CATEGORY_ID) VALUES($1, $2);`,

 UPDATE_CATEGORY_QUERY: `UPDATE ECOMMERCE.CATEGORY SET CATEGORY_NAME=$1 WHERE CATEGORY_ID =$2 RETURNING *;`,

 DELETE_CATEGORY_QUERY: `DELETE FROM ECOMMERCE.CATEGORY WHERE CATEGORY_ID=$1;`,
};
