// login page
// register page
// posts by different users

import { User, createNewPost } from "./utils.js";

const homePageInjection = document.getElementById('post-wrapper');

const user = new User({
  "name": "Vladimir Putin",
  "UUID": "@itsvladdi",
  "userPosts": [],
  "pfp": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80_%D0%9F%D1%83%D1%82%D0%B8%D0%BD_%2818-06-2023%29_%28cropped%29.jpg/220px-%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80_%D0%9F%D1%83%D1%82%D0%B8%D0%BD_%2818-06-2023%29_%28cropped%29.jpg",
  "password": "blyat"
});

console.log(user);
createNewPost(user, "Putin worked as a KGB foreign intelligence officer for 16 years, rising to the rank of lieutenant colonel before resigning in 1991 to begin a political career in Saint Petersburg. In 1996, he moved to Moscow to join the administration of President Boris Yeltsin.", homePageInjection);
console.log(user);



