widget = {
  onData: function (el, data) {
    if (data.title) {
      $('h2', el).text(data.title);
    }

    $('.content', el).html(
        "<img class='featured-image' src='" + data.imageSrc + "'/>"
    );

    if (data.imgTit) {
        $('.tit', el).text(data.imgTit);
    }

    $('.name', el).text("");
    setTimeout(function(){
        if (data.imgName) {
            $('.name', el).text(data.imgName);
        }
    }, 3000)


  }
};