var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var port = process.env.PORT || 8090;

//routes for API
var router = express.Router();
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
})
router.get('/test', function(req, res) {
	res.json({ message: 'hooray! testing works!' });
})

//register routes
app.use('/api', router);
//start server
app.listen(port);
console.log('Magic happens on port ' + port);