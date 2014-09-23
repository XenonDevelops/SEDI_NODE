var mongoose = require('../connections/mongoose');
var Schema   = mongoose.Schema;

var evaluacionSchema = new Schema({
	asignacion_grupoProfesor:{type: Schema.Types.ObjectId, ref:'asignacion_grupoProfesor'},
	calificacion:{type: Number},
	promedio:{type:Number},
	contador:{type:Number}
});

var Evaluacion = mongoose.model('evaluacion',evaluacionSchema);

var Asignacion = require('./asignacion_grupoProfesor');
	
module.exports = Evaluacion;