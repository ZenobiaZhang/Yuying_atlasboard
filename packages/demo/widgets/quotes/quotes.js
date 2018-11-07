widget = {

  onData: function (el, data) {
    if (data.title) {
      $('h2', el).text("story types in the project");
    }
    if(data.due) {
      $('due', el).text("Due Date:" + data.due);
    }

    var $content = $('.content', el);
    $content.empty();

    if (data.issues.length) {
      data.issues.forEach(function (issue) {
        $content.append(
            "<div class='item-container'>" +
              "<div class='issue'>" + issue.issueType + "</div>" +
              "<div class='count'>" + issue.frequency + "</div>" +
            "</div>"
        );
      })
    }
  }
};