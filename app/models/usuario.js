var mongoose=require('../connections/mongoose');
var Schema=mongoose.Schema;

var usuarioSchema=new Schema({
	id_network:{type : String},
	tipo_usuario:{type: Schema.ObjectId, ref:'tipo_usuario'},
	username:{type : String, required : true, index:{unique:true}},
	password:{type:String,required:true}
});

var Usuario = mongoose.model('usuario',usuarioSchema);


/*
Tipo_usuario=require('./tipo_usuario');
Tipo_usuario.findOne({descripcion:'Administrador'},function(err,userbd){
	if (userbd) {
		usuarioNuevo=new Usuario({
		id_network:'0',
		tipo_usuario:userbd.id,
		username:'AngelLagunas',
		password:'123'
		});

		usuarioNuevo.save(function(err){
			if (err) {
				console.log("no se agrego el usuario")
			}else{
				console.log('alta usuario');
			}
		});
	}
});
*/

module.exports = Usuario;