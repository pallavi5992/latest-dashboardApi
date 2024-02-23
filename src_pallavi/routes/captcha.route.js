const express = require('express')
const controller=require("../controllers/captcha.controller")
const router = express.Router();
const bcrypt = require("bcrypt");
// Human checkable test path, returns image for browser
router.get("/test/:width?/:height?/", (req, res) => {
    const width = parseInt(req.params.width) || 200;
    const height = parseInt(req.params.height) || 100;
    const { image } = controller.generateCaptcha(width, height);
    res.send(`<img class="generated-captcha" src="${image}">`);
});
// Captcha generation, returns PNG data URL and validation text
router.get("/:width?/:height?/", (req, res) => {
    const width = parseInt(req.params.width) || 200;
    const height = parseInt(req.params.height) || 100;
    const { image, text } = controller.generateCaptcha  (width, height);
    bcrypt.hash(text, 10, (err, hash) => {
        if (err) {
            res.send({ error: 'Error generating the captcha. Please try again.' });
        }
        else {
            res.send({ image, hash });
        }
    });
});

router.get('/', (req, res, next) => {
    res.status(200).json({ message: 'GET Captcha' })
})

module.exports = router;
