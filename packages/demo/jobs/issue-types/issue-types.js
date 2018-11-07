module.exports = {
  onRun: function (config, dependencies, jobCallback) {
    //TODO: create a new widget?
    var request = require('request');
    var options = {
      url: 'https://www.pivotaltracker.com/services/v5/me',
        headers: {
          'X-TrackerToken': '6cfa6ec883d96947c794eb6c24095cb2'
        }
    };
    request(options, callback);

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        var pId = info.projects[1].project_id;
        var storyW = {
          url: 'https://www.pivotaltracker.com/services/v5/projects/' + pId + '/stories',
          headers: {
              'X-TrackerToken': '6cfa6ec883d96947c794eb6c24095cb2'
          }
      };
      request(storyW, getName);
      var iterW = {
        url: 'https://www.pivotaltracker.com/services/v5/projects/' + pId,
        headers: {
            'X-TrackerToken': '6cfa6ec883d96947c794eb6c24095cb2'
        }
    };
      request(iterW, getCurrIter);
          /*for (var i = 0; i < info.projects.length; i++) {
              var pName = info.projects[i].project_name;
              var pId = info.projects[i].project_id;**/
          //}
      }
    }

    function getName(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            if (info[0].story_type == "feature") {
              issues = [{"issueType": info[0].name, "frequency": info[0].estimate}];
            } else {
              issues = [{"issueType": info[0].name, "frequency": info[0].story_type}];
            }
            for (var i = 1; i < info.length; i++) {
              if (info[0].story_type == "feature") {
                issues.push({"issueType": info[i].name, "frequency": info[i].estimate});
              } else {
                issues.push({"issueType": info[i].name, "frequency": info[i].story_type});
              }
            }
            jobCallback(null, {issues: issues, title: config.widgetTitle});
        }
    }

    function getCurrIter(error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log(info[0].current_iteration_number);
      }
    }

  }
};