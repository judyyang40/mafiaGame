var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var port = process.env.PORT || 8090;
//var player = 3;

//routes for API
var router = express.Router();
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
})
router.get('/test', function(req, res) {
	res.json({ message: 'hooray! testing works!' });
})

router.get('/welcome', function(req, res) {
	var options = {root: __dirname + '/views/'};
	res.sendFile('index.html', options);
}) 

router.get('/kill', function(req, res) {
	var options = {root: __dirname + '/views/'};
	res.sendFile('kill.html', options);
})

router.post('/killed', function(req, res) {
	log.console(req.killed);
	var options = {root: __dirname + '/views/'};
	if(player == 3)
		res.sendFile('index.html', options);
})

//register routes
app.use('/api', router);
//start server
app.listen(port);
console.log('Magic happens on port ' + port);