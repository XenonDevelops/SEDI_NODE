var express      = require('express'),
	swig         = require('swig'),
	http         = require('http'),
	passport     = require('passport'),
	multiparty   = require('multiparty');
	session      = require('express-session'),
	cookieParser = require('cookie-parser');
	bodyParser   = require('body-parser');
var server       = express();
var server_socket = http.createServer(server).listen(8000)
var io = require('socket.io').listen(server_socket)

swig.setDefaults({
	cache:false,
	varControls: ['<%=', '%>'] //<-------------------------------------tags que se usarán en el html para usar swig
});

//conf express
server.use(bodyParser.urlencoded({ extended : true }));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(session({ secret            : 'mi clave', 
					 key               : 'sid',
	                 saveUninitialized : true,
	                 resave            : true}));

//config passport
server.use( passport.initialize() );
server.use( passport.session() );

passport.serializeUser(function(user,done){
	done(null,user);//req.user
});

passport.deserializeUser(function(user,done){
	done(null,user);//req.user
});

//config swig
server.engine('html',swig.renderFile);//<------------------------------el motor de templates es swig
server.set('view engine','html');
server.set('views',__dirname + '/app/views');//<-----------------------en donde van a estar las vistas o templates

server.set('uploadDir', './public/uploads');//<------------------------FORMA 1

server.use(express.static('./public'));

//controllers
require('./app/controllers/home')(server);
require('./app/controllers/user')(server,io);
require('./app/controllers/administrador')(server,io);

//connections
require('./app/connections/facebook')(server);
require('./app/connections/twitter')(server);
require('./app/connections/local')(server,io);


//server.listen(8000);
//require('./app/connections/view-twitter')(server);
//require('./app/connections/createTwit')('Hello #nodejs from Twit #conElPosterOtroMas');
//models
/*
require('./app/models/evaluacion');
require('./app/models/carrera');
require('./app/models/docencia');
require('./app/models/turno');
require('./app/models/materia');
require('./app/models/profesor');
require('./app/models/periodo_induccion');
require('./app/models/reactivos');
require('./app/models/tipo_usuario');


require('./app/models/usuario');
require('./app/models/salon');
require('./app/models/periodo_evaluacionDocente');
require('./app/models/grupo');

require('./app/models/asignacion_grupoProfesor');
require('./app/models/aspirante');
*/