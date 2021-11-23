const menu = document.querySelector(".menu");
const navOpen = document.querySelector(".hamburger");
const navClose = document.querySelector(".close");

form.options.toArray
window.addEventListener('load', (event) => {
  let userAgentString =
    navigator.userAgent;

  // Detect Chrome
  let chromeAgent =
    userAgentString.indexOf("Chrome") > -1;

  // Detect Internet Explorer
  let IExplorerAgent =
    userAgentString.indexOf("MSIE") > -1 ||
    userAgentString.indexOf("rv:") > -1;

  // Detect Firefox
  let firefoxAgent =
    userAgentString.indexOf("Firefox") > -1;

  // Detect Safari
  let safariAgent =
    userAgentString.indexOf("Safari") > -1;

  // Discard Safari since it also matches Chrome
  if ((chromeAgent) && (safariAgent))
    safariAgent = false;

  // Detect Opera
  let operaAgent =
    userAgentString.indexOf("OP") > -1;

  // Discard Chrome since it also matches Opera     
  if ((chromeAgent) && (operaAgent))
    chromeAgent = false;

    if(safariAgent)
    alert(`For best experience disable "Cross Browser Tracking" in the setttings`)


})

const navLeft = menu.getBoundingClientRect().left;
navOpen.addEventListener("click", () => {
  if (navLeft < 0) {
    menu.classList.add("show");
    document.body.classList.add("show");
    navBar.classList.add("show");
  }
});

navClose.addEventListener("click", () => {
  if (navLeft < 0) {
    menu.classList.remove("show");
    document.body.classList.remove("show");
    navBar.classList.remove("show");
  }
});

// Fixed Nav
const navBar = document.querySelector(".nav");
const navHeight = navBar.getBoundingClientRect().height;
window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight) {
    navBar.classList.add("fix-nav");
  } else {
    navBar.classList.remove("fix-nav");
  }
});

// Scroll To
const links = [...document.querySelectorAll(".scroll-link")];
links.map(link => {
  if (!link) return;
  link.addEventListener("click", e => {
    e.preventDefault();

    const id = e.target.getAttribute("href").slice(1);

    const element = document.getElementById(id);
    const fixNav = navBar.classList.contains("fix-nav");
    let position = element.offsetTop - navHeight;

    window.scrollTo({
      top: position,
      left: 0,
    });

    navBar.classList.remove("show");
    menu.classList.remove("show");
    document.body.classList.remove("show");
  });
});

var count = new Date("dec 31,2021 00:01:00").getTime();
var x = setInterval(function () {
  var now = new Date().getTime();
  var d = count - now;

  var days = Math.floor(d / (1000 * 60 * 60 * 24));
  var hours = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((d % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  if (d <= 0) {
    clearInterval(x);
  }
}, 1000);

gsap.from(".logo", { opacity: 0, duration: 1, delay: 0.5, y: -10 });
gsap.from(".hero-img", { opacity: 0, duration: 1, delay: 1.5, x: -200 });
gsap.from(".hero-content h2", { opacity: 0, duration: 1, delay: 2, y: -50 });
gsap.from(".hero-content h1", { opacity: 0, duration: 1, delay: 2.5, y: -45 });
gsap.from(".hero-content a", { opacity: 0, duration: 1, delay: 3.5, y: 50 });
