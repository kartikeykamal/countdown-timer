let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // Clear any existing timers
  clearInterval(countdown);
  
  // Visual feedback when starting a new timer
  animateTimerStart();

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    
    if(secondsLeft < 0) {
      clearInterval(countdown);
      // Add visual feedback when timer ends
      animateTimerEnd();
      return;
    }
    
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  document.title = display;
  
  // Smooth transition between numbers
  timerDisplay.textContent = display;
  
  // Visual effect for countdown
  if (seconds <= 10) {
    timerDisplay.classList.add('ending');
  } else {
    timerDisplay.classList.remove('ending');
  }
  
  // Pulse effect on each second change
  timerDisplay.classList.add('pulse');
  setTimeout(() => timerDisplay.classList.remove('pulse'), 200);
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
}

function animateTimerStart() {
  // Add a class for animation
  timerDisplay.classList.add('start');
  endTime.classList.add('start');
  
  // Remove the class after animation completes
  setTimeout(() => {
    timerDisplay.classList.remove('start');
    endTime.classList.remove('start');
  }, 500);
  
  // Animate the circle
  const circle = document.querySelector('.display__circle');
  circle.classList.add('active');
  setTimeout(() => circle.classList.remove('active'), 500);
}

function animateTimerEnd() {
  timerDisplay.classList.add('end');
  endTime.classList.add('end');
  
  // Flash effect
  const display = document.querySelector('.display');
  display.classList.add('flash');
  setTimeout(() => {
    display.classList.remove('flash');
    timerDisplay.classList.remove('end');
    endTime.classList.remove('end');
  }, 1000);
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  
  if (!mins || isNaN(mins)) {
    // Shake effect for invalid input
    this.classList.add('shake');
    setTimeout(() => this.classList.remove('shake'), 500);
    return;
  }
  
  timer(mins * 60);
  this.reset();
});
