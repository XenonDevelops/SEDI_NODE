var mongoose=require('../connections/mongoose');
var Schema=mongoose.Schema;

var materiaSchema=new Schema({
	nombreMateria:{type : String,required : true}
});

var Materia = mongoose.model('materia',materiaSchema);
/*
nuevo=new Materia({
	nombreMateria:'Estructura de datos'
});
nuevo.save(function(err){
	if (err) {
		console.log("no se agrego la materia")
	}else{
		console.log('alta materia');
	}
});
*/
module.exports=Materia;