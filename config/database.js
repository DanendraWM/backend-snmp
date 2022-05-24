import { Sequelize } from "sequelize";
const db = new Sequelize('headends', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});
export default db;