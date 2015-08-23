console.log("One");
var express = require('express');
console.log("2");
var	app = express();
console.log("3");
var	BodyParser =  require('body-parser');
console.log("4");
//Start : All the COde below is related to MongoDB

var mongo = require('mongodb');
console.log("5");
var uriUtil = require('mongodb-uri');
console.log("6");
var mongoose = require('mongoose');
console.log("7");
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };
console.log("8");
 //mongodb://<dbuser>:<dbpassword>@ds051750.mongolab.com:51750/veurekakingdb
var mongodbUri = 'mongodb://shiva:1234@ds051750.mongolab.com:51750/eurekakingdb';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
console.log("9");
mongoose.connect(mongooseUri, options);
console.log("10");
var db = mongoose.connection;
console.log("11");
db.on('error', console.error.bind(console, 'connection error:'));
console.log("12");

//Start of MongoRetrevial
var redis = require('redis');
console.log("13");
var client = redis.createClient();
console.log("14");
client.on("error", function(err){
	console.log("redis server cannot be reached" + err);
});
console.log("15");
//var meetupsController = require('./Server/Controllers/meetups-controller');

//app.get('/accesstheVal', meetupsController.list);

app.get('/URL/:UrlValue',function(req, ActualRes){
	console.log("16");
	var FunctionStartTimeVal;
	var CacheTimeVal;
	var DataBaseServerTimeVal;
	

	var hrTime = process.hrtime();
	console.log(hrTime[0] * 1000000 + hrTime[1] / 1000);
	FunctionStartTimeVal = hrTime[0] * 1000000 + hrTime[1] / 1000;
	var cat = "";

console.log("Req received");

client.get(req.param("UrlValue"),function(err,reply)
{
if(err)
{
	console.log("Error in reading values from cache or db"+err)
}
else
{
	if(reply != null)
	{
		console.log(reply);
		//client.expire(req.param("UrlValue"), 1);
		console.log("from Cache Memory");
		console.log("This is the Value of Cache");
		var hrTime2 = process.hrtime();
		console.log(hrTime2[0] * 1000000 + hrTime2[1] / 1000);
		CacheTimeVal = hrTime2[0] * 1000000 + hrTime2[1] / 1000;
		CacheTimeVal = CacheTimeVal - FunctionStartTimeVal;
		reply = reply + "CacheTime:"+CacheTimeVal + "#";
		ReturnVal = reply;
		ActualRes.send({Data : reply});
		//ActualRes.send({Data : reply});
	}
	else
	{
		console.log("Inside else");
		mongo.connect('mongodb://shiva:1234@ds051750.mongolab.com:51750/eurekakingdb', function(err, db) {

		if(err)
		{
			console.log("DEBUG1");
			throw err;	
		} 
		else
		{
			console.log("Inside inner else");
			db.collection("Products", function (err, connection){
				if(err){
					console.log("Theres no database."+err);
					db.close();
				}
				else{						
						console.log("Inside 2nd inner else");
						
							//var xs = req.param('UrlValue');
							//console.log(xs);
							//var xs_nw = JSON.stringify(xs);
							//console.log(xs_nw);						
						db.collection("Products").find({"Url":req.param('UrlValue')}, function(err, res){
							
							console.log(req.param("UrlValue"));
							if(err){
								console.log("No item exist.Error Occured in new process"+err);
								db.close();
							}
							else{

								console.log("Inside 3rd inner else");
								
							//console.log("Into 2nd else statement");
							 
							 //console.log("Value of res.url:"+res.Url);
							 //console.log("Val" + res.toArray());
							 res.toArray(function(err,docs){
							 	console.log("Length of Docs"+docs.length);
							 if(!docs.length==0)
							 {
							 	console.log("Inside Inside");
							// for(var i=0;i<docs.length;i++)
							//{
								console.log("docs[0].Url" +docs[0].Url);
								console.log("req.param('UrlValue')"+req.param('UrlValue'));
								//if(docs[0].Url == req.param("UrlValue"))
								//{
								 cat = docs[0].Url;
								 cat = cat + ("#");
								 //cat = cat + (docs[0].objectName);
								 cat = cat + (docs[0].Item_Name);
								 cat = cat + ("#");
								 cat = cat + (docs[0].Price);
								 cat = cat + ("#");
								 cat = cat + (docs[0].Description);
								 cat = cat + ("#");
								 cat = cat + (docs[0].Image_Url);
								 cat = cat + ("#");
								 //cat = cat + (docs[0].objectImageOne);
								 console.log(cat);
								 console.log("From Database");
								 client.set(docs[0].Url,cat, function(err, reply){
								 	if(!err)
								 	{
								 		client.expire(docs[0].Url, 5);
								 		console.log("This is the Value of DataBase");
								 		var hrTime1 = process.hrtime();
										console.log(hrTime1[0] * 1000000 + hrTime1[1] / 1000);
										DataBaseServerTimeVal = hrTime1[0] * 1000000 + hrTime1[1] / 1000;
										DataBaseServerTimeVal = DataBaseServerTimeVal - FunctionStartTimeVal;
										console.log(DataBaseServerTimeVal);
										cat = cat + "DataBaseServerTime:"+DataBaseServerTimeVal + "#";
										ReturnVal = cat;
										console.log("############################" + cat);
										ActualRes.send({Data : cat});

										//reply = reply + "CacheTime:"+CacheTimeVal + "#";

								 	}

								 });
								//}
								//else
								//{
									console.log("Inside Actual else 1");
								//}
							//}

							 }
							 else{
							 	console.log("Inside Actual else 2");
								cat = ""; 
							 }
							
							
							db.close();
							//ActualRes.send({Data : cat});
							//callback(err,cat);
							 });
	
						}
					});
				}
			});
		}
	});
}
}
});

});


//End of MongoRetrevial


var router = express.Router();
var path = require('path');
var __dirname = "//home/ubuntu/";


app.use('/js', express.static(__dirname + 'firstnodeapp/Client/js'));


app.get('/', function(req,res)
{
	//send the html page
	//res.sendFile(path.join(__dirname, './Client//views//', 'index.html'));
	//console.log("################################ Dir name"+__dirname+'firstnodeapp/Client/views/index.html');
	res.sendFile(__dirname+'/firstnodeapp/Client/views/index.html');
});




app.use(BodyParser.urlencoded({extended : true}));

app.use(BodyParser.json());

app.listen(3000, function(){
console.log("I am connected");
});
