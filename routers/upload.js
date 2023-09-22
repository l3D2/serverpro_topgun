const express = require('express')
const router = express.Router()
const fs = require('fs')
const multer = require('multer')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.send('This is a GET request.');
});

router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: 'No file uploaded' });
    }

    const imageBuffer = req.file.buffer;
    const folderName = req.headers['device-name'];

    const directoryPath = `./img/${folderName}`;
    if (!fs.existsSync(directoryPath)) {
        try {
            fs.mkdirSync(directoryPath, { recursive: true });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Error creating the directory' });
        }
    }
    try {
        const filename = 'uploaded_image.jpg';
        fs.writeFileSync(`${directoryPath}/${filename}`, imageBuffer);
        return res.status(200).send({ success: 'Image received and saved successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Error saving the image' });
    }
});

module.exports = router