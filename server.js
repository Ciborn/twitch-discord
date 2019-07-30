const DiscordRPC = require('discord-rpc');
const express = require("express");
var bodyParser = require("body-parser")
const rpc = new DiscordRPC.Client({ transport: 'ipc' });
rpc.login({ clientId: "605420358274908183" });

let lastActivity = null;
let date = new Date(lastActivity);

const app = express();
//app.use(require("cors")());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 
app.post('/', (req, res) => {
	rpc.setActivity({
        details: `${req.body.streamer} on ${req.body.game}`,
        state: req.body.title,
        largeImageKey: req.body.streamer.toLowerCase(),
        largeImageText: req.body.streamer,
        smallImageKey: req.body.game.toLowerCase().replace(/[^0-9a-z]/gi, ''),
        smallImageText: req.body.game
	}).catch(err => {
		console.error(err);
    });
    lastActivity = Date.now();
    date = new Date(lastActivity)
    console.log(`${date.getUTCHours()}:${date.getMinutes()}:${date.getUTCSeconds()} Changed activity (${req.body.streamer.toLowerCase()}, ${req.body.game.toLowerCase().replace(/[^0-9a-z]/gi, "")})`);
    res.send("OK");
});
app.listen(58910, () => console.log(`Example app listening on port 58910!`));
setInterval(() => {
    if (lastActivity + 60000 < Date.now()) {
        rpc.clearActivity();
        console.log(`${date.getUTCHours()}:${date.getMinutes()}:${date.getUTCSeconds()} Cleared activity`);
    }
}, 15000);