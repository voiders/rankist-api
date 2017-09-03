
const router = require('express').Router()

router.use('/l/', require('./lists'))

router.use('/*', function (req, res) {
  res.status(404).end()
})

module.exports = router
