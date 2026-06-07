// Grab DOM elements
const taskCards = document.querySelectorAll(".task-card");
const cardLists = document.querySelectorAll(".card-list");

// --- PHASE 1: DRAG CARDS INITIALIZATION ---
taskCards.forEach((card) => {
  // Triggered right when user grabs and moves an item
  card.addEventListener("dragstart", (e) => {
    card.classList.add("dragging");
    
    // Safely store the unique element ID inside the dataTransfer event pipeline
    e.dataTransfer.setData("text/plain", card.id);
  });

  // Cleanup layout state flags once element is released
  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
    updateAllColumnCounts();
  });
});

// --- PHASE 2: DROP ZONE TARGET MONITORING ---
cardLists.forEach((list) => {
  
  // Necessary override: Browser standard layouts default block drops
  list.addEventListener("dragover", (e) => {
    e.preventDefault(); 
    list.classList.add("drag-over");
  });

  // Fires once the cursor leaves the dropzone bounding box
  list.addEventListener("dragleave", () => {
    list.classList.remove("drag-over");
  });

  // Processes the structural node relocation payload dropping
  list.addEventListener("drop", (e) => {
    e.preventDefault();
    list.classList.remove("drag-over");

    // Fetch original item tracking signature identifier keys
    const draggedCardId = e.dataTransfer.getData("text/plain");
    const draggedCardNode = document.getElementById(draggedCardId);

    if (draggedCardNode) {
      // Intelligently shifts node location into new list column branch
      list.appendChild(draggedCardNode);
      console.log(`Successfully moved ${draggedCardId} into lane: ${list.dataset.status}`);
    }
  });
});

// --- HELPER FUNCTION: SYNC VISUAL QUANTITIES ---
function updateAllColumnCounts() {
  const columns = document.querySelectorAll(".kanban-column");
  
  columns.forEach((column) => {
    const list = column.querySelector(".card-list");
    const countBadge = column.querySelector(".column-count");
    
    if (list && countBadge) {
      countBadge.textContent = list.children.length;
    }
  });
}

// Call to set initial counters properly based on HTML defaults
updateAllColumnCounts();