const { Router } = require('express')
const driveControllers = require('../controllers/drive');
const router = Router()


router

.get('/', async (req, res) => {
    try{
        const result = await driveControllers.getAllFiles()
        return res.send(result)
    }catch(e){
        return res.status(500).send(e.message)
    }
})

.post('/createFile', async (req, res) => {
    const body = req.body
    try{
        const id = await driveControllers.createFile()
        const result = await driveControllers.generatePublicUrl(id)
        console.log(result);
        return res.send(result)
    }catch(e){
        return res.status(500).send(e.message)
    }
})

.delete('/deleteFile/:id', async (req, res) => {
    const {id} = req.params
    try{
        const result = await driveControllers.createFile(id)
        if(!result) return res.status(400).send("Файла с таким id не существует")
        return res.send(result)
    }catch(e){
        return res.status(500).send(e.message)
    }
})

module.exports = router;
