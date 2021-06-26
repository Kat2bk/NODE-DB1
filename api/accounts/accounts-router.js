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

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
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
