
const Model = require('objection').Model;

class Follow extends Model {
  static get tableName() { return 'follow' };
  static get idColumn() { return 'id' };
  static get relationMappings() {
    const Question = require('../questions/Question')
    return {
      question: {
        relation: Model.HasManyRelation,
        modelClass: Question,
        join: {
          from: 'follow.id_account',
          to: 'question.id_account'
        }
      },
    }
  }
}

module.exports = Follow