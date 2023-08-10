import {db, DataTypes} from '../lib/orm'
import {Submission} from './Submission'

const Agreement = db.define('Agreement', {
  terms: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('new', 'in_progress', 'terminated')
  }
})

Submission.belongsTo(Agreement)
Agreement.hasMany(Submission)

export {Agreement}
