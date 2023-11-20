// function search() {
//   var input = document.getElementById("searchBar").value;
//   // Perform search functionality using the input value
//   // Example:
//   alert("You searched for: " + input);
// }

const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

// const scrollreveal = require("scrollreveal");

const userWrap = document.getElementById("subMenu");

function toggleMenu() {
  if (userWrap.style.maxHeight === "0px") {
    userWrap.style.transition = "max-height 0.5s, visibility 0.5s";
    userWrap.style.maxHeight = "300px";
    userWrap.style.visibility = "visible";
  } else {
    userWrap.style.transition = "max-height 0.5s, visibility 0.5s";
    setTimeout(() => {
      userWrap.style.maxHeight = "0px";
      userWrap.style.visibility = "hidden";
    }, 50);
  }
}

function scrollToSection() {
  const section = document.querySelector("#section2");
  section.scrollIntoView({ behavior: "smooth" });
}

