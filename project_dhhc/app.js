var exp = require('express'),
	morgan = require('morgan'),
    bodyParser = require('body-parser');

var app = exp();

//var _atm = require('./ATM/ServicesATM');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//var users = require('./controller/taikhoancontroller');
//app.use('/taikhoan',users);

var dx = require ('./controller/projectcontroller');
app.use('/api',dx);



var port = 8081;
var server = app.listen(port,function (){
	console.log('server khoi dong port :'+port);
})
