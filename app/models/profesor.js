var mongoose=require('../connections/mongoose');
var Schema=mongoose.Schema;

var profesorSchema=new Schema({
	nombreProfesor:{type : String,required : true}
});

var Profesor = mongoose.model('profesor',profesorSchema);

/*
nuevo=new Profesor({
	nombreProfesor:'Juan Perez Perez'
});
nuevo.save(function(err){
	if (err) {
		console.log("no se agrego Profesor")
	}else{
		console.log('alta Profesor');
	}
});
*/

module.exports=Profesor;