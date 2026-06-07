// DOM Core Target Elements
const container = document.getElementById("productCarousel");
const track = document.getElementById("carouselTrack");
const slides = Array.from(track.children);
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const indicatorsContainer = document.getElementById("indicatorsContainer");

// Application Configuration States
let currentIndex = 0;
let slideIntervalId = null;
const SLIDE_DURATION = 3000; // Time interval in milliseconds (3 seconds)

// Initialize: Build indicator points dynamically based on slide count
function initCarousel() {
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
    
    indicatorsContainer.appendChild(dot);
  });
  
  startAutoSlide();
}

// Global slide movement coordinator
function goToSlide(index) {
  // Ensure boundaries loop around infinitely
  if (index < 0) {
    currentIndex = slides.length - 1;
  } else if (index >= slides.length) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  // Execute shift movement via hardware-accelerated CSS Translate
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Update Indicator states
  const dots = Array.from(indicatorsContainer.children);
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentIndex);
  });
}

// Next/Prev Action Handlers
function nextSlide() {
  goToSlide(currentIndex + 1);
}

function prevSlide() {
  goToSlide(currentIndex - 1);
}

// Auto-Slide Cycle Management Loops
function startAutoSlide() {
  if (!slideIntervalId) {
    slideIntervalId = setInterval(nextSlide, SLIDE_DURATION);
  }
}

function stopAutoSlide() {
  if (slideIntervalId) {
    clearInterval(slideIntervalId);
    slideIntervalId = null; // Flush interval tracking footprint
  }
}

// Hook UI Interactive Action Listeners
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Amazon/Flipkart Hover Guard Rule: Pause on cursor presence
container.addEventListener("mouseenter", stopAutoSlide);
container.addEventListener("mouseleave", startAutoSlide);

// Global Initiation Ignition
initCarousel();