const NodeWebcam = require("node-webcam")
const options = require("./options.json")
const Webcam = NodeWebcam.create(options)
//
function test() {
    Webcam.capture("test_picture", function( err, data ) {
        // Jimp.read("test_picture.png", (err, lenna) => {
        //     if (err) throw err;
        //     lenna.write("image.jpg")
        //     setTimeout(() => {
        //         hook.send({content: `hello`, files: [`${__dirname}/image.jpg`] }).then(msg => { null })
        //     }, 500);
        // });
    } );
}

module.exports = { test }