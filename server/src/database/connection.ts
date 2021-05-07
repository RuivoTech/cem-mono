import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const connection = knex({
    client: "mysql",
    version: "10.1",
    connection: {
        host: process.env.BD_HOST,
        user: process.env.BD_USER,
        password: process.env.BD_PASSWORD,
        database: process.env.BD_BASE
    }
});

export default connection;