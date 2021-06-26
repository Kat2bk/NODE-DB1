const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  const {name, budget} = req.body;

  if (!name || !budget) {
    res.status(400).json({ message: 'name and budget are required'})
  } else if (typeof name !== 'string') {
    res.status(400).json({ message: 'name of account must be a string'})
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({ message: 'name of account must be between 3 and 100'})
  } else if (typeof budget !== 'number') {
    res.status(400).json({ message: 'budget of account must be a number'})
  } else if (budget < 0 || budget >= 1000000) {
    res.status(400).json({message: 'budget of account is too large or too small'})
  } else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // - `checkAccountNameUnique` returns a status 400 with a `{ message: "that name is taken" }` if the _trimmed_ `req.body.name` already exists in the database
  try {
    const accounts = await Accounts.getAll()
    accounts.filter(account => {
      if (account.name === req.body.name.trim()) {
        res.status(400).json({message: "that name is taken"})
      } else {
        next()
      }
    })
  } catch (error) {
    next(error)
  }
}

exports.checkAccountId = (req, res, next) => {
  // - `checkAccountId` returns a status 404 with a `{ message: "account not found" }` if `req.params.id` does not exist in the database
 Accounts.getById(req.params.id)
 .then(account => {
   if (account) {
     req.account = account
     next()
   } else {
     res.status(404).json({message: "account not found"})
   }
 })
 .catch(error => {
   next(error)
 })
}


