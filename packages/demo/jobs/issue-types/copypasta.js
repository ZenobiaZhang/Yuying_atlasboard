module.exports = {
    onRun: function (config, dependencies, jobCallback) {
        /*issues = [{"issueType": "Test failures", "frequency": 28},
          {"issueType": "Broken build", "frequency": 20},
          {"issueType": "Usability Issue", "frequency": 16},
          {"issueType": "Compilation Error", "frequency": 13},
          {"issueType": "Out of Memory", "frequency": 8},
          {"issueType": "Null Pointer", "frequency": 7},
          {"issueType": "XSS Vulnerability", "frequency": 4}];
          jobCallback(null, {issues: issues, title: config.widgetTitle});**/
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
                for (var i = 0; i < info.projects.length; i++) {
                    var pName = info.projects[i].project_name;
                    var pId = info.projects[i].project_id;
                    var storyW = {
                        url: 'https://www.pivotaltracker.com/services/v5/projects/' + pId + '/stories',
                        headers: {
                            'X-TrackerToken': '6cfa6ec883d96947c794eb6c24095cb2'
                        }
                    };
                    request(storyW, getName);
                }
                //timer(info);
                //forloop(info);
                //console.log(info.projects[0].project_id + " Stars");
                /*issues = [{"issueType": info.projects[0].project_name,
                      "frequency": info.projects[0].project_id}];
                jobCallback(null, {issues: issues, title: pName});**/
                //TODO: you can change to a new project after 1min
            }
        }

        /*function timer(info) {
            setInterval(forloop(info), 6000);
        }*/

        /*function forloop(info) {

        }**/

        //TODO: repeat request to get all the data needed
        //TODO: for loop for printing
        function getName(error, response, body) {
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                //var issues = [];
                /*for (var i = 0; i < 8; i++) {
                    //create js object
                    console.log(info[i].id);
                    issues.push([{"issueType": info[i].name, "frequency": info[i].id}]);
                }**/
                var issues = [{"issueType": info[i].name, "frequency": info[i].id}];
                issues.issueType = info[0].name;
                issues.frequency = info[0].id;
                jobCallback(null, {issues: issues, title: config.widgetTitle});
                /*var storyW = {
                    url: 'https://www.pivotaltracker.com/services/v5/projects/' + pId + '/stories',
                    headers: {
                        'X-TrackerToken': '1150bb9b7d740eb8ac5e6576bcc43a17'
                    }
                };
                request(storyW, getName);**/
            }
        }
    }
};