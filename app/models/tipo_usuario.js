var mongoose=require('../connections/mongoose');
var Schema=mongoose.Schema;

var tipo_usuarioSchema=new Schema({
	descripcion:{type : String,required : true}
});

var Tipo_usuario = mongoose.model('tipo_usuario',tipo_usuarioSchema);
/*
nuevo=new Tipo_usuario({
	descripcion:'Administrador'
});
nuevo.save(function(err){
	if (err) {
		console.log("no se agrego Tipo_usuario")
	}else{
		console.log('alta Tipo_usuario');
	}
});*/

module.exports=Tipo_usuario;