var mongoose=require('../connections/mongoose');
var Schema=mongoose.Schema;

var periodo_evaluacionDocenteSchema=new Schema({
	periodo_induccion:{type: Schema.Types.ObjectId, ref:'periodo_induccion'},
	fechaInicio:{type: Date},
	fechaFin:{type:Date},
	estado:{type:Boolean}
});

var Periodo_evaluacionDocente = mongoose.model('periodo_evaluacionDocente',periodo_evaluacionDocenteSchema);

	/*
 		periodo_evaluacionDocenteNuevo= new Periodo_evaluacionDocente({
 			periodo_induccion: '53f60b8c08eb1ac401a2454e',
 			fechaInicio:'2014-07-14',
			fechaFin:'2014-07-19',
			estado:true
 		});

 		periodo_evaluacionDocenteNuevo.save(function(err){
 			if (err) {
 				console.log('no se agrego el nuevo periodo_evaluacionDocente');
 			}else{
 				console.log('se agrego el nuevo periodo_evaluacionDocente');
 			}
 		});
	*/

module.exports=Periodo_evaluacionDocente;