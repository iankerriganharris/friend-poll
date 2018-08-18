
exports.seed = function(knex, Promise) {
  return knex('question').insert([
    {id_account: 1, description: 'Good dog sitter?'},
    {id_account: 1, description: 'Best dog breed?'},
    {id_account: 1, description: 'Looking for a new leash'},
    {id_account: 1, description: 'Adopting puppies! Message me'},
    {id_account: 2, description: 'Who wants to camp this weekend?'},
    {id_account: 2, description: 'Sleeping bag up for grabs'},
    {id_account: 3, description: 'Anyone wanna lift?'},
    {id_account: 3, description: 'Best gym in pdx for olympic lifting?'},
    {id_account: 3, description: 'Anyone need personal training?'},
    {id_account: 5, description: 'Good deal on Jordans?'},
    {id_account: 5, description: 'Good deal on Commnon Projects?'},
    {id_account: 5, description: 'Good deal on boosts?'},
    {id_account: 5, description: 'Good deal on chucks?'},
    {id_account: 6, description: 'Anyone wanna split a pizza?'},
    {id_account: 6, description: 'Best slice in town?'},
    {id_account: 6, description: 'Where to go for lunch with clients?'},
    {id_account: 6, description: 'Best patio in pdx?'},
  ]);
};
