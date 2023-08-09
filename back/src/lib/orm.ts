import { Sequelize, DataTypes } from "sequelize";

const db = new Sequelize({
  dialect: "sqlite",
  storage: "../../database.sqlite3",
});

export { db, DataTypes, Sequelize as Orm };
