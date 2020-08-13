$(document).ready(function() {
  // calculate remaining char count on keyup
  $('textarea').keyup(function() {
    let charRemain = 140 - $(this).val().trim().length;
    let counter = $(this).siblings().children('.counter');
    charRemain < 0 ? counter.css("color", "red") : counter.removeAttr("style");
    counter.text(charRemain);
  });
});
