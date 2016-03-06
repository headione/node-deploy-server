var express = require('express'),
    http = require('http'),
    app = express();

app.set('port', process.env.PORT || 8080);

app.post('/deploy/', function (req, res) {
    var spawn = require('child_process').spawn;
    var run_script = function(){
        deploy = spawn('sh', [ './deploy.sh' ])
        deploy.stdout.on('data', function (data) {
            console.log(''+data);
        });

        deploy.on('close', function (code) {
            console.log('Child process exited with code ' + code);
        });
        res.json(200, {message: 'Github Hook received!'})
    };

    // Delayed call because new source is not available immmediately after webhook
    setTimeout(run_script, 3000)
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
