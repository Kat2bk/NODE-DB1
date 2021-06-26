const db = require('../../data/db-config');

 async function getAll() {
  // grabs an array of accounts
  await db.select().table('accounts')
}

async function getById(id) {
  // gets an account
  await db.select('accounts').where('id', id).first()
}

async function create(account) {
  // creates an account
const [id] = await db.select('accounts').insert(account, ['id'])
return getById(id)
}

async function updateById(id, account) {
 await db.select('accounts').where({id}).update(account)
}

async function deleteById(id) {
  await db.select('accounts').where({id}).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
