const { Router } = require("express")
const router = Router();

router

.use('/drive', require('./drive'))

.use('/upload', require('./upload'))



module.exports = router;
