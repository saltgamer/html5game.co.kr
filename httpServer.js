
var express = require('express'),
    app = express(), 
    port = process.env.PORT || 7777;

    app.use(express.static(__dirname + '/public'));

var router = express.Router();

    router.use(function (request, response, next) {
        console.log(request, response);
    });
 	
 	app.use('/', router);

var server = app.listen(port, function () {
    console.log('server running at http://127.0.0.1:' + port);
});
