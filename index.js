// login page
// register page
// posts by different users

import {
  createNewPost,
  redirectToPage,
  logInUser,
  createNewUser,
  contentPopulation,
} from "./utils.js";

!localStorage.getItem("users") && localStorage.setItem("users", "");
!localStorage.getItem("posts") && localStorage.setItem("posts", "");
!sessionStorage.getItem("currentUser") &&
  sessionStorage.setItem("currentUser", "");

const loginButton = document.getElementById("login-button");
const registerButton = document.getElementById("register-button");
const homePageInjection = document.getElementById("post-wrapper");
const postSubmitButton = document.getElementById("submit-post");

registerButton && // checking if the current page is on register page: if so, register button will not be null
  registerButton.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    createNewUser({ username: username, password: password });
    console.log(localStorage.getItem("users"));
  });

loginButton && // checking if the current page is on login page
  loginButton.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    logInUser(username, password);
  });

homePageInjection && // checking if the current page is on the home feed page
  (function () {
    if (sessionStorage.getItem("currentUser") === "") {
      alert("Not logged in!");
      redirectToPage("login");
    }
    contentPopulation(homePageInjection);
    console.log(sessionStorage);
  })();

postSubmitButton && postSubmitButton.addEventListener("click", () => {
  const postTextData = document.getElementById("post-text-data").value;
  createNewPost(postTextData, homePageInjection);
});

// homePageInjection &&
//   createNewPost(
//     "Putin worked as a KGB foreign intelligence officer for 16 years, rising to the rank of lieutenant colonel before resigning in 1991 to begin a political career in Saint Petersburg. In 1996, he moved to Moscow to join the administration of President Boris Yeltsin.",
//     homePageInjection
//   );

// verify that read function is operating
// as intended

// if homePage has no sessionStorage("user") => redirect to login
// at login, reference if user && password
// at register, storage user && password

// why not use sessionStorage for user login, and then use localStorage for
// post persistence?

// sessionStorage.setItem('currentUser', user.UUID);

// so persistent read and write operations are only going to be supported
// by localStorage or sessionStorage depending on how long we want to keep it
// persistent for
