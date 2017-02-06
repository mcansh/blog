// COLORS
// the 'random' colors
var pages = $('body.error'),
    colors = ['#7C4DFF', 'saddlebrown', 'salmon', 'coral', '#e8308c', '#16a9c7', '#ee6d66', '#110a5c', '#9cf4df', 'orangered', 'black', 'lightseagreen', 'slategray', 'slateblue', 'blueviolet', 'crimson', 'darkslateblue', '#607D8B'];

// apply a number to each color and randomly select it, then store it as a var
var random_color = colors[Math.floor(Math.random() * colors.length)];

// apply variable color value to the page's background
pages.css('background-color', random_color);
var bgcol = pages.css('backgroundColor');

// also apply it to the theme-color (mostly used by android)
$('meta[name=theme-color]').attr('content', bgcol);
