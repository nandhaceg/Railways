var request = require('request');
var moment = require('moment');

module.exports.getstatus = function(req, res){
    request("https://api.railwayapi.com/v2/pnr-status/pnr/"+req.body.pnr+"/apikey/bmmtlwr60m/", function(error, response, body) {
        console.log(body);
        res.json(body);
    });
};

module.exports.livestatus = function(req, res){
	var today = moment().format('DD-MM-YYYY');
	request("https://api.railwayapi.com/v2/live/train/"+req.body.trainno+"/date/"+today+"/apikey/bmmtlwr60m/",function(error, response, body){
		console.log(body);
		res.json(body);
	});
};

module.exports.trainsbetween = function(req, res){
	var date = req.query.date;
	var src  = req.query.src.toLowerCase();
	var dest  = req.query.dest.toLowerCase();
	console.log(src,dest);
	request("https://api.railwayapi.com/v2/between/source/"+src+"/dest/"+dest+"/date/"+date+"/apikey/bmmtlwr60m/",function(error, response, body){
		console.log(body);
		res.json(body);
	});
};


