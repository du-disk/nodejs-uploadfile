const { Router } = require('express')
const router = new Router()

const ctrl = require('../controller')

router.post('/upload-file',
    ctrl.uploadfile,
    ctrl.validate,
    ctrl.process
)

module.exports = router