document.getElementById("openTabs").addEventListener("click", () => {
  const visibleListings = document.querySelectorAll(".listingInfo:not(.hiddenListing) .listing-link");
  const validLinks = Array.from(visibleListings)
    .filter(link => link.getAttribute("href") && link.getAttribute("href").trim() !== "");
  
  if (validLinks.length === 0) {
    alert("No visible job listings to open.");
    return;
  }

  // Warning for 10+ tabs
  if (validLinks.length > 10) {
    const proceed = confirm(`You're about to open ${validLinks.length} tabs. This might slow down your browser. Continue?`);
    if (!proceed) return;
  }

  // Test with multiple windows to properly detect pop-up blocker
  const testWindow1 = window.open('', '_blank', 'width=1,height=1');
  const testWindow2 = window.open('', '_blank', 'width=1,height=1');
  
  if (testWindow1 && testWindow2) {
    // Both windows opened - pop-ups are allowed
    testWindow1.close();
    testWindow2.close();
    
    // Open all tabs
    validLinks.forEach((link, index) => {
      setTimeout(() => {
        window.open(link.getAttribute("href"), `_blank_${index}`, 'noopener');
      }, index * 100);
    });
    
  } else {
    // At least one window was blocked - show instruction
    if (testWindow1) testWindow1.close();
    if (testWindow2) testWindow2.close();
    
    showPopupInstruction(validLinks.length);
  }
});

function showPopupInstruction(count) {
  const overlay = document.createElement('div');
  overlay.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ffffff;
      color: #333333;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 10000;
      font-family: Arial, sans-serif;
      max-width: 300px;
    ">
      <strong>Multiple Tabs opening are blocked!</strong><br>
      Click the pop-up blocked icon in your address bar and allow pop-ups, then try again to open all ${count} listings.
      <button onclick="this.parentElement.parentElement.remove()" style="
        background: white;
        color: #ff6b6b;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 10px;
        display: block;
        width: 100%;
      ">Got it</button>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  setTimeout(() => {
    if (overlay.parentElement) overlay.remove();
  }, 8000);
}