const { Router } = require('express')
const router = Router()
const driveControllers = require('../controllers/drive');

router

.get('/', async (req, res) => {
    const url = await driveControllers.generateDefaultUrl()

    res.render('pages/index', {url});
})


module.exports = router;
