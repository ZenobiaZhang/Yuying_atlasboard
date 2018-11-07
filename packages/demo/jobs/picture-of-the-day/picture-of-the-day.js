module.exports = {
  onRun: function (config, dependencies, jobCallback) {
      dependencies.easyRequest.JSON(config.url, function (err, body) {
          if (err) {
              var errMsg = err || "ERROR: Couldn't access the web page at " + config.url;
              jobCallback(errMsg);
          } else {
              timer();
          }
          var parsejson = JSON.parse(JSON.stringify(body));
          function timer(){
              setInterval(nextppl, 6000);
          }
          function nextppl () {
              var x = Math.floor(Math.random() * (parsejson.length - 1))
              //x = (x == parsejson.length - 1) ? 0 : x + 1;
              var net = parsejson[x].headshot.url;
              var name = parsejson[x].firstName + " " + parsejson[x].lastName;
              var tit = parsejson[x].jobTitle;
              jobCallback(null, {title: config.widgetTitle, imageSrc: net, imgName: name, imgTit: tit});
              //setTimeout(printName(net, name), 5000);
              //printName(net, name, tit);//picture should show up immediately
          }
          function printName(net, name, tit) {
              var txt = "";
              for (var i = 0; i < name.length; i++) {
                  (function(j){
                      setTimeout(function(){
                          txt += name[j];
                          jobCallback(null, {title: config.widgetTitle, imageSrc: net, imgName: name, imgTit: tit});
                      }, 1000 * i)
                  })(i);
              }
          }
      });
  }
};
