// login page
// register page
// posts by different users

import { User, createNewPost, redirectToPage, createNewUser } from "./utils.js";

!localStorage.getItem("users") && localStorage.setItem("users", [""]);
!localStorage.getItem("posts") && localStorage.setItem("posts", [""]);

const loginButton = document.getElementById("login-button");
const registerButton = document.getElementById("register-button");
const homePageInjection = document.getElementById('post-wrapper');

registerButton && registerButton.addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  createNewUser({ username: username, password: password });
  console.log(localStorage.getItem("users"));
})

loginButton && loginButton.addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  // verifying logic in here.
  console.log(username, password);
  redirectToPage("home");
})

homePageInjection && function () {
  if (!sessionStorage.getItem("currentUser")) {
    alert("Not logged in!");
    redirectToPage("login");
  }
  // read recent posts and make necessary changes to the
  // html boilerplate
  console.log(sessionStorage);
}();

// if homePage has no sessionStorage("user") => redirect to login
// at login, reference if user && password
// at register, storage user && password

const user = new User({
  "username": "Vladimir Putin",
  "UUID": "@itsvladdi",
  "userPosts": [],
  "pfp": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80_%D0%9F%D1%83%D1%82%D0%B8%D0%BD_%2818-06-2023%29_%28cropped%29.jpg/220px-%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80_%D0%9F%D1%83%D1%82%D0%B8%D0%BD_%2818-06-2023%29_%28cropped%29.jpg",
  "password": "blyat"
});

(homePageInjection) && createNewPost(user, "Putin worked as a KGB foreign intelligence officer for 16 years, rising to the rank of lieutenant colonel before resigning in 1991 to begin a political career in Saint Petersburg. In 1996, he moved to Moscow to join the administration of President Boris Yeltsin.", homePageInjection);

// why not use sessionStorage for user login, and then use localStorage for
// post persistence?

// sessionStorage.setItem('currentUser', user.UUID);

// so persistent read and write operations are only going to be supported
// by localStorage or sessionStorage depending on how long we want to keep it
// persistent for

