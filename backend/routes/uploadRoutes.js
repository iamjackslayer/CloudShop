import express from 'express'
import multer from 'multer'
import path from 'path'
const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads') // destination relative to root (where npm script is run from)
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}` // original name is the file name taken from the client's comp.
    )
  }
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const isValidExt = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  )
  const isValidMime = filetypes.test(file.mimetype) // Content-Type, e.g text/html, application/pdf, application/json
  if (isValidExt && isValidMime) {
    return cb(null, true)
  } else {
    cb('Images (jpg/jpeg/png) only')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
})

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
