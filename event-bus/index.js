const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')

const app = express();
app.use(bodyParser.json());

const events = [];
app.post('/events', (req, res) => {
    console.log(`Received Event ${req.body.type}`)
    const event = req.body;
    events.push(event);
    axios.post('http://posts-clusterip-srv:4000/events', event);
    axios.post('http://comments-clusterip-srv:4001/events', event);
    axios.post('http://query-clusterip-srv:4002/events', event);
    axios.post('http://moderation-clusterip-srv:4003/events', event);

    res.send({status: "OK"})

})

app.get('/events', (req, res) => {
    console.log(`Received Event ${req.body.type}`)
    res.send(events)

})
app.listen(4005, () => {
    console.log('Listening on 4005')
})
