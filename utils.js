function User(props) {
  this.name = props.name;
  this.UUID = props.UUID;
  this.userPosts = props.userPosts;
  this.pfp = props.pfp;
  this.password = props.password;
}

function UserPost(props) {
  this.UUID = props.UUID;
  this.postID = props.postID;
  this.message = props.message;
}

function createNewPost(user, message, injector) {
  const post = new UserPost({
    "UUID": user.UUID,
    "message": message,
    "postID": Math.random(),
  });
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
  ${post.message}
  </div>
</div>
`;
  user.userPosts.push(post.postID);
  injector.innerHTML += newPost;
}

export { User, createNewPost };