// you scrolled HOW MUCH?

$(window).scroll(function () {
  var s = $(window).scrollTop(),
      d = $(document).height(),
      c = $(window).height(),
      scrollPercent = (s / (d-c)) * 100,
      YouReadThisMuch = scrollPercent;

  $('.progress progress').attr('value', YouReadThisMuch);

});
