/* HOMEPAGE: pinned scroll roller. Scrolling moves through the projects,
   then the page continues after the last one.
   Item fields used: title, imageSrc, alt, status (shown as Type),
   state (shown as Status, optional), industry (shown as Industry, optional),
   link / onClick (View project). */
function initPortfolioRoller(items) {
  const grid = document.getElementById("roller-grid");
  const section = document.getElementById("roller");
  const rollerItems = items.filter((item) => item.view !== "grid");
  const total = rollerItems.length;
  if (!grid || !section || !total) return;

  const pad = (n) => String(n).padStart(2, "0");
  const action = (item) => {
    if (item.link) {
      if (item.link.startsWith("/project/"))
        return `onclick="location.href='${item.link}'"`;
      const href = /^https?:\/\//i.test(item.link)
        ? item.link
        : `https://${item.link}`;
      return `onclick="window.open('${href}', '_blank', 'noopener,noreferrer')"`;
    }
    return item.onClick ? `onclick="${item.onClick}"` : "";
  };

  const ARROW = `<svg viewBox="6 6 12 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>`;
  const GRID = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>`;

  const infoHTML = rollerItems
    .map(
      (item) => `
      <div class="roller-info-item" aria-hidden="true">
<div class="roller-head">
  <h3 class="roller-info-title">${item.title}</h3>
  <p class="roller-info-description">${item.description}</p>
  ${item.link || item.onClick ? `<button type="button" class="roller-info-btn" ${action(item)}>${item.button || "View project"} ${ARROW}</button>` : ""}
</div>
        <dl class="roller-facts">
          <div class="roller-fact"><dt>Type</dt><dd>${item.status || "Website"}</dd></div>
          ${item.state ? `<div class="roller-fact"><dt>Status</dt><dd>${item.state}</dd></div>` : ""}
          ${item.industry ? `<div class="roller-fact"><dt>Industry</dt><dd>${item.industry}</dd></div>` : ""}
        </dl>
      </div>`,
    )
    .join("");

  const cardsHTML = rollerItems
    .map(
      (item) => `
      <div class="roller-card" ${action(item)}${item.link || item.onClick ? ' role="button" tabindex="0"' : ""}>
        <div class="roller-card-details">
          <img src="${item.imageSrc}" alt="${item.alt}" draggable="false" />
        </div>
      </div>`,
    )
    .join("");

  grid.innerHTML = `
    <div class="roller-layout">
      <div class="roller-info">
          <div class=roller-portfolio>
            <div class="roller-counter">
            <span class="roller-counter-current">01</span> / ${pad(total)}
          </div>
          <a class="roller-all" href="/portfolio/" aria-label="All projects">${GRID}</a>
        </div>
        <div class="roller-info-stack">${infoHTML}</div>
      </div>
      <div class="roller-panel">
        <div class="roller-deck">${cardsHTML}</div>
      </div>
    </div>`;

  const stickyEl = section.querySelector(".container");
  const cards = Array.from(grid.querySelectorAll(".roller-card"));
  const infos = Array.from(grid.querySelectorAll(".roller-info-item"));
  const counter = grid.querySelector(".roller-counter-current");
  grid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest('.roller-card[role="button"]');
    if (!card) return;
    e.preventDefault();
    card.click();
  });
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  section.style.setProperty("--steps", total - 1);
  section.classList.add("is-roller");

  let target = 0; // from scroll position (0 .. total-1)
  let current = 0; // smoothed value used for rendering
  let active = -1;
  let running = false;

  function readScroll() {
    const stickyTop = parseFloat(getComputedStyle(stickyEl).top) || 0;
    const max = section.offsetHeight - stickyEl.offsetHeight;
    const scrolled = stickyTop - section.getBoundingClientRect().top;
    const p = max > 0 ? Math.min(Math.max(scrolled / max, 0), 1) : 0;
    target = p * (total - 1);
    start();
  }

  function setActive(idx) {
    active = idx;
    infos.forEach((el, i) => {
      el.classList.toggle("is-active", i === idx);
      el.setAttribute("aria-hidden", i === idx ? "false" : "true");
    });
    cards.forEach((el, i) => el.classList.toggle("is-active", i === idx));
    counter.textContent = pad(idx + 1);
  }

  function render() {
    current += (target - current) * (reduceMotion ? 1 : 0.14);
    if (Math.abs(target - current) < 0.001) current = target;

    cards.forEach((card, i) => {
      const d = i - current; // 0 = front and centre
      const a = Math.abs(d);
      const opacity = Math.max(0, 1 - a * 0.8);
      if (opacity <= 0) {
        card.style.visibility = "hidden";
        return;
      }
      card.style.visibility = "visible";
      card.style.opacity = opacity;
      card.style.zIndex = 100 - Math.round(a * 10);
      card.style.transform = `translateY(${d * 105}%)`;
    });

    const idx = Math.round(current);
    if (idx !== active) setActive(idx);

    if (current !== target) requestAnimationFrame(render);
    else running = false;
  }

  function start() {
    if (running) return;
    running = true;
    requestAnimationFrame(render);
  }

  window.addEventListener("scroll", readScroll, { passive: true });
  window.addEventListener("resize", readScroll);

  setActive(0);
  readScroll();
  render();
}

initPortfolioRoller(portfolioItems);
