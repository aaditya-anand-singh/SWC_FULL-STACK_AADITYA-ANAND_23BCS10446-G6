// Target UI references
const directoryGrid = document.getElementById("directoryGrid");
const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");
const errorMessage = document.getElementById("errorMessage");
const refreshBtn = document.getElementById("refreshBtn");

// Endpoint API Mock Route Address
const TARGET_API_URL = "https://jsonplaceholder.typicode.com/users";

// --- CORE FETCH ENGINE (ASYNC / AWAIT CYCLE) ---
async function fetchSystemUsers() {
  // 1. Establish initial pipeline reset configuration states
  directoryGrid.innerHTML = "";
  errorState.classList.add("hidden");
  loadingState.classList.remove("hidden");
  refreshBtn.disabled = true;

  try {
    const response = await fetch(TARGET_API_URL);
    
    // Check if network server responses are valid (status codes 200-299)
    if (!response.ok) {
      throw new Error(`Server returned exception error state code: ${response.status}`);
    }

    const usersDataPayload = await response.json();
    
    // 2. Render payloads onto our dashboard grid tracking map
    renderUserGrid(usersDataPayload);

  } catch (error) {
    console.error("Intercepted Data Execution Error Logs:", error);
    
    // 3. Fallback: Trigger visual exception boxes
    errorMessage.textContent = `Data Sync Interrupted: ${error.message || "Unknown anomaly encountered."}`;
    errorState.classList.remove("hidden");
  } finally {
    // Clean up loading tracking states whether operation succeeded or failed
    loadingState.classList.add("hidden");
    refreshBtn.disabled = false;
  }
}

// --- DOM RENDER MODIFIER UTILITIES ---
function renderUserGrid(usersArray) {
  const fragment = document.createDocumentFragment();

  usersArray.forEach((user) => {
    const card = document.createElement("div");
    card.className = "user-card";
    
    // Extract a two-character monogram identifier badge placeholder
    const monogram = user.name ? user.name.substring(0, 2) : "ID";

    card.innerHTML = `
      <div class="card-header">
        <div class="avatar-badge" aria-hidden="true">${monogram}</div>
        <div class="user-meta">
          <h3>${user.name}</h3>
          <span class="username-tag">@${user.username}</span>
        </div>
      </div>
      <div class="card-body">
        <div class="body-row"><strong>Email:</strong> ${user.email}</div>
        <div class="body-row"><strong>Company:</strong> ${user.company.name}</div>
        <div class="body-row"><strong>Location:</strong> ${user.address.city}</div>
      </div>
    `;
    
    fragment.appendChild(card);
  });

  // Inject optimized sub-elements tree structure inside single repaint run
  directoryGrid.appendChild(fragment);
}

// Hook listener actions up to refresh button trigger options
refreshBtn.addEventListener("click", fetchSystemUsers);

// Trigger initial ignition download pipeline loop on startup
fetchSystemUsers();