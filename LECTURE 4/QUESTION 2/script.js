const fetchBtn = document.getElementById("fetchBtn");
const forceFailure = document.getElementById("forceFailure");
const consoleTerminal = document.getElementById("consoleTerminal");
const statusAlert = document.getElementById("statusAlert");

// Resiliency Configuration Parameters
const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 1000; // Start backoff delay at 1 second

// --- PERFORMANCE DELAY PROMISE UTILITY ---
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- INTERNAL TERMINAL LOG MODIFIER ---
function logToTerminal(message, typeClass = "system-text") {
  const logLine = document.createElement("span");
  logLine.className = typeClass;
  logLine.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  
  consoleTerminal.appendChild(logLine);
  consoleTerminal.scrollTop = consoleTerminal.scrollHeight; // Keep view auto-scrolled
}

// --- RESILIENT API WRAPPER WITH EXPONENTIAL BACKOFF ---
async function fetchWithRetry(url, options = {}, retriesLeft = MAX_RETRIES, delayDuration = INITIAL_DELAY_MS) {
  try {
    // Determine dynamic request parameters depending on checkbox state mock parameters
    const fetchUrl = forceFailure.checked 
      ? "https://jsonplaceholder.typicode.com/invalid-route-triggered-exception" 
      : "https://jsonplaceholder.typicode.com/posts/1";

    logToTerminal(`Dispatching API request tunnel step...`, "system-text");
    
    const response = await fetch(fetchUrl, options);

    if (!response.ok) {
      throw new Error(`HTTP System Exception Status: ${response.status}`);
    }

    const successfulPayload = await response.json();
    return successfulPayload; // Succeeded, bypass down to resolution stream

  } catch (error) {
    const currentAttemptNumber = MAX_RETRIES - retriesLeft + 1;
    logToTerminal(`Attempt ${currentAttemptNumber} failed: ${error.message}`, "error-text");

    // If out of retries, throw the error upward to execute terminal fallbacks
    if (retriesLeft <= 0) {
      throw new Error(`All global connection attempts (${MAX_RETRIES}) collapsed.`);
    }

    // UX Engineering Formula: Exponentially multiply delay duration window for next cycle ($1s \rightarrow 2s \rightarrow 4s$)
    logToTerminal(`Backing off resource pipes. Waiting ${delayDuration}ms before next retry window...`, "retry-text");
    await delay(delayDuration);

    // Recursively execute retry execution channel down-level line passes
    return fetchWithRetry(url, options, retriesLeft - 1, delayDuration * 2);
  }
}

// --- EVENT CONTROLLER LIFECYCLE INTERACTION ---
fetchBtn.addEventListener("click", async () => {
  // Reset structural ui banners and lock actions
  statusAlert.classList.add("hidden");
  fetchBtn.disabled = true;
  consoleTerminal.innerHTML = "";
  
  logToTerminal("Initiating operational fetch track stream sequence...", "system-text");

  try {
    const resultData = await fetchWithRetry("core-gateway-address-string");
    
    // Success Terminal Repaint Execution
    logToTerminal("Payload stream downloaded successfully!", "success-text");
    statusAlert.textContent = `Stream payload synced successfully! Document Title Match: "${resultData.title.substring(0, 30)}..."`;
    statusAlert.className = "alert-banner success";
    statusAlert.classList.remove("hidden");

  } catch (finalFailureError) {
    // Outright Exhaustive Disaster Failure Execution
    logToTerminal(finalFailureError.message, "error-text");
    statusAlert.textContent = "Streaming Connection Error: Unable to sync server clusters. Please check internet connections or contact system admin grids.";
    statusAlert.className = "alert-banner error";
    statusAlert.classList.remove("hidden");
  } finally {
    fetchBtn.disabled = false;
  }
});