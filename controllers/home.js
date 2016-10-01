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
};
