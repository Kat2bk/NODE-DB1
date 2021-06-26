const router = require('express').Router()
const {checkAccountId, checkAccountPayload, checkAccountNameUnique} = require('./accounts-middleware');
const Accounts = require('./accounts-model');

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll()
    if (accounts) {
      res.status(200).json(accounts)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
    res.status(200).json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
     const account = await Accounts.create(req.body)
    res.status(201).json(account)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', checkAccountPayload, checkAccountId, async (req, res, next) => {
  try {
    const updatedAccount = await Accounts.updateById(req.params.id, req.body)
    res.status(200).json(updatedAccount)
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const deleted = await Accounts.deleteById(req.params.id)
    res.json(deleted)
  } catch (error) {
    next(error)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  console.error(err.stack)
  res.status(500 || err.status)
  res.render({
    message: err.message,
    error: {}
  })
})

module.exports = router;
