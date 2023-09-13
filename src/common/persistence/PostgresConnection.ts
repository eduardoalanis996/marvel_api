import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const { PG_HOST, PG_PORT, PG_USER, PG_PASSWORD, PG_DATABASE, PG_SSL } = process.env

const config = {
    host: PG_HOST || 'localhost',
    dbName: PG_DATABASE || "marvel_api",
    user: PG_USER || 'postgres',
    password: PG_PASSWORD || 'qwerty',
    port: PG_PORT != undefined && PG_PORT != null ? parseInt(PG_PORT) : 5435,
    ssl: PG_SSL != undefined && PG_SSL == 'true' ? true : false
}

export const postgresConnection = new Sequelize(config.dbName, config.user, config.password, {
    logging: false,
    host: config.host,
    dialect: 'postgres',
    port: config.port,
    dialectOptions: {
        ssl: config.ssl
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        underscored: true
    }
})