var mongoose=require('../connections/mongoose');
var Schema=mongoose.Schema;

var grupoSchema=new Schema({
	salon:{type: Schema.Types.ObjectId, ref:'salon'},
	periodo_induccion:{type: Schema.Types.ObjectId, ref:'periodo_induccion'},
	turno:{type: Schema.Types.ObjectId, ref:'turno'},
	carrera:{type: Schema.Types.ObjectId, ref:'carrera'},
	nombreGrupo:{type:String}
});

var Grupo = mongoose.model('grupo',grupoSchema);



/*
var Salon=require('./salon'),
	Periodo=require('./periodo_induccion'),
	Turno=require('./turno'),
	Carrera=require('./carrera');

Periodo.findOne({annoPeriodo:2014},function(err,periodobd){
	if (periodobd) {
		Salon.findOne({nombreAula:'Aula 1'},function(err,salonbd){
			if (salonbd) {
				Turno.findOne({descripcion:'Turno 1'},function(err,turnobd){
					if (turnobd) {
						Carrera.findOne({nombreCarrera:'Tecnologias de la Informacion y la comunicacion'},function(err,carrerabd){
							if (carrerabd) {
								grupoNuevo = new Grupo({
									salon : salonbd.id,
									periodo_induccion : periodobd,
									turno : turnobd.id,
									carrera : carrerabd.id,
									nombreGrupo : '6 C'
								});

								grupoNuevo.save(function(err){
									if (err) {
										console.log('No se agrego el grupo');
									}else{
										console.log('Se agrego el nuevo grupo');
									}
								});
							}else{
								console.log('no se encontro la carrera');
							}
						});
					};
				});
			};
		});
	};
});
*/
module.exports=Grupo;