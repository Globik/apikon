import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import mariadb from 'mariadb';

config();

/*console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)
console.log(process.env.DB_NAME)
console.log(process.env.DB_DIALECT)*/

const pool = mariadb.createPool({ 
  //  host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    connectionLimit: 5 ,
    trace: true
});

async function createDataBase() {
    let conn;
    try {
        conn = await pool.getConnection();

        await conn.query("CREATE DATABASE IF NOT EXISTS `roulet` COLLATE 'utf8mb4_unicode_ci'");
    } finally {
        if (conn) conn.release();
    }
}

createDataBase();

const sequelizeConnection = new Sequelize(process.env.DB_NAME, process.env.DB_USER,'roulet' /*process.env.DB_PASSWORD*/, {
 //  host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT ?? 'mariadb'
})

export default sequelizeConnection
