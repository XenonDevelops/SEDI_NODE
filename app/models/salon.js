var mongoose=require('../connections/mongoose');
var Schema=mongoose.Schema;

var salonSchema=new Schema({
	docencia:{type: Schema.Types.ObjectId, ref:'docencia'},
	nombreAula:{type : String,required : true}
});

var Salon = mongoose.model('salon',salonSchema);
/*
var Docencia=require('./docencia');
Docencia.findOne({nombreDocencia:'Docencia 1'},function(err, docenciabd){
	if (docenciabd) {
		var salonNuevo=new Salon({
			docencia:docenciabd.id,
			nombreAula:'Aula 1'
		});	

		salonNuevo.save(function(err){
			if (err) {
				console.log('No se agrego el Aula');
			}else{
				console.log('Aula agregada correctamente');
			}
		});	
	};
});
*/
module.exports=Salon;