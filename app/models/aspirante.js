var mongoose = require('../connections/mongoose');
var Schema = mongoose.Schema;

var aspiranteSchema = new Schema({
	usuario:{ type: Schema.Types.ObjectId, ref:'usuario' },
	grupo:{ type: Schema.Types.ObjectId, ref:'grupo' },
	nombreCompleto:{ type : String, require : true },
	evaluacionCompletada:{ type : Boolean},
	numeroPregunta:{ type : Number}
});

var Aspirante = mongoose.model('aspirante',aspiranteSchema);
/*
var Usuario=require('./usuario'),
	Grupo=require('./grupo');

	Usuario.findOne({username:'AngelLagunas',password:'123'},function(err,usuariobd){
		if (usuariobd) {
			Grupo.findOne({nombreGrupo:'6 C'},function(err,grupobd){
				if (grupobd) {
					aspiranteNuevo=new Aspirante({
						usuario : usuariobd.id,
						grupo : grupobd.id,
						nombreCompleto : 'Angel David Lagunas Garcia',
						evaluacionCompletada : false,
						numeroPregunta : 0
					});

					aspiranteNuevo.save(function(err){
						if (err) {
							console.log('No se agrego el aspirante');
						}else{
							console.log('Se agrego un nuevo aspirante');
						}
					});
				};
			});
		}
	});
*/
module.exports = Aspirante;