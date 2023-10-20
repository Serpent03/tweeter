function User(props) {
  this.username = props.username;
  this.UUID = props.UUID || Math.floor(Math.random() * 10000000);
  this.userPosts = [];
  this.pfp = props.pfp || "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/04b39dd6-088f-4f1b-9494-c93b44e1a2a6/dehj0er-3fb11ae6-06bb-404c-ae06-0f37f32dcf87.png/v1/fill/w_1280,h_1280,q_80,strp/default__pfp_dino_by_offlinedino_dehj0er-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcLzA0YjM5ZGQ2LTA4OGYtNGYxYi05NDk0LWM5M2I0NGUxYTJhNlwvZGVoajBlci0zZmIxMWFlNi0wNmJiLTQwNGMtYWUwNi0wZjM3ZjMyZGNmODcucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.P_w8j9uPcf02Lg08Ckxrr03fa0zHKAgKdYLTHKeyx38";
  this.password = props.password;
}

function UserPost(props) {
  this.UUID = props.UUID;
  this.postID = props.postID;
  this.message = props.message;
}

function createNewUser(props) {
  const newUser = new User(props);
  if (newUser.username == "" || newUser.password == "") {
    alert("Fill in the form correctly!");
    return;
  }
  const existingUsers = localStorage.getItem("users");
  var finalUsers;
  if (existingUsers.length > 1) {
    finalUsers = JSON.parse(existingUsers);
    let isUserRegistered = false;
    for (var i = 0; i < finalUsers.length && !isUserRegistered; i++) {
      isUserRegistered = newUser.username === finalUsers[i].username;
    }
    if (!isUserRegistered) {
      finalUsers.push(newUser);
      finalUsers = JSON.stringify(finalUsers);
    } else {
      alert("User is already registered!");
      finalUsers = JSON.stringify(finalUsers);
    }
  } else {
    finalUsers = JSON.stringify([newUser]);
  }
  localStorage.setItem("users", finalUsers);
  redirectToPage("login");
}

function createNewPost(user, message, injector) {
  const post = new UserPost({
    "UUID": user.UUID,
    "message": message,
    "postID": Math.floor(Math.random() * 10000000),
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
      <div id="publicName" class="bigName">${user.username}</div>
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

function redirectToPage(param) {
  window.location = `../pages/${param}.html`;
}

function pushToLocalStorage() {

}

export { User, createNewPost, createNewUser, redirectToPage };