var mongoose=require('../connections/mongoose');
var Schema=mongoose.Schema;

var turnoSchema=new Schema({
	descripcion:{type: String , require:true}
});

var Turno = mongoose.model('turno',turnoSchema);
/*
nuevo=new Turno({
	descripcion:'Turno 1'
});
nuevo.save(function(err){
	if (err) {
		console.log("no se agrego Turno")
	}else{
		console.log('alta Turno');
	}
});*/

module.exports=Turno;