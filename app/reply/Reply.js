
const Model = require('objection').Model;

class Reply extends Model {
  static get tableName() {
    return 'reply'
  };

  static get idColumn() {
    return 'id'
  };

  static get relationMappings() {
    const Account = require('../accounts/Account')
    const Question = require('../questions/Question')
    return {
      account: {
        relation: Model.BelongsToOneRelation,
        modelClass: Account,
        join: {
          from: 'reply.id_account',
          to: 'account.id'
        }
      },
      question: {
        relation: Model.BelongsToOneRelation,
        modelClass: Question,
        join: {
          from: 'reply.id_question',
          to: 'question.id'
        }
      }
    }

  }
}

module.exports = Reply