var express = require('express'),

    path    = require('path'),

    bp      = require('body-parser'),

    session = require('express-session'),

	app     = express();


app.use( express.static( path.join( __dirname, '/client/static' )));
app.use( express.static( path.join( __dirname, '/node_modules' )));
app.use(bp.json());
app.use(session({secret: 'blahblah', resave: true, saveUninitialized:true}))


require('./server/config/mongoose.js');

var routes_setter = require('./server/config/routes.js');

routes_setter(app);

app.listen(8000, function(){
	console.log('listening on port 8000');
})
