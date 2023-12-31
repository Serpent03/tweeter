const pfps = [
  "https://static.planetminecraft.com/files/image/minecraft/blog/2021/752/14478013-hqdefault_l.jpg",
  "https://www.livemint.com/lm-img/img/2023/09/12/600x338/Putin_1694509884384_1694530249154.jpg",
  "https://www.agri-pulse.com/ext/resources/2022/04/04/Kees_Huizinga.jpg?1649269915",
  "https://upload.wikimedia.org/wikipedia/commons/c/ca/Osama_bin_Laden_portrait.jpg",
  "https://i.scdn.co/image/ab6761610000e5eb5ade2bbfc5fb33914d5ed14f",
  "https://i.kym-cdn.com/entries/icons/medium/000/021/950/Pink_guy.png",
  "https://sm.ign.com/t/ign_in/screenshot/default/mai-sakurajima_1wva.h928@3:4.jpg",
  "https://m.media-amazon.com/images/I/41RJd5vJZ8L._UXNaN_FMjpg_QL85_.jpg",
];

function User(props) {
  this.username = props.username;
  this.UUID = props.UUID || Math.floor(Math.random() * 10000000);
  this.pfp = pfps[Math.floor(Math.random() * pfps.length)];
  this.password = props.password;
}

function UserPost(props) {
  this.username = props.username;
  this.UUID = props.UUID;
  this.pfp = props.pfp;
  this.postID = props.postID;
  this.message = props.message;
}

// wrapper for creating a new user
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

// wrapper function for creating new posts
function createNewPost(message, injector) {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  const post = new UserPost({
    username: user.username,
    pfp: user.pfp,
    UUID: user.UUID,
    message: message,
    postID: Math.floor(Math.random() * 10000000),
  });
  // don't write empty posts into the localStorage
  post.message.length > 1 && writePosts(post);
  redirectToPage("home");
}

// read all posts stored in the localStorage
// returns: (posts.length > 1) ? posts : null
function readPosts() {
  const existingPosts = localStorage.getItem("posts");
  var finalPosts;
  if (existingPosts.length > 1) {
    finalPosts = JSON.parse(existingPosts);
    return finalPosts;
  } else {
    finalPosts = null;
  }
  console.log(`finalPosts: ${finalPosts}`);
  return finalPosts;
}

// write a new post to the localStorage
// returns: void
function writePosts(newPost) {
  const existingPosts = readPosts();
  var finalPosts;
  if (existingPosts == null) {
    finalPosts = JSON.stringify([newPost]);
  } else {
    existingPosts.push(newPost);
    finalPosts = JSON.stringify(existingPosts);
  }
  localStorage.setItem("posts", finalPosts);
}

// log in the user by checking relevant credentials and form details
// returns: void
function logInUser(username, password) {
  // set to sessionStorage here
  if (username == "" || password == "") {
    alert("Fill in the form correctly!");
    return;
  }
  if (getFromLocalStorage("users") == null) {
    alert("DB empty! Please register first.");
    return;
  }
  const existingUsers = getFromLocalStorage("users");
  let isUserRegistered = false;
  let userObject;
  for (let i = 0; i < existingUsers.length && !isUserRegistered; i++) {
    if (existingUsers[i].username == username) {
      isUserRegistered = true;
      userObject = existingUsers[i];
    }
  }

  if (!userObject) {
    alert("User does not exist!");
    return;
  }

  if (password === userObject.password) {
    sessionStorage.setItem("currentUser", JSON.stringify(userObject));
    redirectToPage("home");
  } else {
    alert("Incorrect password!");
  }
}

// read all the posts from the localStorage, and insert into the HTML
// returns: void
function contentPopulation(injector) {
  const pfCards = document.querySelectorAll("[id='static-pfCard']");
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  console.log(currentUser);
  for (var i = 0; i < pfCards.length; i++) {
    let currentPfCard = pfCards[i];
    currentPfCard.children[0].src = currentUser.pfp;
    currentPfCard.children[1].children[0].innerText = currentUser.username;
    currentPfCard.children[1].children[1].innerText = `@${currentUser.UUID}`;
  }
  const returnedPosts = readPosts();
  returnedPosts?.forEach((post) => {
    const newPost = `
    <div class="userPost">
      <div id="pfCard" class="profileCard">
        <img
          id="pfp"
          src="${post.pfp}"
          alt=""
          class="pfp"
        />
        <div class="info">
          <div id="publicName" class="bigName">${post.username}</div>
          <div id="privateName" class="smallName">@${post.UUID}</div>
        </div>
      </div>
      <div class="text">
        ${post.message}
      </div>
    </div>
`;
    injector.innerHTML += newPost;
  });
  // use this to populate the content
}

// redirect to mentioned page
// returns: void
function redirectToPage(param) {
  window.location = `../pages/${param}.html`;
}

// get item from localStorage
// returns: (posts can be JSON) ? json.parse(posts) : null
function getFromLocalStorage(key) {
  console.log(JSON.parse(localStorage.getItem("users")));
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

export {
  createNewPost,
  createNewUser,
  logInUser,
  redirectToPage,
  contentPopulation,
};
