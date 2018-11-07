module.exports = {
    onRun: function (config, dependencies, jobCallback) {
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
                url: 'https://www.pivotaltracker.com/services/v5/projects/' + pId,
                headers: {
                    'X-TrackerToken': '6cfa6ec883d96947c794eb6c24095cb2'
                }
            };
            request(iterW, printCurr);
            function printCurr(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var info = JSON.parse(body);
                    var num = info.current_iteration_number;
                }
                var storyW = {
                    url: 'https://www.pivotaltracker.com/services/v5/projects/' + pId + '/iterations',
                    headers: {
                        'X-TrackerToken': '6cfa6ec883d96947c794eb6c24095cb2'
                    }
                };
                request(storyW, callBack)
                function callBack(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var info = JSON.parse(body);
                        var json = info[num - 1].stories;
                        var feaCount = 0, bugCount = 0, choreCount = 0;
                        for (var i = 0; i < json.length; i++) {
                            if (json[i].story_type == "feature") {
                                feaCount += 1;
                            } else if (json[i].story_type == "bug") {
                                bugCount += 1;
                            } else {
                                choreCount += 1;
                            }
                        }
                        issues = [{"issueType": "feature", "frequency": feaCount}];
                        issues.push({"issueType": "bug", "frequency": bugCount});
                        issues.push({"issueType": "chore", "frequency": choreCount});
                        var dueDate = info[num].stories.finish;
                        jobCallback(null, {issues: issues, title: config.widgetTitle, due: dueDate});
                    }
                }
            }

            
        }
    }
};