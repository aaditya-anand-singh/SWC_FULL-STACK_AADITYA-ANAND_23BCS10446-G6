// Gather targeted node signatures
const postsContainer = document.getElementById("feedPostsContainer");
const feedLoader = document.getElementById("feedLoader");

// Configuration Parameters
let currentPostPage = 1;
const POSTS_PER_BATCH = 5;
let isFetching = false; // CRITICAL: The concurrency guard gate flag

// 1. MOCK DATABASE GENERATION (Simulates database payloads)
function generateMockPayloads(page, count) {
  const dataset = [];
  const startId = (page - 1) * count + 1;

  for (let i = 0; i < count; i++) {
    const currentId = startId + i;
    dataset.push({
      id: currentId,
      tag: `Stream Channel • Feed Node ${currentId}`,
      title: `Automated Context Stream Content Entry #${currentId}`,
      body: `This structural post content log simulates asynchronous stream loading blocks. This mimics real-world network data delivery optimizations.`
    });
  }
  return dataset;
}

// 2. DOM RENDER INJECTOR
function renderPostsToFeed(postsArray) {
  postsArray.forEach(post => {
    const card = document.createElement("div");
    card.className = "post-card";
    
    card.innerHTML = `
      <div class="post-meta">${post.tag}</div>
      <h3>${post.title}</h3>
      <p>${post.body}</p>
    `;
    
    postsContainer.appendChild(card);
  });
}

// 3. ASYNCHRONOUS API CALL SIMULATOR (With Guard Rails)
function loadNextContentBatch() {
  // If the engine is already running an active execution fetch line, exit immediately!
  if (isFetching) return;

  // Lock down the channel
  isFetching = true;
  feedLoader.classList.remove("hidden"); // Reveal spinner component

  // Simulate network latency delay parameters using setTimeout
  setTimeout(() => {
    const freshData = generateMockPayloads(currentPostPage, POSTS_PER_BATCH);
    
    renderPostsToFeed(freshData);
    
    // Preparation changes for future scroll steps
    currentPostPage++;
    
    // Unlock channels safely
    isFetching = false;
    feedLoader.classList.add("hidden"); // Hide loader spinner component
  }, 1200); // 1.2 second network delay simulation parameter
}

// 4. INTERSECTION AND GEOMETRY EVALUATION SCROLL MONITOR
function monitorScrollPosition() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  /**
   * UX Engineering Calculation Breakdown:
   * scrollHeight: Total height footprint matching total document payload length.
   * scrollTop + clientHeight: The absolute visual bottom location depth point currently viewed.
   * * We subtract 150px to trigger the network call *before* they see the absolute bottom.
   */
  if (scrollTop + clientHeight >= scrollHeight - 150) {
    loadNextContentBatch();
  }
}

// Attach high performance document listening attachments
window.addEventListener("scroll", monitorScrollPosition);

// Initial Ignition Sequence Run: Load the first batch when page mounts
loadNextContentBatch();