require("dotenv").config();
const { Pool } = require("pg");

const db_config = {
 connectionString: process.env.DATATBASE_URL,
 connectionTimeoutMillis: 300,
 idleTimeoutMillis: 200,
 max: 20,
};

const pool = new Pool(db_config);

pool.on("connect", () => {
 console.log("database connected");
});

pool.on("remove", () => {
 console.log("database connection removed..");
});

module.exports = pool;
