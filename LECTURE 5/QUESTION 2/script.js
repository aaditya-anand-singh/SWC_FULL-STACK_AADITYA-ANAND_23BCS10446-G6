// Gather structural display targets
const hoursSegment = document.getElementById("hours");
const minutesSegment = document.getElementById("minutes");
const secondsSegment = document.getElementById("seconds");
const msSegment = document.getElementById("milliseconds");

// Interactivity buttons references
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");

// Operational State Machine Parameter Properties
let timerIntervalId = null;
let startTimeStamp = 0;
let accumulatedElapsedTime = 0;
let isCurrentlyRunning = false;

// --- DYNAMIC CALCULATIONS & DRAW LIFE ENGINE ---
function updateStopwatchTime() {
  // Formula: Exact present epoch milliseconds minus starting anchor timestamp, plus prior history bounds
  const currentDeltaTime = Date.now() - startTimeStamp + accumulatedElapsedTime;

  // Derive granular breakdown increments via standard chronological modular algebra
  const totalMilliseconds = Math.floor(currentDeltaTime % 1000);
  const totalSeconds = Math.floor((currentDeltaTime / 1000) % 60);
  const totalMinutes = Math.floor((currentDeltaTime / (1000 * 60)) % 60);
  const totalHours = Math.floor(currentDeltaTime / (1000 * 60 * 60));

  // Inject padded structural string metrics onto document nodes
  hoursSegment.textContent = String(totalHours).padStart(2, "0");
  minutesSegment.textContent = String(totalMinutes).padStart(2, "0");
  secondsSegment.textContent = String(totalSeconds).padStart(2, "0");
  msSegment.textContent = "." + String(Math.floor(totalMilliseconds / 10)).padStart(2, "0");
}

// --- LIFE ACTION EVENT HANDLERS ---

function startStopwatch() {
  isCurrentlyRunning = true;
  startTimeStamp = Date.now(); // Plant current timestamp coordinate anchor points
  
  // Fire animation paint refresh loops at high frequency (approx 60fps) for fluid visual tracking
  timerIntervalId = setInterval(updateStopwatchTime, 16);

  // Update button presentation states
  startPauseBtn.textContent = "Pause";
  startPauseBtn.classList.add("running");
  resetBtn.disabled = true; // Lock down reset while clock counts active streams
}

function pauseStopwatch() {
  isCurrentlyRunning = false;
  clearInterval(timerIntervalId);

  // Cache final delta time parameters into our baseline accumulator space
  accumulatedElapsedTime += Date.now() - startTimeStamp;

  // Clear tracking references and restore control hooks
  startPauseBtn.textContent = "Resume";
  startPauseBtn.classList.remove("running");
  resetBtn.disabled = false;
}

function resetStopwatch() {
  // Clear all application tracking states safely back to initial conditions
  isCurrentlyRunning = false;
  clearInterval(timerIntervalId);
  timerIntervalId = null;
  startTimeStamp = 0;
  accumulatedElapsedTime = 0;

  // Repaint UI segments to absolute zero lines
  hoursSegment.textContent = "00";
  minutesSegment.textContent = "00";
  secondsSegment.textContent = "00";
  msSegment.textContent = ".00";

  // Restore button control baselines
  startPauseBtn.textContent = "Start";
  startPauseBtn.classList.remove("running");
  resetBtn.disabled = true;
}

// --- HOOK USER INPUT TRIGGERS ---
startPauseBtn.addEventListener("click", () => {
  if (isCurrentlyRunning) {
    pauseStopwatch();
  } else {
    startStopwatch();
  }
});

resetBtn.addEventListener("click", resetStopwatch);