const { createCanvas } = require('canvas');
const bcrypt = require("bcrypt");
const canvas = createCanvas(200, 50);
const ctx = canvas.getContext('2d');

// Background color
ctx.fillStyle = '#FFD4B2';
ctx.fillRect(0, 0, 200, 50);

// const alternateCapitals = str =>
//     [...str].map((char, i) => char[`to${i % 2 ? "Upper" : "Lower"}Case`]()).join("");

// // Get a random string of alphanumeric characters
// const randomText = () =>
//     alternateCapitals(
//         Math.random()
//             .toString(36)
//             .substring(2, 8)
//     );
// const _generateRandomColour = () => {
//     return "rgb(" + Math.floor((Math.random() * 255)) + ", " + Math.floor((Math.random() * 255)) + ", " + Math.floor((Math.random() * 255)) + ")";
// }
// const FONTBASE = 200;
// const FONTSIZE = 35;

// // Get a font size relative to base size and canvas width
// const relativeFont = width => { 
//     const ratio = FONTSIZE / FONTBASE;
//     const size = width * ratio;
//     return `${size}px serif`;
// };

// // Get a float between min and max
// const arbitraryRandom = (min, max) => Math.random() * (max - min) + min;

// // Get a rotation between -degrees and degrees converted to radians
// const randomRotation = (degrees = 15) => (arbitraryRandom(-degrees, degrees) * Math.PI) / 180;

// // Configure captcha text
// const configureText = (ctx, width, height) => {
//     ctx.font = relativeFont(width);
//     ctx.textBaseline = "middle";
//     ctx.textAlign = "center";
//     const text = randomText();
//     ctx.globalCompositeOperation = "difference";
//     ctx.strokeStyle = "white"
//     ctx.strokeText(text, width / 2, height / 2);
//     return text;
// };

// Get a PNG dataURL of a captcha image
// const generateCaptcha = (width, height) => {
//     const canvas = createCanvas(width, height);
//     const ctx = canvas.getContext("2d");
//     //ctx.rotate(randomRotation());
//     const text = configureText(ctx, width, height);

//     const colour1 = _generateRandomColour();
//     const colour2 = _generateRandomColour();
//     const gradient1 = ctx.createLinearGradient(0, 0, width, 0);
//     gradient1.addColorStop(0, colour1);
//     gradient1.addColorStop(1, colour2);

//     ctx.fillStyle = gradient1;
//     ctx.fillRect(0, 0, width, height);

//     const gradient2 = ctx.createLinearGradient(0, 0, width, 0);
//     gradient2.addColorStop(0, colour2);
//     gradient2.addColorStop(1, colour1);

//     ctx.fillStyle = gradient2;
//     ctx.setTransform((Math.random() / 10) + 0.9,    //scalex
//         0.1 - (Math.random() / 5),      //skewx
//         0.1 - (Math.random() / 5),      //skewy
//         (Math.random() / 10) + 0.9,     //scaley
//         (Math.random() * 20) + 10,      //transx
        
//         100);                           //transy

//     return {
//         image: canvas.toDataURL(),
//         text: text
//     };
// };

const generateCaptcha = async (req, res) => {
    const canvas = createCanvas(200, 60);
    const ctx = canvas.getContext('2d');

    // Background color
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw lines in background
    const no_of_lines = Math.floor(Math.random() * (6 - 3 + 1)) + 3;
    for (let i = 0; i < no_of_lines; i++) {
        ctx.beginPath();
        ctx.moveTo(0, Math.random() * 50);
        ctx.lineTo(200, Math.random() * 50);
        ctx.strokeStyle = '#653E08'; // Line color
        ctx.stroke();
    }

    // Draw random pixels
    for (let i = 0; i < 500; i++) {
        ctx.fillStyle = '#0000FF'; // Pixel color
        ctx.fillRect(Math.random() * 200, Math.random() * 50, 1, 1);
    }

    // Set captcha letters
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const range = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    const cap_length = 6; // No. of characters in image
    let word = '';
    let captcha = '';
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    ctx.fillStyle = randomColor;
    ctx.font = '30px Arial';

    // Ensure at least one uppercase letter, one lowercase letter, and one number
    captcha += uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
    captcha += lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];
    captcha += numbers[Math.floor(Math.random() * numbers.length)];
    
    // Fill remaining characters randomly
    for (let i = 3; i < cap_length; i++) {
        captcha += range[Math.floor(Math.random() * range.length)];
    }

    // Shuffle the characters to randomize their positions
    captcha = captcha.split('').sort(() => Math.random() - 0.5).join('');

    // Draw the captcha text
    for (let i = 0; i < cap_length; i++) {
        ctx.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
        ctx.fillText(captcha[i], 5 + (i * 30), 30);
    }

    // Save the image to a buffer
    const buffer = canvas.toDataURL();

    // Hash the captcha word
    const hash = await bcrypt.hash(captcha, 10);

    // Send the base64 image and hash as response
    return res.status(200).json({ image: buffer, hash: hash });
}


module.exports = {
    generateCaptcha
}



