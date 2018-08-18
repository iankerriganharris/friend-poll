
const Model = require('objection').Model;

class Follow extends Model {
  static get tableName() { return 'follow' };
  static get idColumn() { return 'id' };
}

module.exports = Follow