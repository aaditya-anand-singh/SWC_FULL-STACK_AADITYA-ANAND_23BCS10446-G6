// Target Node Elements
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");
const searchStatus = document.getElementById("searchStatus");

// Dataset Inventory (Simulating inventory tables or remote API payloads)
const PRODUCTS = [
  "iPhone 15 Pro Max",
  "iPhone 14 Architecture Node",
  "MacBook Pro M3 Max",
  "MacBook Air Retina Display",
  "iPad Pro Cluster Terminal",
  "Samsung Galaxy S24 Ultra",
  "Samsung Galaxy Book Ultra",
  "Google Pixel 8 Pro Tensor",
  "Sony WH-1000XM5 Headphones",
  "Dell XPS 15 Developer Edition",
  "Asus ROG Strix Gaming Laptop",
  "Logitech MX Master 3S Mouse"
];

// --- PRODUCTION DEBOUNCE CORE WRAPPER ---
function debounce(callbackFunction, delayDuration = 300) {
  let timeoutId = null;

  return function (...args) {
    // Visually flag when user is actively typing, meaning evaluation is paused
    searchStatus.textContent = "Typing...";
    searchStatus.className = "status-badge processing";

    // Instantly wipe out any previously running countdown timers
    clearTimeout(timeoutId);

    // Set a fresh timer window
    timeoutId = setTimeout(() => {
      callbackFunction.apply(this, args);
    }, delayDuration);
  };
}

// --- CORE MATCHING FILTERING EXECUTION ---
function executeLiveSearch(queryValue) {
  const cleanQuery = queryValue.trim().toLowerCase();
  
  // Wipe out the listing view to repaint clean updates
  resultsContainer.innerHTML = "";

  // Filter dataset down to matches
  const filteredMatches = PRODUCTS.filter(product => 
    product.toLowerCase().includes(cleanQuery)
  );

  // Sync tracking indicators
  searchStatus.textContent = "Searched";
  searchStatus.className = "status-badge executed";

  // Edge Case: No records found matching query parameter paths
  if (filteredMatches.length === 0) {
    resultsContainer.innerHTML = `<li class="no-results">No matching products found.</li>`;
    return;
  }

  // Inject valid items into DOM
  const fragment = document.createDocumentFragment();
  filteredMatches.forEach(itemText => {
    const li = document.createElement("li");
    li.className = "result-item";
    li.textContent = itemText;
    fragment.appendChild(li);
  });
  
  resultsContainer.appendChild(fragment);
}

// Create the debounced version of our search function
const handleDebouncedInput = debounce((event) => {
  executeLiveSearch(event.target.value);
}, 300); // 300 milliseconds guard delay window

// Attach listener to input element
searchInput.addEventListener("input", handleDebouncedInput);

// Initial Ignition Run: Mount default data listings immediately on page load
executeLiveSearch("");