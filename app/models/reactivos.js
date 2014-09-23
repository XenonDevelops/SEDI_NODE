var mongoose=require('../connections/mongoose');
var Schema=mongoose.Schema;

var reactivosSchema=new Schema({
	descripcion:{type: String , require:true}
});

var Reactivos = mongoose.model('reactivos',reactivosSchema);

/*
nuevo=new Reactivos({
	descripcion:'¿Por que la gallina cruzo la calle?'
});
nuevo.save(function(err){
	if (err) {
		console.log("no se agrego Reactivos")
	}else{
		console.log('alta Reactivos');
	}
});*/

module.exports=Reactivos;