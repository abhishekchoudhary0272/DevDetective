const search = document.querySelector(".search-btn");
const root = document.documentElement.style;
const noresults = document.querySelector("#no-results");
const btnmode =  document.querySelector("#btn-mode");
const modetext =  document.querySelector("#mode-text");
const modeicon =  document.querySelector("#mode-icon");
const url = "https://api.github.com/users/";
const Name = document.querySelector(".name")
const userName = document.querySelector(".username")
const joinedDate = document.querySelector(".joined-date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bio = document.querySelector(".user-bio");
const avatar = document.querySelector(".profile-image");
const followersCount = document.querySelector(".followers");
const followingCount = document.querySelector(".following");
const repoCount = document.querySelector(".repo-count");
const loc = document.querySelector(".location");
const twitter = document.querySelector(".twitter-handle");
const link = document.querySelector(".live-link");
const Company = document.querySelector(".company-name");
let darkMode = false;





search.addEventListener("click",()=>
{
    if(input.value !=="")
    {
        fetchProfileDetails(url+input.value);
    }
});
input.addEventListener(
    "keydown",
    function (e) {
      if (e.key == "Enter") {
        if (input.value !== "") {
          fetchProfileDetails(url + input.value);
        }
      }
    },
    false
  );

  
  input.addEventListener("input", function () {
    noresults.style.display = "none";
  });

  btnmode.addEventListener("click",  ()=> {
    if (darkMode == false) {
      darkModeProperties();
      console.log('dark mode');
    } else {
      lightModeProperties();
      console.log('light mode');
    }
  });



async function fetchProfileDetails(giturl) {
     try{
        let response = await fetch(giturl);
        let data = await response.json();
        updateProfile(data);
     }
     catch(err)
     {
        console.log("this is error");
     }
};

function updateProfile(data) {
    if (data.message !== "Not Found") {
        noresults.style.display = "none";
        function checkNull(param1, param2) {
          if (param1 === "" || param1 === null) {
            param2.style.opacity = 0.5;
            param2.previousElementSibling.style.opacity = 0.5;
            return false;
          } else {
            return true;
          }
        }

    avatar.src = `${data.avatar_url}`;
    data.bio == null?bio.textContent = "This profile has no bio":bio.textContent = data.bio;
    Name.textContent = data.name;
    userName.textContent =`@${data.login}`;
    userName.href =`${data.html_url}`;
    followersCount.textContent = data.followers;
    followingCount.textContent = data.following;
    repoCount.textContent = data.public_repos;
    data.location == null?loc.textContent = "Not available":loc.textContent = data.location;
    data.blog == ""?link.textContent = "Not available":link.textContent = data.blog;  
    data.twitter_username == null?twitter.textContent ="Not available":twitter.textContent = data.twitter_username;
    data.twitter_username == null?twitter.href ="Not available":twitter.href = `https://twitter.com/${data.twitter_username}`;
    data.company == null ? Company.textContent = "Not Available":Company.textContent = data.company;
    datesegments = data.created_at.split("T").shift().split("-");
    joinedDate.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
    console.log(data);
    }
    else {
        noresults.style.display = "block";
      }
};

// dark mode default
const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

if (localStorage.getItem("dark-mode")) {
  darkMode = localStorage.getItem("dark-mode");
  darkModeProperties();
} else {
  localStorage.setItem("dark-mode", prefersDarkMode);
  darkMode = prefersDarkMode;
  lightModeProperties();
}

function darkModeProperties() {
  root.setProperty("--lm-bg", "#141D2F");
  root.setProperty("--lm-bg-content", "#1E2A47");
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  modetext.innerText = "LIGHT";
  modeicon.src = "assets/sun-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(1000%)");
  darkMode = true;
  localStorage.setItem("dark-mode", true);
}
function lightModeProperties() {
  root.setProperty("--lm-bg", "#F6F8FF");
  root.setProperty("--lm-bg-content", "#FEFEFE");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  modetext.innerText = "DARK";
  modeicon.src = "assets/moon-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(100%)");
  darkMode = false;
  localStorage.setItem("dark-mode", false);
}

fetchProfileDetails(url+"abhishekchoudhary0272");