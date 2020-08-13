/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(data) {
  const $tweet = `
    <article>
    <header>
      <img src="${data.user.avatars}"></img>
      <p>${data.user.name}</p>
      <p class="handler">${data.user.handle}</p>
    </header>
    <p class="content">${data.content.text}</p>
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
  $('form').submit(function(event) {
    event.preventDefault();
    const serialized = $(this).serialize();
    console.log(serialized);
    $.post('http://localhost:8080/tweets', serialized);
    $.getJSON(`http://localhost:8080/tweets`)
      .then((tweets) => renderTweets(tweets));

  });
});