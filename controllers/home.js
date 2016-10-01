var wikipedia = require("wikipedia-js");
  
/* GET home page. */
exports.index = function(req, res) {
  	res.render('home', {});
};

exports.msg = function(req, res) {
	//wiki <string>
	//train <train number> 
	//movie <city>
	// { content: 'Is UB kg DC j', from_number: '+917752846564' }
	console.log(req.body);
	var str1 = req.body.content;
	console.log(str1);

	var temp = str1.substring(0,str1.indexOf(' '));
	console.log(temp);
	var i = temp;
	// read url, phone number, type

	var str = "";
	if (i == "wiki") {
		/*--- Wikipedia ---*/
		var query = str1.substr(str1.indexOf(' ')+1);
		var options = {query: query, format: "html", summaryOnly: true};
		wikipedia.searchArticle(options, function(err, htmlWikiText){
		    if(err){
		      console.log("An error occurred[query=%s, error=%s]", query, err);
		      return;
		    }
		    // res.send(htmlWikiText);  
		    var htmlToText = require('html-to-text');

			var text = htmlToText.fromString(htmlWikiText, {});
			console.log(text);
			/*--- Twilio API ---*/
			var accountSid = 'ACb412781167345e15410b639433dd90ec';
			var authToken = '2471d21ed02bfe0a50390a36058f2415';
			var client = require('twilio')(accountSid, authToken);
			client.messages.create({
			  to: "+917752846564",
			  from: "+12058720018",
			  body: text.substr(0,100)
			}, function(err, message) {
			  if (err) {
			    console.error(err);
			  } else {
			    console.log(message);
			    res.send(message);
			  }

			});
		});
	} else if (i == "movie") {
		/*--- Movie Showtimes ---*/
		var query = str1.substr(str1.indexOf(' ')+1);
		var request = require("request");
		var cheerio = require("cheerio");
		var url = "https://www.google.com/movies?near="+query+"&rl=1&hl=en&stok=ABAPP2sSKpPyF24ozEs8Q8k8R_tsGOCM0A%3A1475309815141";
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

			/*--- Twilio API ---*/
			var accountSid = 'ACb412781167345e15410b639433dd90ec';
			var authToken = '2471d21ed02bfe0a50390a36058f2415';
			var client = require('twilio')(accountSid, authToken);
			client.messages.create({
			  to: "+917752846564",
			  from: "+12058720018",
			  body: str.substr(0,100)
			}, function(err, message) {
			  if (err) {
			    console.error(err);
			  } else {
			    console.log(message);
			    res.send(message);
			  }

			});
		  } else {
		    console.log("We’ve encountered an error: " + error);
		  }
		});
	} else if (i==3) {
		/*--- Train Running Status ---*/
		var request = require("request");
		var cheerio = require("cheerio");
		var url = "https://www.railyatri.in/live-train-status/12005-new-delhi-kalka-shatabdi-exp-ndls-to-klk?start_date=0";
		

		request(url, function (error, response, body) {
		  if (!error) {
		    var $ = cheerio.load(body);
		    $('div.schedule > div.border_div').each(function( index ) {
			    var station_name = $(this).find('span.station > a').text().trim();
			    var time = $(this).find('span.arrival_span').text().trim();
			    var departure = $(this).find('span.departure > span.green_txt').text().trim();
			   	str = str + station_name + ":" + time + ":" + departure + "; ";
			});

			/*--- Twilio API ---*/
			// var accountSid = 'ACb412781167345e15410b639433dd90ec';
			// var authToken = '2471d21ed02bfe0a50390a36058f2415';
			// var client = require('twilio')(accountSid, authToken);
			// client.messages.create({
			//   to: "+917752846564",
			//   from: "+12058720018",
			//   body: str
			// }, function(err, message) {
			//   if (err) {
			//     console.error(err);
			//   } else {
			//     console.log(message);
			//     res.send(message);
			//   }

			// });
			res.send(str);
		  } else {
		    console.log("We’ve encountered an error: " + error);
		  }
		});
	}
	// str = str + "https://api.api.ai/v1/"
	// if (i == 4) {
	// 	Authorization: Bearer 2f846f99b04c4e8bafd08ef88d06e25b
	// 	/query?query=who%20are%20you&v=20150910&lang=en&sessionId=2f846f99b04c4e8bafd08ef88d06e25b;
	// 	curl -H "Authorization: Bearer 2f846f99b04c4e8bafd08ef88d06e25b" "https://api.api.ai/v1/query?query=who%20are%20you&v=20150910&lang=en&sessionId=4353";

	// }	

	
};
