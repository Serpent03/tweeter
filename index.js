// login page
// register page
// posts by different users

import {
  createNewPost,
  createNewUser,
  logInUser,
  redirectToPage,
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
// look into verifying page URL
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
    // read all the previously made posts, and display them on the post section
    contentPopulation(homePageInjection);
    // after a redirect back to 'home' by the createNewPost() function,
    // we will reload the page in such a way that we scroll to the latest post automatically,
    // giving a better UX
    try {
      const allPosts = document.querySelectorAll(".userPost");
      const latestPost = allPosts[allPosts.length - 1];
      console.log(latestPost);
      latestPost.scrollIntoView(false);
    } catch {
      console.log("NO POSTS!");
    }
  })();

postSubmitButton &&
  postSubmitButton.addEventListener("click", () => {
    const postTextData = document.getElementById("post-text-data").value;
    createNewPost(postTextData, homePageInjection);
  });

// TODO:
// post deletion(through unique POST ID?) -> the procedure is still the same: utilize
// readPosts(), make changes, and then reupdate it as necessary

// check if any new posts have been made(i.e, a change in the localStorage)
// and automatically refresh the page

// will probably be done through the window.EventListener("storage") method


