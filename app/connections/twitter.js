var passport=require('passport'),
	TwitterStrategy=require('passport-twitter').Strategy;

var twitterConection=function(server){
	//console.log("twitterConection listo");
	passport.use(new TwitterStrategy({
		consumerKey:'YCstFd9wcMnYSw7x4bnsawpyi',
		consumerSecret:'HuzJwP2TNmfNO7WuMnxFTfqfuUJKKI5XZxEguFeXBPSqHEfjLR',
		callbackURL:'http://192.168.52.238:8000/auth/twitter/callback'
	},function(accessToken,RefreshToken,profile,done){
		done(null,profile);
	}));

	server.get('/auth/twitter',passport.authenticate('twitter'));

	server.get('/auth/twitter/callback',passport.authenticate('twitter',{successRedirect:'/',failureRedirect:'/'}))
}

module.exports=twitterConection;