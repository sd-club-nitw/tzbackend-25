const express = require('express')
const router = express.Router();

const {register,login} = require('../controllers/authController')

// NOTE: multer removed — the backend expects either JSON metadata, pre-uploaded URLs,
// or base64 image strings in the request body. Files should be uploaded to Cloudinary
// directly from the client or sent as base64 strings.
router.post('/register', register)
router.post('/login', login)
router.get('/test', (req, res) => {
    res.json({ message: "Auth route is working" })
})

module.exports = router