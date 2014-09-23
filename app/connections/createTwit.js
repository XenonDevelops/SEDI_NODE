var Twit=require('twit');
var NewTwit=function(message){
		var twit = new Twit({
		    consumer_key:         'YCstFd9wcMnYSw7x4bnsawpyi',
		    consumer_secret:      'HuzJwP2TNmfNO7WuMnxFTfqfuUJKKI5XZxEguFeXBPSqHEfjLR',
		    access_token:         '795154124-GbTswfpeLPWGrBztBT0ayeiqj7KfnNcYxP2t1KUJ',
		    access_token_secret:  'ZxaijIs0iRugONuTZXqnEdaXrgIml1ErlND45FHPDBq2X'
		});

		twit.post('statuses/update', { status: message }, function(err, reply) {
		    if (err) {
		        console.dir(err);
		    } else {
		    	console.log("Posted Tweet");
		        //console.dir(reply);
		    }
		});
}

module.exports=NewTwit;