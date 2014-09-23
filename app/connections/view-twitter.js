var ntwitter   = require('ntwitter'),
    TwitterAPI = require('node-twitter-api');


/*MONITOR EN STREAMING*/

var monitor_Twets=function(server){
	
	var twitter = new ntwitter({
		consumer_key        : 'YCstFd9wcMnYSw7x4bnsawpyi',
		consumer_secret     : 'HuzJwP2TNmfNO7WuMnxFTfqfuUJKKI5XZxEguFeXBPSqHEfjLR',
		access_token_key    : '795154124-GbTswfpeLPWGrBztBT0ayeiqj7KfnNcYxP2t1KUJ',
		access_token_secret : 'ZxaijIs0iRugONuTZXqnEdaXrgIml1ErlND45FHPDBq2X'
	});

	twitter.stream('statuses/filter',{track:['#conElPoster']},function(stream){
		stream.on('data',function(data){
			console.log(data.user.screen_name+" : "+data.text);
		});
	});	
}


module.exports = monitor_Twets;