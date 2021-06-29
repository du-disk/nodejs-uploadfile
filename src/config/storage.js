/**
 * Storage Upload Configuration
 * @author Dudi Iskandar
 * June 29, 2021
 */

const fs = require('fs')

const DIRUPLOAD = process.env.DIRUPLOAD || 'public/uploaded/'

module.exports = {
    upload_single: {
        destination: async (req, file, cb) => {
            const dir = DIRUPLOAD
            //create new directory if it doesnt exists
            req.dirupload = dir
            if (!fs.existsSync(dir)) await fs.mkdirSync(dir, { recursive: true });
            cb(null, dir)
        },
        filename: (req, file, cb) => {
            var re = /(?:\.([^.]+))?$/
            var ext = re.exec(file.originalname)[1] // ex: file.txt = "txt"
            req.filename = `${new Date().getTime()}.${ext}`
            cb(null, `${new Date().getTime()}.${ext}`)
        }
    }
}