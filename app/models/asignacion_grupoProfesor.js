var mongoose=require('../connections/mongoose');
var Schema=mongoose.Schema;

var asignacion_grupoProfesorSchema=new Schema({
	profesor:{type: Schema.Types.ObjectId, ref:'profesor'},
	grupo:{type: Schema.Types.ObjectId, ref:'grupo'},
	materia:{type: Schema.Types.ObjectId, ref:'materia'}
});

var Asignacion_grupoProfesor = mongoose.model('asignacion_grupoProfesor',asignacion_grupoProfesorSchema);
/*
var Grupo=require('./grupo'),
	Profesor=require('./profesor'),
	Materia=require('./materia');

	Grupo.findOne({nombreGrupo:'6 C'},function(err,grupobd){
		if (grupobd) {
			Profesor.findOne({nombreProfesor:'Juan Perez Perez'},function(err,profesorbd){
				if (profesorbd) {
					Materia.findOne({nombreMateria:'Estructura de datos'},function(err,materiabd){
						asignacion_grupoProfesorNuevo=new Asignacion_grupoProfesor({
							profesor:profesorbd.id,
							grupo:grupobd.id,
							materia:materiabd.id
						});

						asignacion_grupoProfesorNuevo.save(function(err){
							if (err) {
								console.log('No se agrego la asignacion_grupoProfesor');
							}else{
								console.log('se agrego la asignacion_grupoProfesor correctamente');
							}
						});
					});
				};
			});
		};
	});
*/
module.exports=Asignacion_grupoProfesor;