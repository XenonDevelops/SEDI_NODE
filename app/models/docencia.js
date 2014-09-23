var mongoose=require('../connections/mongoose');
var Schema=mongoose.Schema;

var docenciaSchema=new Schema({
	nombreDocencia:{type : String,required : true}
});

var Docencia = mongoose.model('docencia',docenciaSchema);

/*
nuevo=new Docencia({
	nombreDocencia:'Docencia 1'
});
nuevo.save(function(err){
	if (err) {
		console.log("no se agrego la docencia")
	}else{
		console.log('alta docencia');
	}
});
*/

module.exports=Docencia;