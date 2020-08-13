/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const createTweetElement = function(data) {
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const $tweet = `
    <article>
    <header>
      <img src="${data.user.avatars}"></img>
      <p>${data.user.name}</p>
      <p class="handler">${data.user.handle}</p>
    </header>
    <p class="content">${escape(data.content.text)}</p>
    <footer>
      <div class="post-time">${data.created_at}</div>
      <div>
        <i class="fa fa-flag"></i>
        <i class="fa fa-retweet"></i>
        <i class="fa fa-heart"></i>
      </div>
    </footer>
  </article>
  `;
  return $tweet;
};

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    const $newtweet = createTweetElement(tweet);
    $('#tweets-container').prepend($newtweet);
  }
};

const renderError = function(err) {
  const warn = `<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>`;
  const msg = `${warn} ${err} ${warn}`;
  $('#err-msg').html(msg);
  $('.err').slideDown();
};

$(() => {
  $.getJSON(`http://localhost:8080/tweets`)
    .then((tweets) => renderTweets(tweets));
  $('form').submit(function(event) {
    event.preventDefault();
    const contentLen = $(this).children('#tweet-text').val().trim().length;
    if (contentLen > 0 && contentLen <= 140) {
      const serialized = $(this).serialize();
      $.post('http://localhost:8080/tweets', serialized)
        .then(() => {
          $(this).trigger(`reset`);
          $('.err').slideUp();
          return $.getJSON(`http://localhost:8080/tweets`);
        })
        .then((tweets) => renderTweets(tweets));
    } else {
      contentLen > 140 ? renderError(`Tweet max char 140 only!`) : renderError("What are you doing posting an empty tweet?!");
    }
  });
});