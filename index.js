// login page
// register page
// posts by different users

const injectionArea = document.getElementById('post-wrapper');

function User(props) {
  this.name = props.name;
  this.UUID = props.UUID;
  this.userPosts = props.userPosts;
  this.pfp = props.pfp;
  this.password = props.password;
}

function UserPost(props) {
  this.UUID = props.UUID;
  this.message = props.message;
}

const user = new User({
  "name": "Vladimir Putin",
  "UUID": 24151245,
  "userPosts": null,
  "pfp": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80_%D0%9F%D1%83%D1%82%D0%B8%D0%BD_%2818-06-2023%29_%28cropped%29.jpg/220px-%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80_%D0%9F%D1%83%D1%82%D0%B8%D0%BD_%2818-06-2023%29_%28cropped%29.jpg",
  "password": "blyat"
});

const userPost = new UserPost({
  "UUID": user.UUID,
  "message": "cyka blyat"
});

function newPost(user, userPost) {
  const newPost = `
  <div class="userPost">
  <div id="pfCard" class="profileCard">
    <img
      id="pfp"
      src="${user.pfp}"
      alt=""
      class="pfp"
    />
    <div class="info">
      <div id="publicName" class="bigName">${user.name}</div>
      <div id="privateName" class="smallName">${user.UUID}</div>
    </div>
  </div>
  <div class="text">
  ${userPost.message}
  </div>
</div>
`;
  injectionArea.innerHTML += newPost;
}

console.log(user);
console.log(userPost);

newPost(user, userPost);



