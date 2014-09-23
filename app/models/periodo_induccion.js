var mongoose=require('../connections/mongoose');
var Schema=mongoose.Schema;

var periodo_induccionSchema=new Schema({
	mesInicioPeriodo:{type: String , require:true},
	mesFinPeriodo:{type: String , require:true},
	annoPeriodo:{type: Number , require:true}
});

var Periodo_induccion = mongoose.model('periodo_induccion',periodo_induccionSchema);
/*
nuevo=new Periodo_induccion({
	mesInicioPeriodo:'Agosto',
	mesFinPeriodo: 'Diciembre',
	annoPeriodo:2014
});
nuevo.save(function(err){
	if (err) {
		console.log("no se agrego Periodo_induccion")
	}else{
		console.log('alta Periodo_induccion');
	}
});
*/
module.exports=Periodo_induccion;