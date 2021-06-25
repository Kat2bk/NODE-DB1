const db = require('../../data/db-config');

const getAll = () => {
  // grabs an array of accounts
  return db.select().table('accounts')
}

const getById = id => {
  
}

const create = account => {
  // DO YOUR MAGIC
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
