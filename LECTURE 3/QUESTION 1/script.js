// Target UI references
const form = document.getElementById("authForm");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

// Error Text Element pointers
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

// Password checklist indicators
const reqLength = document.getElementById("req-length");
const reqSpecial = document.getElementById("req-special");

// Evaluation Standard Regular Expressions
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const SPECIAL_CHAR_REGEX = /[!@#$%^&*(),.?":{}|<>]/;

// --- VALIDATION CORE FUNCTIONS ---

function validateEmail() {
  const value = emailInput.value.trim();

  if (!value) {
    showError(emailInput, emailError, "Email address is required.");
    return false;
  } else if (!EMAIL_REGEX.test(value)) {
    showError(emailInput, emailError, "Please enter a valid email address.");
    return false;
  } else {
    clearError(emailInput, emailError);
    return true;
  }
}

function validatePassword() {
  const value = passwordInput.value;
  let isValid = true;

  // Track Sub-requirements first for the UI checklist boxes
  const hasMinLength = value.length >= 8;
  const hasSpecialChar = SPECIAL_CHAR_REGEX.test(value);

  // Sync checklist feedback text colors dynamically
  reqLength.classList.toggle("met", hasMinLength);
  reqSpecial.classList.toggle("met", hasSpecialChar);

  // Determine master field status output
  if (!value) {
    showError(passwordInput, passwordError, "Password is required.");
    isValid = false;
  } else if (!hasMinLength || !hasSpecialChar) {
    showError(passwordInput, passwordError, "Password does not meet safety criteria.");
    isValid = false;
  } else {
    clearError(passwordInput, passwordError);
  }

  return isValid;
}

// --- ERROR DISPLAY STATE UTILITIES ---

function showError(inputElement, errorElement, message) {
  inputElement.classList.add("invalid-input");
  errorElement.textContent = message;
}

function clearError(inputElement, errorElement) {
  inputElement.classList.remove("invalid-input");
  errorElement.textContent = "";
}

// --- SYSTEM INTERACTION EVENT LISTENERS ---

// Blur event loop parameters: check status fields immediately when cursor leaves input box
emailInput.addEventListener("blur", validateEmail);
passwordInput.addEventListener("blur", validatePassword);

// Live change parameters: check password criteria synchronously while typing
passwordInput.addEventListener("input", validatePassword);
emailInput.addEventListener("input", () => {
  // If the field was already flagged invalid, clean it dynamically as the user remedies typos
  if (emailInput.classList.contains("invalid-input")) {
    validateEmail();
  }
});

// Intercept Master Form dispatch events safely
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Halt standard browser query string payload refresh

  // Execute structural runs on all forms simultaneously
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  if (isEmailValid && isPasswordValid) {
    const securePayload = {
      user: emailInput.value.trim(),
      phraseLength: passwordInput.value.length
    };
    
    console.log("Validation complete. Dispatching Payload details:", securePayload);
    alert("Sign In successful! Navigating to dashboard cluster...");
    form.reset();
    
    // Clear checklist color state styles upon successful clearing reset
    reqLength.classList.remove("met");
    reqSpecial.classList.remove("met");
  } else {
    console.warn("Form dispatch blocked: System constraints unfulfilled.");
  }
});