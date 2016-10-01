var wikipedia = require("wikipedia-js");
  
/* GET home page. */
exports.index = function(req, res) {
  	res.render('home', {});
};

exports.msg = function(req, res) {
	console.log(req.body);
	var i = 2;
	// read url, phone number, type
		
	if (i == 1) {
		/*--- Wikipedia ---*/
		var query = "Napoleon Bonaparte";
		var options = {query: query, format: "html", summaryOnly: true};
		wikipedia.searchArticle(options, function(err, htmlWikiText){
		    if(err){
		      console.log("An error occurred[query=%s, error=%s]", query, err);
		      return;
		    }
		    res.send(htmlWikiText);  
		});
	} else if (i == 2) {
		/*--- Movie Showtimes ---*/
		var request = require("request");
		var cheerio = require("cheerio");
		var url = "https://www.google.com/movies?near=kanpur&rl=1&hl=en&stok=ABAPP2sSKpPyF24ozEs8Q8k8R_tsGOCM0A%3A1475309815141";
		var str = "";

		request(url, function (error, response, body) {
		  if (!error) {
		    var $ = cheerio.load(body);
		    $('div.theater').each(function( index ) {
			    var theatre_name = $(this).find('div.desc > h2.name > a').text().trim();
			   	str = str + theatre_name + ": ";
			    $(this).find('div.showtimes > div.show_left > div.movie').each(function( index1 ) {
			    	var movie_name = $(this).find('div.name > a').text().trim();
			    	var movie_times = $(this).find('div.times').text().trim();
			    	str = str + movie_name + ": " + movie_times + "; ";
			    });
			    $(this).find('div.showtimes:has(div.show_right) > div.show_right > div.movie').each(function( index1 ) {
			    	var movie_name = $(this).find('div.name > a').text().trim();
			    	var movie_times = $(this).find('div.times').text().trim();
			    	str = str + movie_name + ": " + movie_times + "; ";
			    });
			});
			res.send(str);
		  } else {
		    console.log("We’ve encountered an error: " + error);
		  }
		});
	}
	
	//train running status

	/*--- Twilio API ---*/
	// var accountSid = 'ACb412781167345e15410b639433dd90ec';
	// var authToken = '2471d21ed02bfe0a50390a36058f2415';
	// var client = require('twilio')(accountSid, authToken);
	// client.messages.create({
	//   to: "+917752846564",
	//   from: "+12058720018",
	//   body: "Tomorrow's forecast in Financial District, San Francisco is Clear."
	// }, function(err, message) {
	//   if (err) {
	//     console.error(err);
	//   } else {
	//     console.log(message);
	//   }

	// });
};
