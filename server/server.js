require('./config/config.js');

var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const socketIO = require('socket.io');
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: 'c504b836',
    apiSecret: 'd457ff4c0cd13695'
}, {debug:true});

var port = process.env.PORT

app.set('views', __dirname + '/views'); //settings views to the full path to views folder
app.set('view engine', 'html'); //setting the view engine for html files
app.engine('html', ejs.renderFile); //States html files will use ejs as the template engine
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('Connected');
    socket.on('disconnect', () => {
        console.log('Disconnected');
    });
});


app.get('/', (req, res) => {
    res.render('index.html');
});

app.post('/', (req, res) => {
    res.send(req.body);
    console.log(req.body);
    let toNumber = req.body.number;
    let text = req.body.text;
    let NUMBER = 12046743781

    nexmo.message.sendSms(
        NUMBER, toNumber, text, {type: 'unicode'},
        (err, responseData) => {
            if (err) {
                return console.log(err);
            }
            console.dir(responseData);
            let data = {
                id: responseData.messages[0]['message-id'], number: responseData.messages[0]['to']
            };
            io.emit('smsStatus', data);
        }
    );
});

server.listen(port, () => {
    console.log(`Starting server up on port ${port}`);
});