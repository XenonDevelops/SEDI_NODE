var xlsx       = require('node-xlsx');
var formidable = require('formidable');
var fs         = require('fs');
var Periodo    = require('../models/periodo_induccion');

var adminController=function(server){
		
	server.route('/indexAdmin').
		get(function(req,res){
			if (req.user) {
				res.render('administrador/index', { name     : req.user.username,
													url_foto : "../images/octocat.jpeg"});
			}else{
				res.redirect('/');
			}
		});

	server.route('/cargaExcel').
		post(function(req,res){
		    // parse a file upload
		    var form = new formidable.IncomingForm();

		    form.parse(req, function(err, fields, files) {
		    	var tmp_path=files.file.path;//ruta del archivo
				var tipo=files.file.type;//tipo del archivo
				
				if(tipo=='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
					//Si es de tipo excel > 2007
					var aleatorio=Math.floor((Math.random()*9999)+1);//Variable aleatoria
					var nombrearchivo=aleatorio+''+files.file.name;//nombre del archivo mas variable aleatoria

					var target_path='./public/uploads/'+nombrearchivo;// hacia donde subiremos nuestro archivo dentro de nuestro servidor
					fs.rename(tmp_path,target_path,function (err) {//Escribimos el archivo
						fs.unlink(tmp_path,function (err) {//borramos el archivo tmp
							//damos una respuesta al cliente
							res.send(
								{
									nombreArchivo:files.file.name,
									random: aleatorio
								}
								);
							res.end();
						});
					});

				}else{
					res.send('Tipo de archivo no soportado');
					res.end();
				}
		    });
		});



	server.route('/aspirantes').
	post(function(request,response){
		console.log('/aspirantes');
		console.log(request.body.nombreExcel);
		leerExcel(request.body.nombreExcel);
	});

	server.route('/periodos').
		get(function(req,res){
			Periodo.find(function(err,periodobd){
				if (periodobd) {
					res.writeHead('application/json');
					res.end(JSON.stringify(periodobd));
				}
			});
		}).
		post(function(req,res){
			periodoNuevo = new Periodo({
				mesInicioPeriodo : req.body.mesInicio,
			    mesFinPeriodo    : req.body.mesFin,
			    annoPeriodo      : req.body.anno
			});

			periodoNuevo.save(function(err,succes){
				if (succes) {
					res.end('Periodo creado');
				}else{
					res.end('Error');
				}
			});
		});
}



function leerExcel(nombrearchivo){
	console.log('todo listo con excel');
	var obj=xlsx.parse('./public/uploads/'+nombrearchivo);
	for (var i = 0; i < obj.worksheets.length; i++) {
		//console.log(obj.worksheets[i].data);
		console.log(obj.worksheets[i].name);
	}
}
module.exports=adminController;