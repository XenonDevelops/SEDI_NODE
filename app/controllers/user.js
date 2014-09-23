var userController=function(server,io){
	var io2 = io.of('/indexAdmin');

	server.route('/logout')
	.get(function(req,res){
		if (req.user) {
			req.logout();
			io2.to('cuartoHaciendoEncuesta').emit('unaEncuestaTerminada');//enviamos una respuesta a los usuarios que esten en este cuarto
		}
		res.redirect('/');
	})
};

module.exports=userController;