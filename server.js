/*
PARAMS:
- printType: {
  1: Pay/Print,
  2: Fire,
  3: Send/Resend,
  4: 'report',
  5: 'withdraw',
  6: 'deposit'
  7: 'bar'
}

- printerName: array('<printernames>', ...)

// Notes
NodeJS as a service: npm install -g qckwinsvc (http://stackoverflow.com/questions/20445599/auto-start-node-js-server-on-boot)
Printing application path: C:\server-print\SumatraPDF.exe
*/

var path = require('path');
var express  = require('express'),
    app = express(),
    bodyParser = require('body-parser')
var http = require('http');
var pushbots = require('pushbots');
var Pushbots = new pushbots.api({
  id:'56076ca2177959bb2a8b4568',
  secret:'964a400367ed1e68a24f33ccb5f0c124'
});

function handleError(res, err) {
  return res.status(422).json(err);
}

// EXPRESS stuffs ================================================
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: true,
  limit: '1mb',
  parameterLimit: 1000}));
app.use(bodyParser.json({limit: '1mb',
  parameterLimit: 1000}));

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: '#Push Notification started...' });
});

router.route('/push')

  // Receive the request to print
  .post(function(req, res) {
    console.log(req);
    var data = req.body;
    Pushbots.setMessage(data.message ,1);
    Pushbots.customFields({"article_id": data.field});
    Pushbots.customNotificationTitle(data.title);
    Pushbots.push(function(response){
      res.json({ success: true, message: 'Push successfully!', data: data });
    }, function (err) {
      handleError(res, err)
    });
  });

app.use('/api', router);
app.listen(port);
console.log('#Push Notification server running with port ' + port);
