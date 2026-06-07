// Target UI Node References
const autocompleteWrapper = document.getElementById("autocompleteWrapper");
const searchInput = document.getElementById("autocompleteInput");
const dropdownList = document.getElementById("suggestionsDropdown");

// Dictionary Dataset Source Payload Array
const DICTIONARY = [
  "javascript frameworks array",
  "css grid layout properties",
  "html5 semantic accessibility rules",
  "how to build autocomplete dropdowns",
  "react components functional state hooks",
  "vanilla js keyboard event handlers",
  "web performance core web vitals optimize",
  "google search design system styles",
  "python data analysis dataframes pandas",
  "rest api design guidelines principles"
];

// Operational Configuration State Properties
let filteredSuggestions = [];
let currentFocusIndex = -1; // -1 means focus sits inside the main input line

// --- CORE DROPDOWN FILTER ENGINE ---
function updateSuggestions() {
  const query = searchInput.value.trim().toLowerCase();
  dropdownList.innerHTML = "";
  currentFocusIndex = -1; // Reset selection index upon text modification runs

  if (!query) {
    closeDropdown();
    return;
  }

  // Filter dictionary down to elements containing user query phrase strings
  filteredSuggestions = DICTIONARY.filter(item => 
    item.toLowerCase().includes(query)
  );

  if (filteredSuggestions.length === 0) {
    closeDropdown();
    return;
  }

  // Inject suggestion nodes into the list container view
  filteredSuggestions.forEach((text, index) => {
    const li = document.createElement("li");
    li.className = "suggestion-item";
    li.textContent = text;
    li.setAttribute("role", "option");
    li.setAttribute("id", `suggestion-item-${index}`);
    
    // Add point clicks selector mouse fallback overrides
    li.addEventListener("click", () => selectItem(index));
    
    dropdownList.appendChild(li);
  });

  openDropdown();
}

// --- DYNAMIC SELECTION HIGHLIGHT MODIFIERS ---
function setSelectionHighlight(listElements) {
  if (!listElements || listElements.length === 0) return;

  // Clear previous highlighted states across all options loop-by-line
  Array.from(listElements).forEach(el => el.classList.remove("selected"));

  // Check if pointer context rests inside a valid sub-element slot boundary
  if (currentFocusIndex >= 0 && currentFocusIndex < listElements.length) {
    const activeItem = listElements[currentFocusIndex];
    activeItem.classList.add("selected");
    
    // Sync modern assistive readers text line metadata highlights
    searchInput.setAttribute("aria-activedescendant", activeItem.id);
    
    // Auto-update input text row value preview tracking like production portals
    searchInput.value = filteredSuggestions[currentFocusIndex];
  } else if (currentFocusIndex === -1) {
    // If we scroll out of boundaries back up to text box top space, clear tracking
    searchInput.removeAttribute("aria-activedescendant");
  }
}

function selectItem(index) {
  if (index >= 0 && index < filteredSuggestions.length) {
    searchInput.value = filteredSuggestions[index];
    console.log(`Dispatched Selection Query Search Request: "${filteredSuggestions[index]}"`);
    alert(`Searching database for: "${filteredSuggestions[index]}"`);
    closeDropdown();
  }
}

// --- VISIBILITY PANEL MANAGER ACTIONS ---
function openDropdown() {
  autocompleteWrapper.classList.add("open");
  dropdownList.classList.remove("hidden");
  searchInput.setAttribute("aria-expanded", "true");
}

function closeDropdown() {
  autocompleteWrapper.classList.remove("open");
  dropdownList.classList.add("hidden");
  searchInput.setAttribute("aria-expanded", "false");
  searchInput.removeAttribute("aria-activedescendant");
}

// --- KEYBOARD INTERACTION EVENT INTERCEPTORS ---
searchInput.addEventListener("keydown", (e) => {
  const items = dropdownList.getElementsByTagName("li");

  if (dropdownList.classList.contains("hidden") || items.length === 0) return;

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault(); // Stop page scrolling
      currentFocusIndex++;
      if (currentFocusIndex >= items.length) currentFocusIndex = 0; // Wrap around to top
      setSelectionHighlight(items);
      break;

    case "ArrowUp":
      e.preventDefault(); // Stop page scrolling
      currentFocusIndex--;
      if (currentFocusIndex < -1) currentFocusIndex = items.length - 1; // Wrap around to bottom
      setSelectionHighlight(items);
      break;

    case "Enter":
      e.preventDefault();
      if (currentFocusIndex >= 0) {
        selectItem(currentFocusIndex);
      }
      break;

    case "Escape":
      closeDropdown();
      break;
  }
});

// Bind change input listening triggers
searchInput.addEventListener("input", updateSuggestions);

// Click Outside View Guard Rule: Close dropdown if user taps elsewhere on page layouts
document.addEventListener("click", (e) => {
  if (!autocompleteWrapper.contains(e.target)) {
    closeDropdown();
  }
});