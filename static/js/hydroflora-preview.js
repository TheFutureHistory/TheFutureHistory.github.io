const hydrofloraPreview = document.createElement("section");
hydrofloraPreview.id = "hydroFloraPreview";
hydrofloraPreview.className = "hydroflora-preview";
hydrofloraPreview.setAttribute("role", "dialog");
hydrofloraPreview.setAttribute("aria-modal", "true");
hydrofloraPreview.setAttribute("aria-label", "Hydro Flora video");
hydrofloraPreview.setAttribute("aria-hidden", "true");
hydrofloraPreview.innerHTML = `
  <div class="hydroflora-preview-panel">
    <button class="hydroflora-preview-close" type="button" aria-label="Close video">
      &times;
    </button>
    <video
      id="hydroFloraVideo"
      src="/static/videos/Hydro%20Flora.mp4"
      playsinline
      loop
      controls
    ></video>
  </div>`;
document.body.appendChild(hydrofloraPreview);

function closeHydroflora() {
  const video = document.getElementById("hydroFloraVideo");
  hydrofloraPreview.style.display = "none";
  hydrofloraPreview.setAttribute("aria-hidden", "true");
  video.pause();
  video.currentTime = 0;
}

function openHydroflora() {
  const video = document.getElementById("hydroFloraVideo");
  video.pause();
  video.currentTime = 0;
  video.muted = false;
  hydrofloraPreview.style.display = "flex";
  hydrofloraPreview.setAttribute("aria-hidden", "false");
  video.play().catch((error) => {
    console.error("Hydro Flora video playback failed:", error);
  });
}

hydrofloraPreview.addEventListener("click", (event) => {
  if (
    event.target === hydrofloraPreview ||
    event.target.closest(".hydroflora-preview-close")
  ) {
    closeHydroflora();
  }
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    hydrofloraPreview.getAttribute("aria-hidden") === "false"
  ) {
    closeHydroflora();
  }
});
