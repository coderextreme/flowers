var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
var path = require('path');

var fs = require("fs");
app.use(express.static('src/main'));
app.use(express.static('src/main/data'));
app.use(express.static('src/main/resources'));
app.use(express.static('src/main/shaders'));

function send(res, data, type, next) {
	sendNoNext(res, data, type);
	next();
}

function sendNoNext(res, data, type) {
	console.error("Type", type);
	try {
		if (!type.startsWith("image/")) {
			res.header("Content-Type", type);
		}
	} catch (e) {
		console.error(e);
	}
	res.send(data);
}

function magic(path, type) {
    app.get(path, function(req, res, next) {
	var url = req._parsedUrl.pathname;
	while (url.startsWith("/")) {
		url = url.substr(1);
	}
	console.error("Requested", url);
	var data = fs.readFileSync(__dirname+"/"+url);
	if (type.startsWith("image") || type.startsWith("audio") || type.startsWith("video")) {
		sendNoNext(res, data, type);
	} else {
		sendNoNext(res, data.toString(), type);
	}
    });
}

magic("*.gif", "image/gif");
magic("*.jpg", "image/jpeg");
magic("*.JPG", "image/jpeg");
magic("*.jpeg", "image/jpeg");
magic("*.png", "image/png");
magic("*.vs", "text/plain");//"x-shader/x-vertex");
magic("*.fs", "text/plain");//"x-shader/x-fragment");
magic("*.js", "text/javascript");
magic("*.xhtml", "application/xhtml+xml");
magic("*.html", "text/html");
magic("*.x3d", "model/x3d+xml");
magic("*.json", "text/json");

app.get("/", function(req, res, next) {
	var data = fs.readFileSync(__dirname+"/src/main/html/flowers.xhtml");
	sendNoNext(res, data.toString(), "application/xhtml+xml");
});

app.listen(port);
