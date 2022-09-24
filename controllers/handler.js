const qr = require("qr-image");


const generateImage = (base64, cb = () => {}) => {
    let qr_svg = qr.image(base64, { type: "svg" });
    qr_svg.pipe(require('fs').createWriteStream(`${__dirname}/../mediaSend/qr-code.svg`));

    console.log('El QR Se actualiza cada 1min')
    cb()
}

module.exports = {
    generateImage
}
