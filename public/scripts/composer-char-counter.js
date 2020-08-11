$(document).ready(function() {
  // --- our code goes here ---
  console.log("DOM is ready");
  $('textarea').keyup(function() {
    let charRemain = 140 - $(this).val().length;
    let counter = $(this).siblings().children('.counter');
    charRemain < 0 ? counter.css("color", "red") : counter.removeAttr("style");
    counter.html(charRemain);
  });
});
