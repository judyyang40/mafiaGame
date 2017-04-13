var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'mafiagame',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var port = process.env.PORT || 8090;
var options = {root: __dirname + '/views/'};
var rooms = [];

//routes for API
var router = express.Router();
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
})
router.get('/test', function(req, res) {
	res.json({ message: 'hooray! testing works!' });
})

router.get('/alexa/:room', function(req, res) {
	room = req.params.room;
	if(rooms.indexOf(room) >= 0) {
		res.json({ message: 'Game room taken: '+room });
	} else {
		rooms.push(room);
		req.session.gameroom = room;
		res.json({ message: 'registered game room: '+room });
	}
})

router.get('/index/:room', function(req, res) {
	if(rooms.indexOf(req.params.room) >= 0) {
		res.sendFile('index.html', options);
	} else {
		res.sendFile('initiate.html', options);
	}
}) 

router.get('/end/:room', function(req, res) {
	var i = rooms.indexOf(req.params.room)
	if(i >= 0) {
		rooms.splice(i, 1);
		console.log(rooms);
		res.json({ message: 'game room closed: '+req.params.room });
	} else {
		res.json({ message: 'game room does not exist: '+req.params.room });
	}
})

router.get('/kill', function(req, res) {
	res.sendFile('kill.html', options);
})

router.post('/killed', function(req, res) {
	console.log(req.body.killed);
	player = player+1;
	res.json({nextplayer: player});
})


router.get('/test/session', function(req, res) {
	console.log(req.session['gameroom']);
	res.json({ message: 'test' });
})

//register routes
app.use('/', router);
//start server
app.listen(port);
console.log('Magic happens on port ' + port);