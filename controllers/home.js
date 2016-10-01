var wikipedia = require("wikipedia-js");
  
/* GET home page. */
exports.index = function(req, res) {
  	res.render('home', {});
};

exports.msg = function(req, res) {
	console.log(req.body);

	// read url, phone number, type
		
	/*--- wikipedia ---*/
	var query = "Napoleon Bonaparte";
	var options = {query: query, format: "html", summaryOnly: true};
	wikipedia.searchArticle(options, function(err, htmlWikiText){
	    if(err){
	      console.log("An error occurred[query=%s, error=%s]", query, err);
	      return;
	    }
	    res.send(htmlWikiText);  
	});

	//movie times

	//train running status

	// get data and parse

	// send response
	var accountSid = 'ACb412781167345e15410b639433dd90ec';
	var authToken = '2471d21ed02bfe0a50390a36058f2415';
	//require the Twilio module and create a REST client
	var client = require('twilio')(accountSid, authToken);
	client.messages.create({
	  to: "+917752846564",
	  from: "+12058720018",
	  body: "Tomorrow's forecast in Financial District, San Francisco is Clear."
	}, function(err, message) {
	  if (err) {
	    console.error(err);
	  } else {
	    console.log(message);
	  }

	});
};
