const router = require('express').Router()
const controller = require('./lists.ctrl.js')

router.get('/', controller.getPublic)
router.get('/search', controller.getSearch)
router.get('/:id', controller.getOne)

router.post('/', controller.post)

router.put('/:id', controller.put)

module.exports = router
