const db = require('../../data/db-config');

 async function getAll() {
  // grabs an array of accounts
  return await db('accounts')
}

async function getById(id) {
  // gets an account
  return await db('accounts').where('id', id).first()
}

async function create(account) {
  // creates an account
const [id] = await db('accounts').insert(account, ['id'])
return getById(id)
}

async function updateById(id, account) {
 return await db('accounts').where({id}).update(account)
}

async function deleteById(id) {
 return await db('accounts').where({id}).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
