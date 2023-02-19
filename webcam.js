const NodeWebcam = require("node-webcam")
const options = require("./options.json")
const Webcam = NodeWebcam.create(options)
const Jimp = require("jimp")
//
function take_and_save_image() {
    return new Promise(async (res, err) => {
        Webcam.capture("image", (err1, data) => {
            if(err1) {
                console.error(err1)
                return res(undefined)
            }
            //
            Jimp.read("image.png", (err2, image) => {
                if(err2) {
                    console.error(err2)
                    return res(undefined)
                }
                image.writeAsync("image.png").then(() => {
                    res(true)
                })
            });
            //
        })
    })
}

module.exports = { take_and_save_image }