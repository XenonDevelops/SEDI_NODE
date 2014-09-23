var mongoose=require('../connections/mongoose');
var Schema=mongoose.Schema;

var carreraSchema=new Schema({
	nombreCarrera:{type: String , require:true}
});

var Carrera = mongoose.model('carrera',carreraSchema);


/*

nuevo=new Carrera({
	nombreCarrera:'Tecnologias de la Informacion y la comunicacion'
});
nuevo.save(function(err){
	if (err) {
		console.log("no se agrego la carrera")
	}else{
		console.log('alta carrera');
	}
});

*/

module.exports=Carrera;