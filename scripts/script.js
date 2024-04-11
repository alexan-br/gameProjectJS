const logo = document.querySelector('.uso__logo')
const menu = document.querySelector('.menu')

document.addEventListener("DOMContentLoaded", function () {
  logo.addEventListener('click', function () {
    menu.style.display = "initial";
    menu.style.opacity = 1;
    menu.style.animation = "0.2s ease-in-out menuShow";
    logo.style.animation = "0.4s linear infinite beat";
    logo.style.transform = "translateX(-50%)";
  })

  const elementHoverSound = new Audio('/music/soundEffects/pause-hover.ogg');
    const clickElementSound = new Audio('/music/soundEffects/menu-edit-click.ogg');
    
    var hoverObject = document.querySelectorAll("main *:not(.currentCircle)");
    hoverObject.forEach(el => el.addEventListener("mouseenter", function() {
        elementHoverSound.volume = 0.3;
        elementHoverSound.currentTime = 0;
        elementHoverSound.play();
    }))
    hoverObject.forEach(el => el.addEventListener("click", function() {
        clickElementSound.volume = 0.3;
        clickElementSound.currentTime = 0;
        clickElementSound.play();
    }))
})