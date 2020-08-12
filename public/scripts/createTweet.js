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

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

$(document).ready(function() {
  console.log("createTweet.js loaded");
  const createTweetElement = function(data) {
    const $tweet = `
      <article>
      <header>
        <img src="${data.user.avatars}"></img>
        <p>${data.user.name}</p>
        <p class="handler">${data.user.handle}</p>
      </header>
      <article>${data.content.text}</article>
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

  const $newtweet = createTweetElement(tweetData);

  console.log($newtweet);
  $('#tweets-container').append($newtweet);

});