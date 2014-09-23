var passport=require('passport'),
	FacebookStrategy=require('passport-facebook').Strategy;

var facebookConection=function(server){
	//console.log("facebookConection listo");
	passport.use(new FacebookStrategy({
		clientID:'320648684763384',
		clientSecret:'2ab829c278a838b80eb53490fadfdcc0',
		callbackURL:'http://192.168.52.238:8000/auth/facebook/callback'
	},function(accessToken,RefreshToken,profile,done){
		done(null,profile);
	}));

	server.get('/auth/facebook',passport.authenticate('facebook'));

	server.get('/auth/facebook/callback',passport.authenticate('facebook',{successRedirect:'/',
																			failureRedirect:'/'}))
}

module.exports=facebookConection;