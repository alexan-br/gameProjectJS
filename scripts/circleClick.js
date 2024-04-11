document.addEventListener("DOMContentLoaded", () => {

  // Function to show overlay and countdown
  function showOverlay() {
    var overlay = document.getElementById("waitingOverlay");
    var countdownElement = document.getElementById("countdown");
    overlay.style.display = "flex";
    overlay.style.transition = "opacity 0.5s";
    overlay.style.opacity = 1;
    // Fade out overlay after 5 seconds
    setTimeout(function() {
        overlay.style.transition = "opacity 0.5s";
        overlay.style.opacity = 0;
    }, 4000);

    // Countdown from 3 to 0 after 5 seconds
    setTimeout(function() {
      var countdown = 3;
      var countdownInterval = setInterval(function() {
        countdownElement.innerHTML = countdown;
        countdown--;
            
        countdownElement.style.opacity = 1; // Ensure opacity reset
        // Apply opacity transition
        setTimeout(function() {
          countdownElement.style.transition = "opacity 0.2s";
          countdownElement.style.opacity = 0;
        }, 100);

        if (countdown < 1) {
          clearInterval(countdownInterval);
          //song plays
          setTimeout(function() {
            song.muted = false;
            song.volume = 0.1;
            song.play();
  
            //circles creation
            circles.forEach(function(circle) {
              createCircle(circle.delay, circle.number, circle.top, circle.left);
            });
            
  
            //healthbar
            requestAnimationFrame(healthBarLoop);
          }, 1000)
        }
      }, 500);
    }, 3900);
  }

  function checkHealthGameOver() {
    if (currentHealth <= 0) {
      console.log("gameover")
    }
  }
  
  // Call the function on page load
  window.onload = function() {
    showOverlay();

    
    // Check if health is equal to 0
    setTimeout(checkHealthGameOver, 100);
  };
  var circlesCreated = 0;

  let maxHealth = 100;
  let currentHealth = maxHealth;
  const healthBar = document.getElementById("healthbar");
  let combo = 0;
  let score = 0;

  var startTime;

  const scoreLayout = document.getElementById('score');
  const comboLayout = document.getElementById('combo');

  const song = document.getElementById('song');
  song.pause();

  const hitSound = new Audio('/music/soundEffects/soft-hitnormal.ogg');
  const comboBreakSound = new Audio('/music/soundEffects/combobreak.ogg');
  const elementHoverSound = new Audio('/music/soundEffects/pause-hover.ogg');
  const clickElementSound = new Audio('/music/soundEffects/menu-edit-click.ogg');


  let formattedScore = score.toString().padStart(8,"0")
  scoreLayout.innerHTML = formattedScore

  var circles = [
    {delay : 0, number: 1, top: "400px", left: "200px"},
    {delay : 0.1, number: 2, top: "500px", left: "500px"},
    {delay : 0.2, number: 3, top: "600px", left: "400px"},
    {delay : 0.4, number: 4, top: "700px", left: "400px"},
    {delay : 5, number: 5, top: "750px", left: "400px"},
  ]
  const game = document.querySelector('.game');
  function createCircle(delay, number, top, left) {
    setTimeout(function() {
      let circle = document.createElement('div');
      var timingCircle = document.createElement('div');
      var circleClicked = false;
  
      circle.className = 'currentCircle';
      circle.tabIndex = 0;
      circle.innerHTML = number;
      circle.style.top = top;
      circle.style.left = left;
  
      timingCircle.className = 'timingCircle';
  
      circle.style.zIndex = 1000 - game.childElementCount;
  
      game.appendChild(circle);
      circle.appendChild(timingCircle);

      circlesCreated++;

      circle.startTime = new Date().getTime();
      
      circle.addEventListener("click", handleCircleClick);

      circle.addEventListener("mouseenter", () => {
        circle.focus();
      })
      circle.addEventListener("mouseleave", () => {
        circle.blur();
      })
  
      circle.addEventListener("keypress", handleCircleClick);

      let rating = document.createElement('div');
      rating.className = "rating";
      circle.appendChild(rating);
  
      function handleCircleClick () {
        // comboLayout.style.transform = "scale(1.5)"
        hitSound.volume = 0.1;
        hitSound.currentTime = 0;
        hitSound.play();
        function timingEvents (timeElapsed) {
          
          switch (true) {
            case (timeElapsed < 0.3):
              rating.classList.add("miss_rating")
              rating.innerHTML = "50"
              combo = 0;
              circle.style.pointerEvents = "none";
              circle.style.animation = "vanish 0.3s linear forwards";
              currentHealth -= 2;
              break;
            case (timeElapsed < 0.5):
              rating.classList.add("meh_rating")
              rating.innerHTML = "50"
              score = score + 50 + combo * 2;
              combo++;
              circle.style.pointerEvents = "none";
              circle.style.animation = "vanish 0.3s linear forwards";
              currentHealth -= 0.2;
              break;
            case (timeElapsed < 0.95):
              rating.classList.add("good_rating")
              rating.innerHTML = "100"
              score = score + 100 + combo * 2;
              combo++;
              circle.style.pointerEvents = "none";
              circle.style.animation = "vanish 0.3s linear forwards";
              currentHealth += 2;
              break;
            case (timeElapsed < 1.05):
              rating.innerHTML = "Perfect";
              score = score + 300 + combo * 2;
              combo++;
              circle.style.pointerEvents = "none";
              circle.style.animation = "vanish 0.3s linear forwards";
              currentHealth += 5;
              break;
            case (timeElapsed < 1.2):
              rating.classList.add("good_rating")
              rating.innerHTML = "100"
              score = score + 100 + combo * 2;
              combo++;
              circle.style.pointerEvents = "none";
              circle.style.animation = "vanish 0.3s linear forwards";
              currentHealth += 2;
              break;
            case (timeElapsed < 1.5):
              rating.classList.add('meh_rating')
              rating.innerHTML = "50"
              score = score + 50 + combo * 2;
              combo++;
              circle.style.pointerEvents = "none";
              circle.style.animation = "vanish 0.3s linear forwards";
              currentHealth -= 0.2;
              break;
            case (timeElapsed >= 1.5):
              combo = 0
              circle.style.pointerEvents = "none";
              circle.style.animation = "vanish 0.3s linear forwards";
              currentHealth -= 2;
              break;
          }
        }
        circle["clickTime"] = new Date().getTime() - circle.startTime;
        timingEvents(circle.clickTime / 1000);
        circleClicked = true;
        let formattedScore = score.toString().padStart(8,"0")
        scoreLayout.innerHTML = formattedScore;
        comboLayout.innerHTML = "x" + combo;
      }
      setTimeout(() => {
        if (!circleClicked){
          rating.classList.add("miss_rating")
          rating.innerHTML = "X"
          circle.style.pointerEvents = "none";
          circle.style.animation = "vanish 0.3s linear forwards";
          combo = 0;
          currentHealth -= 2;
          comboLayout.innerHTML = "";
        }
      }, 1250)
      if (circlesCreated === circles.length) {
        console.log('end of map');
      }
    }, delay * 1000); // Convert delay to milliseconds
  }

  function updateHealthBar() {
    let healthPercentage = (currentHealth / maxHealth) * 100;
    // Cap the health percentage at 100%
    healthPercentage = Math.min(healthPercentage, 100);
    healthBar.style.width = healthPercentage + "%";
  }


  function healthBarLoop() {
    currentHealth -= 0.03;
    if (currentHealth < 0) {
      currentHealth = 0;
    }
    if (currentHealth == 0) {
      console.log('gameover')
    }
    updateHealthBar();
    requestAnimationFrame(healthBarLoop);
  }

  // Create circles for each object in the array  
  const startButton = document.querySelector('.start');

  startButton.addEventListener('click', function() {
    //start button disappearance
    startButton.style.display = "none";

    //song plays
    song.muted = false;
    song.volume = 0.1;
    song.play();

    //circles creation
    circles.forEach(function(circle) {
      createCircle(circle.delay, circle.number, circle.top, circle.left);
    });

    //healthbar
    requestAnimationFrame(healthBarLoop);

    //pause-unpause behaviour
    document.addEventListener("keydown", function(e) {
      if(e.key === "Escape") {
        if(song.paused) {
          song.play();
        } else {
          song.pause();
        }
      }
    });
  })
})
