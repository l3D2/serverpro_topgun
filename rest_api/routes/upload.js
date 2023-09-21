var express = require('express');
const fs = require('fs');
var router = express.Router();


/* GET home page. */
router.get('/api/upload', function(req, res, next) {
    if(!req.file){
        return res.status(400).send({error: 'No image '})
    }
    const imageBuffer = req.file.buffer;
    const filename = './img/uploaded_image.jpg';
    fs.writeFileSync(filename, imageBuffer);  
    return res.status(400).send({error: 'Receive image successfully'})
});

module.exports = router;
