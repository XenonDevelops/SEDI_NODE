	var preguntas            = [];
	var carrera              = "";
	var nombreUsuario        = "";
	var asignacionProfesores = [];
	var materias;
	var profesores;
	var globAgp;

var homeController=function(server){
	

	server.route('/').
		get(function(req,res){
			var Aspirante    = require('../models/aspirante'),
				Reactivos    = require('../models/reactivos'),
				Grupo        = require('../models/grupo'),
				Carrera      = require('../models/carrera'),
				Usuario      = require('../models/usuario'),
				Tipo_usuario = require('../models/tipo_usuario');

			
			if (req.user) {
				asignacionProfesores = [];
				if (req.user.provider == 'facebook') {	
					buscarAspirante(req.user.id);
					var name     = req.user._json.first_name;
					var url_foto = "http://graph.facebook.com/"+req.user.id+"/picture?type=large";

					res.render('home/index', {
									name     : name,//<-------------------------------------mandamos los parametros
									url_foto : url_foto
								});
				}
				if (req.user.provider == 'twitter') {
					buscarAspirante(req.user.id);
					var name            = req.user.displayName;
					var url_foto        = req.user.photos[0].value.toString();
					var photos          = url_foto.replace("_normal.jpeg",".jpeg");
					url_foto            = photos;
					var url_fotoPortada = req.user._json.profile_banner_url;


					res.render('home/index', {
									name     : name,//<-------------------------------------mandamos los parametros
									url_foto : url_foto
								});
				}
				if (req.user.provider==undefined) {//---------------------------------------un usuario que se logea solo con user y password

					Tipo_usuario.findById(req.user.tipo_usuario,function(err,tipo_usuariobd){//<-buscamos el tipo de usuario que esta logeado
						if (tipo_usuariobd) {
							if (tipo_usuariobd.descripcion=='Administrador') {//<-----------si el usuario es adminitrador lo enviamos al controlador administrador
								res.redirect('/indexAdmin');
							}else if (tipo_usuariobd.descripcion=='Aspirante') {
								buscarAspirante(req.user.username,req.user.password);
								var name     = req.user.username;//<------------------------asignamos el nombre que pondremos al inicio
								var url_foto = "../images/nodejs.png";//<-------------------asignamos la imagen que pondremos al inicio

								res.render('home/index', {
									name     : name,//<-------------------------------------mandamos los parametros
									url_foto : url_foto
								});
							}
						}else{
							console.log('No se encontro el tipo de usuario');
						}
					});
				}
			}else{
				console.log('no hay usuario');
				res.render('home/index');
			}
		});




	server.route('/preguntas').
		get(function(req,res){
			res.writeHead('application/json');
			res.end(JSON.stringify(preguntas));
	});

	server.route('/carreras').
		get(function(req,res){
			res.writeHead('200','text/plain');
			res.write(nombreUsuario + "," + carrera);
			res.end();
	});

	server.route('/profesoresMaterias').
		get(function(req,res){
			res.writeHead('200','application/json');
			res.write(JSON.stringify(asignacionProfesores));
			res.end();
		});

	server.route('/calificaciones').
		post(function(req,res){
			var Evaluacion=require('../models/evaluacion');
			for (var i = 0; i <req.body.listaRespuesta.length; i++) {
				var idProfesor        = req.body.listaRespuesta[i].idProfesor;
				var calificacionProfe = req.body.listaRespuesta[i].calificacion;
				searchAsig(req.user,idProfesor,calificacionProfe);
			}
			res.end();
		});


	function buscarAspirante(id_usuarioNetwork){
		var Aspirante     = require('../models/aspirante'),
				Reactivos = require('../models/reactivos'),
				Grupo     = require('../models/grupo'),
				Carrera   = require('../models/carrera'),
				Agp       = require('../models/asignacion_grupoProfesor'),
				Usuario   = require('../models/usuario');
				console.log(usernameInput+' - '+passwordInput);

		Usuario.findOne({id_network:id_usuarioNetwork},function(err,usuariobd){
			if (usuariobd) {
				Aspirante.findOne({usuario:usuariobd.id},function(err,aspirantebd){
					if (aspirantebd) {
						nombreUsuario=aspirantebd.nombreCompleto;
						Reactivos.find({}).
											sort( {'date': -1} ).//---------------------------------------ordenar
											skip( aspirantebd.numeroPregunta ).//-------------------------desde donde comienza
											//limit(2).//-------------------------------------------------cantidad de resultados que queremos
											exec(function(err, reactivobd) {//----------------------------ejecuta la consulta
													     if (reactivobd) {
													     	preguntas = reactivobd;
													     }
						});



						Grupo.findOne({_id : aspirantebd.grupo},function(err,grupobd){//-------------------buscamos el grupo del aspirante
							if (grupobd) {
								Carrera.findOne({_id : grupobd.carrera},function(err,carrerabd){//---------buscamos la carrera de este grupo
									carerra=carrerabd.nombreCarrera;//-------------------------------------asignamos la carrera a la variable global
								});
								Agp.find({grupo : grupobd.id},function(err,agpbd){//-----------------------buscamos las asignaciones de este grupo
									if (agpbd) {
										globAgp = agpbd;//<------------------------------------------------GUARDAMOS LAS ASIGNACIONES EN UNA VARIABLE GLOBAl
										for (var i = 0; i < agpbd.length; i++) {
											addProfes(agpbd[i],grupobd);//---------------------------------agregamos el profesor encontrado a la lista de asignacion	y mandamos la asignacion												
										}
									}
								});
							}else{
								console.log('grupo No encontrado');
							}
						});

					}else{
						console.log('No se encontrado el aspirante');
					}
				});
			}else{
				console.log('error, no se encontro el usuario');
			}
		});
	}


	function buscarAspirante(usernameInput,passwordInput){
		var Aspirante     = require('../models/aspirante'),
				Reactivos = require('../models/reactivos'),
				Grupo     = require('../models/grupo'),
				Carrera   = require('../models/carrera'),
				Agp       = require('../models/asignacion_grupoProfesor'),
				Usuario   = require('../models/usuario');
				console.log(usernameInput+' - '+passwordInput);

		Usuario.findOne({username:usernameInput,password:passwordInput},function(err,usuariobd){
			if (usuariobd) {
				Aspirante.findOne({usuario:usuariobd.id},function(err,aspirantebd){
					if (aspirantebd) {
						nombreUsuario = aspirantebd.nombreCompleto;
						Reactivos.find({}).
											sort({'date': -1}).//------------------------------------------ordenar
											skip(aspirantebd.numeroPregunta).//----------------------------desde donde comienza
											//limit(2).//--------------------------------------------------cantidad de resultados que queremos
											exec(function(err, reactivobd) {//-----------------------------ejecuta la consulta
													     if (reactivobd) {
													     	preguntas=reactivobd;
													     }
						});



						Grupo.findOne({_id:aspirantebd.grupo},function(err,grupobd){//---------------------buscamos el grupo del aspirante
							if (grupobd) {
								Carrera.findOne({_id:grupobd.carrera},function(err,carrerabd){//-----------buscamos la carrera de este grupo
									carerra = carrerabd.nombreCarrera;//-----------------------------------asignamos la carrera a la variable global
								});
								Agp.find({grupo:grupobd.id},function(err,agpbd){//-------------------------buscamos las asignaciones de este grupo
									if (agpbd) {
										globAgp = agpbd;//<------------------------------------------------GUARDAMOS LAS ASIGNACIONES EN UNA VARIABLE GLOBAl
										for (var i = 0; i < agpbd.length; i++) {
											addProfes(agpbd[i],grupobd);//---------------------------------agregamos el profesor encontrado a la lista de asignacion	y mandamos la asignacion												
										}
									}
								});
							}else{
								console.log('grupo No encontrado');
							}
						});

					}else{
						console.log('No se encontrado el aspirante');
					}
				});
			}else{
				console.log('error, no se encontro el usuario');
			}
		});
	}


	function searchAsig(user,idProfesor,calificacionProfe){
		var Evaluacion = require('../models/evaluacion');
		for (var j = 0; j <globAgp.length; j++) {
			if (globAgp[j].profesor == idProfesor) {
				var temp = j;
				Evaluacion.findOne({asignacion_grupoProfesor:globAgp[j]._id},function(err,evaluacionbd){
					if (evaluacionbd) {
						console.log('Encontramos la evaluacion '+idProfesor+' '+calificacionProfe+temp);
						calificacion = parseFloat(evaluacionbd.calificacion) + parseFloat(calificacionProfe);//sumamos la nueva calificacion con la de la bd
						contador     = evaluacionbd.contador + 1;//aumentamos en contador
						promedio     = calificacion / contador;//generamos el nuevo promedio
						updateEvaluacion(user,globAgp[temp], calificacion, contador, promedio);
					}else{
						console.log('Vamos a crear la evaluacion '+idProfesor+' '+calificacionProfe);
						addEvaluacion(user,globAgp[temp],calificacionProfe);
					}
				});
			}
		}
	}

	function updateRespuestasAspirante(user){
		var Aspirante = require('../models/aspirante'),
			Usuario   = require('../models/usuario');
		if (user.provider == 'facebook' || user.provider == 'twitter') {
			console.log('usuario logeado con twitter, actualizar sus preguntas');
			Usuario.findOne({usuario:user.id}, function(err,aspirantebd){
				if (aspirantebd) {
					console.log('Encontramos el aspirante para actuaizar sus preguntas');
				}else{
					console.log('No encontramos el aspirante para actuaizar sus preguntas');
				}
			});
		}else{
			Usuario.findOne({username : user.username, password : user.password}, function(err,usuariobd){
				if (usuariobd) {
					Aspirante.findOne({usuario:usuariobd._id},function(err,aspirantebd){
						if (aspirantebd) {
							numeroPreguntaUpdate = aspirantebd.numeroPregunta+1;
							Aspirante.findOneAndUpdate({_id : aspirantebd._id},{numeroPregunta : numeroPreguntaUpdate},{new: true},function(err,updateSucces){
								if (updateSucces) {
									console.log("pregunta actualizada correctamente");
								}
							});
						}
					});
				}else{
					console.log('No encontramos el aspirante para actuaizar sus preguntas');
				}
			});
		}
		
	}

	function updateEvaluacion(user,asignacion, calificacion, contador, promedio){
		var Evaluacion = require('../models/evaluacion');
		Evaluacion.findOneAndUpdate({asignacion_grupoProfesor:asignacion}, { calificacion: calificacion, contador:contador, promedio:promedio}, {new: true}, function(err){
			if (err) {
				console.log('Hubo un error al hacer update a la evaluacion');
			}else{
				updateRespuestasAspirante(user);
				console.log('evaluacion con update correcta');
			}
		});
	}

	function addEvaluacion(user,asignacion,calificacion){
		var Evaluacion  = require('../models/evaluacion');
		evaluacionNueva = new Evaluacion({
									asignacion_grupoProfesor: asignacion._id,
									calificacion: calificacion,
									promedio: calificacion,
									contador: 1
								});
		evaluacionNueva.save(function(err){
			if (err) {
				console.log('no se ha guardado la evaluacion');
			}else{
				updateRespuestasAspirante(user);
				console.log('evaluacion guardada existosamente');
			}
		});
	}

	function addProfes(agpbd,grupo){
		var Profesor = require('../models/profesor');
		Profesor.find({_id:agpbd.profesor},function(err,profesorbd){//buscamos los profesores ASIGNADOS  a un grupo
			if (profesorbd) {
				addMaterias(agpbd,grupo,profesorbd);//llamamos a la funcion para agregar la materia a la asignacion
			}
		});
	}

	function addMaterias(agpbd,grupo,profesor){
		var Materia = require('../models/materia');
		Materia.find({_id:agpbd.materia},function(err,materiabd){//buscamos las materias Asignadas a un grupo
			if (materiabd) {
				asignacionProfesores.push({
					profesor:profesor[0],
					grupo:grupo[0],
					materia:materiabd[0]
				});
				console.log("Termina addMaterias");
			}
		});
	}
};
module.exports=homeController;