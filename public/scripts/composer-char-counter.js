$(document).ready(function() {
  // --- our code goes here ---
  console.log("DOM is ready");
  $('textarea').keyup(function() {
    let charRemain = 140 - this.value.length;
    if (charRemain < 0) {
      $('output').css("color", "red");
    } else {
      $('output').removeAttr("style");
    }
    $('output').html(140 - this.value.length);
  });
});
