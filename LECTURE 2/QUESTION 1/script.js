// Gather structural references
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

// Initialize and listen to user event loop configurations
tabButtons.forEach((clickedTab) => {
  clickedTab.addEventListener("click", () => {
    
    // Guard Clause: End evaluation quickly if tab is already active
    if (clickedTab.classList.contains("active")) return;

    // 1. Reset all Tab State properties
    tabButtons.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-selected", "false");
      btn.setAttribute("tabindex", "-1");
    });

    // 2. Clear Active Status on all underlying Panels
    tabPanels.forEach((panel) => {
      panel.classList.remove("active");
      panel.setAttribute("hidden", "true");
    });

    // 3. Mount current target active tab configurations
    clickedTab.classList.add("active");
    clickedTab.setAttribute("aria-selected", "true");
    clickedTab.removeAttribute("tabindex"); // Restore standard navigation sequencing Focus

    // 4. Reveal matched layout panel target
    const targetPanelId = clickedTab.getAttribute("aria-controls");
    const correspondingPanel = document.getElementById(targetPanelId);
    
    if (correspondingPanel) {
      correspondingPanel.classList.add("active");
      correspondingPanel.removeAttribute("hidden");
    }
  });
});