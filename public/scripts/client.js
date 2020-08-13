/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // Avoid XSS
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Turn JSON object to html template
const createTweetElement = function(data) {
  const time = `${moment(data.created_at).toNow(true)} ago`;
  const $tweet = `
    <article>
    <header>
      <img src="${data.user.avatars}"></img>
      <p>${data.user.name}</p>
      <p class="handler">${data.user.handle}</p>
    </header>
    <p class="content">${escape(data.content.text)}</p>
    <footer>
      <div class="post-time">${time}</div>
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
  // Render tweets on page load
  $.getJSON(`http://localhost:8080/tweets`)
    .then((tweets) => renderTweets(tweets));

  // Post tweets on form submit, and render new tweet
  $('form').submit(function(event) {
    event.preventDefault();
    // check the length of tweet
    const contentLen = $(this).children('#tweet-text').val().trim().length;
    if (contentLen > 0 && contentLen <= 140) {
      // prepare and send the form string from the input value
      const serialized = $(this).serialize();
      $.post('http://localhost:8080/tweets', serialized)
        .then(() => {
          // to restore the char count for tweet input
          $(this).trigger(`reset`);
          $('.counter').text(140); // <= better cause no side effect
          //$('textarea').keyup(); // <= if eventlistener changed, would not trigger
          $('.err').slideUp();
          return $.getJSON(`http://localhost:8080/tweets`);
        })
        .then((tweets) => renderTweets(tweets));
    } else {
      contentLen > 140 ? renderError(`Tweet max char 140 only!`) : renderError("What are you doing posting an empty tweet?!");
    }
  });
});

// User can hide/display the write new tweet section
$(() => {
  $('#write-tweet button').click(function() {
    $('.new-tweet').slideToggle();
    $('#tweet-text').focus();
  });
});
