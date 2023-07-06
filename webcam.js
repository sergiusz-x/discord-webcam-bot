const NodeWebcam = require("node-webcam")
const options = require("./options.json")
const Webcam = NodeWebcam.create(options)
const Jimp = require("jimp")
const { WebhookClient } = require("discord.js")
let { webhook_database, photo_interval_time } = require("./config")
//
let hook
if(webhook_database.startsWith("http")) {
    hook = new WebhookClient({ url: webhook_database })
} else if(webhook_database.length > 0) {
    console.log(`Webhook URL should start with http`)
}
//
function take_and_save_image() {
    return new Promise(async (res, err) => {
        Webcam.capture("image", (err1, data) => {
            if(err1) {
                console.error(err1)
                return res(false)
            }
            //
            Jimp.read("image.png", (err2, image) => {
                if(err2) {
                    console.error(err2)
                    return res(false)
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
let image_photointerval
async function photo_interval() {
    image_photointerval = await take_and_save_image()
    if(hook && image_photointerval) {
        hook.send({ files: [`${__dirname}/image.png`], content: `<t:${Math.round((Date.now())/1000)}:f> <t:${Math.round((Date.now())/1000)}:R>` })
        image_photointerval = undefined
    }
}
if(photo_interval_time > 0) {
    if(photo_interval_time < 5) photo_interval_time = 5
    setInterval(() => {
        photo_interval()
    }, 1000 * photo_interval_time);
}
//
module.exports = { take_and_save_image, save_image_to_hook_db, Webcam }