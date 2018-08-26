
const Model = require('objection').Model;

class Account extends Model {
  static get tableName() { return 'account' };
  static get idColumn() { return 'id' };

  static get relationMappings() {
    const Question = require('../questions/Question')
    const Follow = require('../follows/Follow')
    const Reply = require('../reply/Reply')
    return {
      question: {
        relation: Model.HasManyRelation,
        modelClass: Question,
        join: {
          from: 'account.id',
          to: 'question.id_account'
        }
      },
      follow: {
        relation: Model.ManyToManyRelation,
        modelClass: Account,
        join: {
          from: 'account.id',
          through: {
            from: 'follow.id_follower',
            to: 'follow.id_account'
          },
          to: 'account.id'
        }
      },
      follower: {
        relation: Model.ManyToManyRelation,
        modelClass: Account,
        join: {
          from: 'account.id',
          through: {
            from: 'follow.id_account',
            to: 'follow.id_follower'
          },
          to: 'account.id'
        }
      },
      reply: {
        relation: Model.HasManyRelation,
        modelClass: Reply,
        join: {
          from: 'account.id',
          to: 'reply.id_account'
        }
      }
    }
  }
};

module.exports = Account;