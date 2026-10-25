/* Portfolio PAGE: filter bar + 4-column image grid. */
function initPortfolioGallery(items) {
  const grid = document.getElementById("gallery-grid");
  const bar = document.getElementById("gallery-filters");
  if (!grid || !bar) return;

  const key = (s) => (s || "Website").trim().toLowerCase();
  const label = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());

  const counts = {};
  items.forEach(
    (i) => (counts[key(i.status)] = (counts[key(i.status)] || 0) + 1),
  );

  grid.innerHTML = items
    .map((item) => {
      const status = key(item.status);
      const inner = `
        <div class="gallery-media">
          <img src="${item.imageSrc}" alt="${item.alt}" loading="lazy" draggable="false" />
          <div class="gallery-glass">
            <p>${item.description}</p>
          </div>
        </div>
        <div class="gallery-meta">
          <h3>${item.title}</h3>
          <span class="gallery-cat">${status}</span>
        </div>`;
      if (item.link) {
        const isProjectLink = item.link.startsWith("/project/");
        const href =
          isProjectLink || /^https?:\/\//i.test(item.link)
            ? item.link
            : `https://${item.link}`;
        const externalAttributes = isProjectLink
          ? ""
          : ' target="_blank" rel="noopener noreferrer"';
        return `<a class="gallery-card" data-status="${status}" href="${href}"${externalAttributes}>${inner}</a>`;
      }
      const click = item.onClick
        ? ` onclick="${item.onClick}" role="button" tabindex="0"`
        : "";
      return `<div class="gallery-card" data-status="${status}"${click}>${inner}</div>`;
    })
    .join("");

  bar.innerHTML = [["all", items.length], ...Object.entries(counts)]
    .map(
      ([k, n]) =>
        `<button class="filter-btn" data-status="${k}">${k === "all" ? "All" : label(k)}<span>${n}</span></button>`,
    )
    .join("");

  const cards = Array.from(grid.children);
  const buttons = Array.from(bar.children);

  function applyFilter(status) {
    if (status !== "all" && !counts[status]) status = "all";
    cards.forEach(
      (card) =>
        (card.hidden = status !== "all" && card.dataset.status !== status),
    );
    buttons.forEach((btn) =>
      btn.classList.toggle("active", btn.dataset.status === status),
    );
    history.replaceState(
      null,
      "",
      status === "all" ? location.pathname : "#" + encodeURIComponent(status),
    );
  }

  bar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (btn) applyFilter(btn.dataset.status);
  });

  applyFilter(
    decodeURIComponent(location.hash.slice(1)).toLowerCase() || "all",
  );
}

initPortfolioGallery(portfolioItems);
