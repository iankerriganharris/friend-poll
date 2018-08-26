
const Model = require('objection').Model;

class Question extends Model {
  static get tableName() { return 'question' };
  static get idColumn() { return 'id' };

  static get relationMappings() {
    const Account = require('../accounts/Account');
    const Reply = require('../reply/Reply')
    return {
      account: {
        relation: Model.BelongsToOneRelation,
        modelClass: Account,
        join: {
          from: 'question.id_account',
          to: 'account.id'
        }
      },
      reply: {
        relation: Model.HasManyRelation,
        modelClass: Reply,
        join: {
          from: 'reply.id_question',
          to: 'question.id'
        }
      }
    }
  }
}

module.exports = Question;