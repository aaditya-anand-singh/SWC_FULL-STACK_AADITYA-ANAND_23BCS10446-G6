const feedContainer = document.getElementById("masterFeedContainer");
const globalCounter = document.getElementById("globalCounter");

const TOTAL_ITEMS = 1250; // Generating over 1000 items

// 1. HIGH-PERFORMANCE DOM GENERATION
function generateLargeDataset() {
  // Use a DocumentFragment to batch DOM inserts instead of updating the DOM 1250 times loop-by-loop
  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= TOTAL_ITEMS; i++) {
    const li = document.createElement("li");
    li.className = "feed-item";
    li.setAttribute("data-id", `item-${i}`); // Unique element tracking pointer

    li.innerHTML = `
      <span class="item-title">Product Variant Inventory Node #${i}</span>
      <button class="delete-btn" data-action="delete">Delete</button>
    `;

    fragment.appendChild(li);
  }

  // Inject everything into the live DOM tree in one single paint operation
  feedContainer.appendChild(fragment);
  updateCounter();
}

// 2. THE EVENT DELEGATION ENGINE (Single listener for all items)
feedContainer.addEventListener("click", (event) => {
  // Check if the clicked target element has our custom delete data-action attribute
  if (event.target.getAttribute("data-action") === "delete") {
    const deleteButton = event.target;
    
    // Traverses up to locate the parent list item wrapper housing this specific button click
    const itemRow = deleteButton.closest(".feed-item");
    
    if (itemRow) {
      const itemId = itemRow.getAttribute("data-id");
      console.log(`Intercepted deletion event for: ${itemId}`);
      
      // Visual feedback: add the transition class
      itemRow.classList.add("removing");
      
      // Wait briefly for the CSS transition layout slide animation to finish before pruning nodes
      setTimeout(() => {
        itemRow.remove();
        updateCounter();
      }, 200);
    }
  }
});

// Helper to update our live dashboard counter
function updateCounter() {
  const currentCount = feedContainer.children.length;
  globalCounter.textContent = `Items: ${currentCount.toLocaleString()}`;
}

// Fire up the generator loop
generateLargeDataset();