$("li").hover(
  function() {
    $(this).addClass("shadow");
    $(this).find(".handler").removeClass("fade");
  },
  function() {
    $(this).removeClass("shadow");
    $(this).find(".handler").addClass("fade");
  }
);
