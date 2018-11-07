function getSalesData(days) {
  // generates some random numbers
  var results = [];
  for (var i = 0; i < days; i++) {
    results[i] = 100 + (-30 + Math.floor(Math.random() * 60));
  }
  return results;
}

module.exports = {
  onRun: function (config, dependencies, jobCallback) {
    //To generate a line graph, simply create an array of numbers and send it through to the linegraph widget
    var request = require('request');
        var options = {
            url: 'https://www.pivotaltracker.com/services/v5/me',
            headers: {
                'X-TrackerToken': '6cfa6ec883d96947c794eb6c24095cb2'
            }
        };
        request(options, currIter);

        function currIter (error, response, body) {
            if (!(!error && response.statusCode == 200)) {
                return;
            }
            var info = JSON.parse(body);
            var pId = info.projects[1].project_id;
            var iterW = {
                url: 'https://www.pivotaltracker.com/services/v5/projects/' + pId + "/history/days",
                headers: {
                    'X-TrackerToken': '6cfa6ec883d96947c794eb6c24095cb2'
                }
            };
            request(iterW, pointAccept);
          }
          function pointAccept (error, response, body) {
            if (!(!error && response.statusCode == 200)) {
                return;
            }
            var info = JSON.parse(body);
            var salesData = [];
            for (var i = 1; i < info.data[0].length - 1; i++) {
                salesData[i-1] = info.data[0][i]
            }
            console.log(salesData);
            jobCallback(null, {linegraph: salesData, title: config.widgetTitle, dataDisplay: "soldToday"});
          }
  }
};