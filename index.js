const NodeWebcam = require("node-webcam");
const Jimp = require("jimp");
const { WebhookClient, MessageEmbed, MessageAttachment } = require("discord.js")

const url = "URL"
const hook = new WebhookClient({url: url})
//
var options = {
    //Picture related
    width: 1280,
    height: 720,
    quality: 100,
    // Number of frames to capture
    // More the frames, longer it takes to capture
    // Use higher framerate for quality. Ex: 60
    frames: 60,
    //Delay in seconds to take shot
    //if the platform supports miliseconds
    //use a float (0.1)
    //Currently only on windows
    delay: 0,
    //Save shots in memory
    saveShots: false,
    // [jpeg, png] support varies
    // Webcam.OutputTypes
    output: "png",
    //Which camera to use
    //Use Webcam.list() for results
    //false for default device
    device: "2",
    // [location, buffer, base64]
    // Webcam.CallbackReturnTypes
    callbackReturn: "location",
    //Logging
    verbose: true
};
const Webcam = NodeWebcam.create(options);
Webcam.capture( "test_picture", function( err, data ) {
    Jimp.read("test_picture.png", (err, lenna) => {
        if (err) throw err;
        lenna.write("image.jpg")
        setTimeout(() => {
            hook.send({content: `hello`, files: [`${__dirname}/image.jpg`] }).then(msg => { null })
        }, 500);
    });
} );

async function run() {
    const cam = await get_cam()
    // cam.capture( "test_picture", function( err, data ) {} );
    
}

function get_cam() {
    return new Promise((res, err) => {
        Webcam.list(list => {
            res(NodeWebcam.create( { device: list[1], opts: options } ))
        });
    })
}

run()
return