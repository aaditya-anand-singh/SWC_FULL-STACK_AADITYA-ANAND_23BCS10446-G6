// Target structural interaction references
const fileInput = document.getElementById("fileInput");
const imagePreview = document.getElementById("imagePreview");
const avatarFallback = document.getElementById("avatarFallback");
const validationFeedback = document.getElementById("validationFeedback");

// Configuration Constraints (2MB File Size Boundary Limits)
const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2 Megabytes
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

// --- CORE INPUT LIFE CONTROLLER CYCLE ---
function handleFileSelection(event) {
  // Capture selected target file array slot
  const selectedFile = event.target.files[0];

  // If user clears selection or aborts file picker widget window, exit gracefully
  if (!selectedFile) return;

  // Clear any existing system warning highlights
  clearValidationAlerts();

  // --- VALIDATION PIPELINE RUNS ---

  // Rule 1: Validate MIME File Type parameter matching
  if (!ALLOWED_IMAGE_TYPES.includes(selectedFile.type)) {
    displayValidationAlert("Invalid file format. Please upload a JPEG, PNG, or WebP image record.");
    resetInputChannels();
    return;
  }

  // Rule 2: Validate Size footprint parameters allocation thresholds
  if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
    displayValidationAlert("File size limit exceeded. Image profile footprints must sit below 2MB.");
    resetInputChannels();
    return;
  }

  // --- LIVE PREVIEW PATHWAY INJECTION ---
  
  // Clean up any previously created object URLs to avoid client memory leaks
  if (imagePreview.src && imagePreview.src.startsWith("blob:")) {
    URL.revokeObjectURL(imagePreview.src);
  }

  /**
   * Performance Architecture Strategy Choice:
   * URL.createObjectURL creates an instant, direct memory reference link mapping 
   * straight to the local system file stream. This is significantly faster and consumes
   * less CPU processing memory than reading data using FileReader.readAsDataURL().
   */
  const objectUrlStreamPointer = URL.createObjectURL(selectedFile);
  
  // Bind stream references to image block targets
  imagePreview.src = objectUrlStreamPointer;
  
  // Toggle layout display configurations
  avatarFallback.classList.add("hidden");
  imagePreview.classList.remove("hidden");
  
  console.log(`Successfully mapped local file preview stream path: ${objectUrlStreamPointer}`);
}

// --- VISUAL UI REPAINT UTILITY STATE EXTRACTIONS ---

function displayValidationAlert(errorMessageText) {
  validationFeedback.textContent = errorMessageText;
  validationFeedback.classList.remove("hidden");
}

function clearValidationAlerts() {
  validationFeedback.textContent = "";
  validationFeedback.classList.add("hidden");
}

function resetInputChannels() {
  // Clear file target values so users can select the identical document asset block to trigger evaluation loops again
  fileInput.value = "";
  
  // Reset preview displays back to fallback silhouette icon spaces
  imagePreview.src = "";
  imagePreview.classList.add("hidden");
  avatarFallback.classList.remove("hidden");
}

// Attach listener channels up to file selector modifications
fileInput.addEventListener("change", handleFileSelection);