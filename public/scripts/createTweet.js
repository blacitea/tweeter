// {/* <ul>
//   <li>
//     <article>
//       <header>
//         <img>user.avatars</img>
//         <p>user.name</p>
//         <p class="handle">user.handle</p>
//       </header>
//       <main>content.text</main>
//       <footer>
//         <p>date stamp</p>
//         <div class='social'>
//           <i>flag</i>
//           <i>retweet</i>
//           <i>heart</i>
//         </div>
//       </footer>
//     </article>
//   </li>
// </ul> */}

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

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
    $('#tweets-container').append($newtweet);
  }
};

$(document).ready(function() {
  console.log("createTweet.js loaded");
  renderTweets(data);
});
