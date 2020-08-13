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
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
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
          return $.getJSON(`http://localhost:8080/tweets`);
        })
        .then((tweets) => renderTweets(tweets));
    } else {
      contentLen > 140 ? alert("Tweet max char 140 only! Try our TinyApp to shorten your URLs") : alert("What are you doing posting an empty tweet?!");
    }
  });
});