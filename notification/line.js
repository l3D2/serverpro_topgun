const express = require('express');
const line = require('@line/bot-sdk')
const dotenv = require('dotenv')
const env = dotenv.config().parsed

const linecfg = {
    channelSecret: env.CHANNEL_SECRET,
    channelAccessToken: env.CHANNEL_ACCESS_TOKEN
}
const app = express()
const Client = new line.Client(linecfg)

app.post('/webhook', line.middleware(linecfg), async (req, res) => {
    try {
        const events = req.body.events;
        //console.log('events>>', events);
        if (events.length > 0) {
            await Promise.all(events.map(item => handleEvent(item)));
        }
        res.status(200).send("OK");
    } catch (error) {
        //console.error(error)
        res.status(500).end()
    }
})

const handleEvent = async (event) =>{
    switch (event.type) {
        case 'message':
            return await handleMessage(event)
        default:
            return null
    }
}

const handleMessage = async (event) => {
    if(event.message.type !== 'text')
        return null
    else
        return Client.replyMessage(event.replyToken, {type: 'text', text: 'Test Message'})
}

app.listen(env.LINE_PORT, function () {
    console.log('Line webhook listening on port'+ env.LINE_PORT)
})