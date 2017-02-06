var $nav = $('nav'),
    $hamburger = $('.hamburger'),
    $postHeading = $('body:not(home) header h1'),
    $postSubHeading = $('body:not(home) header h2');

// header stuff on load
$(document).ready(function(){
  $('header .header-bg').addClass('animate')
});

// hamburger menu
$hamburger.on('click', function(e) {
  $hamburger.toggleClass('is-active');
  // Do something else, like open/close menu
  $nav.toggleClass('open');
  $('body').toggleClass('younoscroll');
});

$('.post-wrap').click(function(){
  $hamburger.removeClass('is-active');
  $nav.removeClass('open');
  $('body').removeClass('younoscroll');
});


$postHeading.addClass('fadeInUp');
$postSubHeading.addClass('fadeInDown');
