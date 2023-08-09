import { db, DataTypes } from "../lib/orm";
import { Agreement } from "./aggreement";

const Account = db.define("Account", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profession: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.DECIMAL(12, 2),
  },
  type: {
    type: DataTypes.ENUM("buyer", "supplier"),
  },
});

Agreement.belongsTo(Account, { as: "Supplier" });
Agreement.belongsTo(Account, { as: "Buyer" });
Account.hasMany(Agreement, { as: "Supplier", foreignKey: "SupplierId" });
Account.hasMany(Agreement, { as: "Buyer", foreignKey: "BuyerId" });

export { Account };
