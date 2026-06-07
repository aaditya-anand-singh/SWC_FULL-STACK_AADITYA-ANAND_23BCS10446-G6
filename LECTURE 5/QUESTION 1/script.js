// Gather target node items references
const productGrid = document.getElementById("productGrid");
const resultTelemetry = document.getElementById("resultTelemetry");
const numericButtonsBox = document.getElementById("numericButtonsBox");
const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");

// 1. DATA INVENTORY STORAGE GENERATOR
const TOTAL_ITEMS_COUNT = 45; // Simulates 45 matched database records
const ITEMS_PER_PAGE_LIMIT = 10; // Fixed view depth per layout slice
let currentPageIndex = 1; // Operational global tracker state property

// Generate mock items list database array
const INVENTORY_DATASET = Array.from({ length: TOTAL_ITEMS_COUNT }, (_, index) => {
  const itemNumber = index + 1;
  return {
    id: `prod-${itemNumber}`,
    title: `Premium Ultra-Wide Smart Device Monitor Node v${itemNumber}`,
    rating: (4.0 + Math.random() * 1.0).toFixed(1),
    price: (149 + (itemNumber * 12)).toLocaleString()
  };
});

const totalPagesCalculated = Math.ceil(INVENTORY_DATASET.length / ITEMS_PER_PAGE_LIMIT);

// 2. VIEWPORT SLICE AND RENDER COORDINATOR
function renderActiveCatalogPage() {
  // Wipe container clear for repaint execution
  productGrid.innerHTML = "";

  // Dynamic Array Slicing Formula Algebra Matrix
  const startIndex = (currentPageIndex - 1) * ITEMS_PER_PAGE_LIMIT;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE_LIMIT, INVENTORY_DATASET.length);
  const activePageSubset = INVENTORY_DATASET.slice(startIndex, endIndex);

  // Repaint item listing rows
  const documentFragment = document.createDocumentFragment();
  activePageSubset.forEach(product => {
    const cardRow = document.createElement("div");
    cardRow.className = "product-item-card";
    
    cardRow.innerHTML = `
      <div class="img-placeholder" aria-hidden="true"></div>
      <div class="product-details">
        <h3>${product.title}</h3>
        <div class="product-rating">★ ${product.rating}</div>
        <div class="product-price">₹${product.price}</div>
      </div>
    `;
    documentFragment.appendChild(cardRow);
  });
  productGrid.appendChild(documentFragment);

  // Synchronize supporting elements UI telemetry text values
  resultTelemetry.textContent = `Showing ${startIndex + 1}–${endIndex} of ${INVENTORY_DATASET.length} items`;

  // Sync state variables across structural controls parameters
  syncPaginationControls();
}

// 3. PAGINATION INTERACTION TRACK SYNC LOGIC
function syncPaginationControls() {
  // Clear layout button arrays
  numericButtonsBox.innerHTML = "";

  // Render numbers loop-by-line matching totals values
  for (let i = 1; i <= totalPagesCalculated; i++) {
    const numBtn = document.createElement("button");
    numBtn.className = "page-num-btn";
    numBtn.textContent = i;
    numBtn.setAttribute("aria-label", `Go to page ${i}`);
    
    if (i === currentPageIndex) {
      numBtn.classList.add("active");
      numBtn.setAttribute("aria-current", "page"); // Accessibility flag
    }

    // Set interactive event loop pass
    numBtn.addEventListener("click", () => {
      currentPageIndex = i;
      renderActiveCatalogPage();
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top like real stores
    });

    numericButtonsBox.appendChild(numBtn);
  }

  // Handle arrow activation barriers parameters edge cases switches
  prevPageBtn.disabled = (currentPageIndex === 1);
  nextPageBtn.disabled = (currentPageIndex === totalPagesCalculated);
}

// 4. ATTACH BUTTON ACTION LISTENERS
prevPageBtn.addEventListener("click", () => {
  if (currentPageIndex > 1) {
    currentPageIndex--;
    renderActiveCatalogPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

nextPageBtn.addEventListener("click", () => {
  if (currentPageIndex < totalPagesCalculated) {
    currentPageIndex++;
    renderActiveCatalogPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// Initial ignition initialization pass run on startup mount
renderActiveCatalogPage();