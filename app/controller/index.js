const Validator = require('fastest-validator')

const Storage = require('../config/multer')

const v = new Validator()
const storage = new Storage()

const uploadfile = async (req, res, next) => {
    try {
        const upload = storage.upload('upload_single').fields([{ name: 'file' }])
        await upload(req, res, next)
    } catch (e) {
        console.log("ERROR ON UPLOAD FILE : ", e)
        res.send({
            error_code: 2,
            message: "Error on upload file!"
        })
    }
}

const validate = (req, res, next) => {
    const schema = {
        first_name: { type: 'string', min: 1, max: 25 },
        last_name: { type: 'string', min: 1, max: 25 },
        dob: { type: 'string', min: 1, max: 12 }
    }
    const valid = v.validate(req.body, schema)

    if (valid === true) {
        next()
    } else {
        res.send({
            error_code: 1,
            message: "Validation Error!",
            data: valid
        })
    }
}

const process = (req, res, next) => {
    // Your Code Here 
    res.send({
        error_code: 0,
        message: "Successfully upload file!",
        data: {
            url: req.protocol + '://' + req.headers.host + '/' + req.dirupload + '/' + req.filename
        }
    })
}

module.exports = {
    uploadfile,
    validate,
    process
}