const NodeWebcam = require("node-webcam")
const options = require("./options.json")
const Webcam = NodeWebcam.create(options)
const Jimp = require("jimp")
const { WebhookClient } = require("discord.js")
const { webhook_database } = require("./config")
//
let hook
if(webhook_database.startsWith("http")) hook = new WebhookClient({ url: webhook_database })
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
//
function save_image_to_hook_db() {
    if(hook) {
        hook.send({ files: [`${__dirname}/image.png`] })
    }
}
//
module.exports = { take_and_save_image, save_image_to_hook_db }