const { Router } = require('express')
const router = Router()
const multer = require('multer');

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public/image");
    },
    filename: (req, file, cb) =>{
        cb(null, 'photo.jpg');
    }
});

const upload = multer({storage:storageConfig});


router

.post('/', upload.single("photo"), (req, res, next) => {
    try {

        let photo = req.file;

        if(!photo)
            res.send("Ошибка при загрузке файла");
        else
            res.send("Файл загружен");

    } catch (e) {
        return res.status(500).send(e.message)
    }
})

module.exports = router;
