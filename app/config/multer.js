const multer = require('multer')
const storageConfig = require('./storage')

class Storage {
    multerInstance() {
        return multer
    }
    upload(storagename) {
        const storage = storageConfig[storagename]
        return multer({ storage: multer.diskStorage(storage) })
    }
}

module.exports = Storage