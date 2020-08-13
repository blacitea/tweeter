// User can use back to top button
$(() => {
  $(document).scroll(function() {
    if ($(document).scrollTop() > 20) {
      $('#scroll-top').css("display", "block");
      $('#write-tweet').css("display", "none");
      $(`#scroll-top`).click(function() {
        $(document).scrollTop(0);
        $('.new-tweet').slideDown();
        $('#tweet-text').focus();
      })
    } else {
      $('#scroll-top').css("display", "none");
      $('#write-tweet').css("display", "flex");
    }
  });
});