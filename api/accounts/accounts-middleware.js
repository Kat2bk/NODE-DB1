const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  const {name, budget} = req.body;

  // - If either name or budget are undefined, return `{ message: "name and budget are required" }`
  if (!name.trim() || !budget) {
    res.status(400).json({message: "Name and budget are required"})
  } else if (typeof name !== 'string') {
    // - If name is not a string, return `{ message: "name of account must be a string" }`
    res.status(400).json({message: "name of account must be a string"})
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    // - If the _trimmed_ name is shorter than 3 or longer than 100, return `{ message: "name of account must be between 3 and 100" }`
    res.status(400).json({message: "name of account must be between 3 and 100 words"})
  } else if (typeof budget !== 'number') {
    // - If budget is not a number, return `{ message: "budget of account must be a number" }`
    res.status(400).json({message: "budget of account must be a number"})
    // - If budget is a negative number or over one million, return `{ message: "budget of account is too large or too small" }`
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({message: "budget of account is too large or too small"})
  } else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // - `checkAccountNameUnique` returns a status 400 with a `{ message: "that name is taken" }` if the _trimmed_ `req.body.name` already exists in the database
  try {
    const accounts = await Accounts.getAll()
    if (req.body.name.trim().length > 0) {
      if (accounts[0].req.body.name.trim()) {
        res.status(400).json({message: "that name is taken"})
      }
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }

}

exports.checkAccountId = async (req, res, next) => {
  // - `checkAccountId` returns a status 404 with a `{ message: "account not found" }` if `req.params.id` does not exist in the database
  try {
    const account = await Accounts.getById(req.params.id)
    if (account) {
      next()
    } else {
      res.status(404).json({message: "account not found"})
    }
  } catch (error) {
    next(error)
  }
}


