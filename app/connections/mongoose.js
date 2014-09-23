var mongoose=require('mongoose');
mongoose.connect('mongodb://sediuser:sedi-4DMIN@ds063439.mongolab.com:63439/sedi');
module.exports=mongoose;