import {Model, Optional} from 'sequelize'
import {db, DataTypes} from '../lib/orm'
import {Agreement} from './Agreement'

interface IAccount {
  id: number
  firstName: string
  lastName: string
  profession: string
  balance: number
  type: 'buyer' | 'supplier'
}

const Account = db.define<Model<IAccount, Optional<IAccount, 'id'>>>(
  'Account',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false
    },
    balance: {
      type: DataTypes.DECIMAL(12, 2)
    },
    type: {
      type: DataTypes.ENUM('buyer', 'supplier')
    }
  }
)

Agreement.belongsTo(Account, {as: 'Supplier'})
Agreement.belongsTo(Account, {as: 'Buyer'})
Account.hasMany(Agreement, {as: 'Supplier', foreignKey: 'SupplierId'})
Account.hasMany(Agreement, {as: 'Buyer', foreignKey: 'BuyerId'})

export {Account, IAccount}
