/* ------------------------------------------------------------------
   Replace your existing appendPortfolioItems() with this function.
   Keep `const portfolioItems = [...]` and the final
   `appendPortfolioItems(portfolioItems);` call exactly as they are.
------------------------------------------------------------------- */
function appendPortfolioItems(items) {
  const grid = document.getElementById("portfolio-grid");
  const section = document.getElementById("portfolio");
  const total = items.length;
  if (!grid || !section || !total) return;

  const pad = (n) => String(n).padStart(2, "0");

  /* ---------- 1. Build markup ---------- */
  const infoHTML = items
    .map((item) => {
      const category = item.status || "Website";
      const click = item.onClick ? `onclick="${item.onClick}"` : "";
      return `
        <div class="portfolio-info-item" aria-hidden="true">
          <span class="portfolio-info-category">${category}</span>
          <h3 class="portfolio-info-title">${item.title}</h3>
          <p class="portfolio-info-description">${item.description}</p>
          ${
            item.onClick
              ? `<button type="button" class="portfolio-info-btn" ${click}>view project</button>`
              : ""
          }
        </div>`;
    })
    .join("");

  const cardsHTML = items
    .map((item) => {
      const category = (item.status || "Website").toLowerCase();
      const click = item.onClick ? `onclick="${item.onClick}"` : "";
      return `
        <div class="portfolio-card" data-status="${category}" ${click}>
          <div class="portfolio-card-details">
            <img src="${item.imageSrc}" alt="${item.alt}" draggable="false" />
          </div>
        </div>`;
    })
    .join("");

  grid.innerHTML = `
    <div class="portfolio-layout">
      <div class="portfolio-info">
        <div class="portfolio-counter">
          <span class="portfolio-counter-current">01</span>
          <span class="portfolio-counter-total">/ ${pad(total)}</span>
        </div>
        <div class="portfolio-info-stack">${infoHTML}</div>
        <div class="portfolio-progress"><span class="portfolio-progress-bar"></span></div>
      </div>
      <div class="portfolio-deck">${cardsHTML}</div>
    </div>`;

  /* ---------- 2. Grab elements ---------- */
  const stickyEl = section.querySelector(".container");
  const cards = Array.from(grid.querySelectorAll(".portfolio-card"));
  const infos = Array.from(grid.querySelectorAll(".portfolio-info-item"));
  const counter = grid.querySelector(".portfolio-counter-current");
  const bar = grid.querySelector(".portfolio-progress-bar");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // Gives the section its extra scroll runway (see CSS)
  section.style.setProperty("--steps", total - 1);
  section.classList.add("is-roller");

  /* ---------- 3. Scroll -> position ---------- */
  let target = 0; // where the scroll says we should be (0 .. total-1)
  let current = 0; // smoothed value used for rendering
  let active = -1;
  let running = false;

  function readScroll() {
    const stickyTop = parseFloat(getComputedStyle(stickyEl).top) || 0;
    const rect = section.getBoundingClientRect();
    const max = section.offsetHeight - stickyEl.offsetHeight;
    const scrolled = stickyTop - rect.top;
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

  /* ---------- 4. Render the roller ---------- */
  function render() {
    current += (target - current) * (reduceMotion ? 1 : 0.14);
    if (Math.abs(target - current) < 0.001) current = target;

    cards.forEach((card, i) => {
      const d = i - current; // offset from the centre: 0 = front and centre
      const a = Math.abs(d);
      const opacity = Math.max(0, 1 - a * 0.8);

      if (opacity <= 0) {
        card.style.visibility = "hidden";
        return;
      }

      card.style.visibility = "visible";
      card.style.opacity = opacity;
      card.style.zIndex = 100 - Math.round(a * 10);
      card.style.transform = `translateY(${d * 92}%) rotateX(${-d * 38}deg) scale(${1 - Math.min(a, 1) * 0.1})`;
    });

    const idx = Math.round(current);
    if (idx !== active) setActive(idx);
    bar.style.transform = `scaleX(${total > 1 ? current / (total - 1) : 1})`;

    if (current !== target) {
      requestAnimationFrame(render);
    } else {
      running = false;
    }
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
const portfolioItems = [
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/GoodMorningChat.png?updatedAt=1792865238413",
    alt: "Sebastien Augustin AI",
    onClick: "openSebastienAI()",
    title: "Sebastien Augustin AI",
    description:
      "Sebastien Augustin's AI Assistant, here to help you learn more about his work, process, and approach.",
    status: "Web App",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/Buddha.avif?updatedAt=1792865093296",
    alt: "Itinerary Flow",
    onClick: "openItineraryFlow()",
    title: "Itinerary Flow",
    description:
      "Create travel itineraries and easily manage your trips via a dashboard and CRM.",
    status: "Web App",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/like2.jpg?updatedAt=1792865298568",
    alt: "Work Gambit",
    onClick: "openWorkGambit()",
    title: "Work Gambit",
    description:
      "A dashboard to manage every aspect of your life. From tasks to work, finance, events, contacts, health and more.",
    status: "Web App",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/NocturneVIP.jpg?updatedAt=1792865330810",
    alt: "Nocturne VIP",
    onClick: "openNocturneVIP()",
    title: "Nocturne VIP",
    description:
      "A VIP Sections Reservation service for the top venues in Montreal, Medellin & Punta Cana.",
    status: "website",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/HighVibez.avif?updatedAt=1792865023411",
    alt: "High Vibez Global",
    onClick: "openHighVibez()",
    title: "High Vibez Global",
    description:
      "The #1 black-owned entertainment and travel agency in Playa Del Carmen to help you plan your next trip to Mexico.",
    status: "website",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/MAPS3.jpg?updatedAt=1792865345891",
    alt: "MAPS Canada",
    onClick: "openMapsCanada()",
    title: "MAPS Canada",
    description:
      "Web design and implementation of the Canadian charity committed to advancing psychedelic medicine in Canada.",
    status: "website",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/LuxuryFleetStudio.jpg?updatedAt=1792865234288",
    alt: "LuxuryFleetStudio",
    onClick: "openLuxuryFleetStudio()",
    title: "LuxuryFleetStudio",
    description:
      "Web Design/Development and Booking systems for private transporation services in the USA.",
    status: "website",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/AkajouLibrary.jpg?updatedAt=1792865045571",
    alt: "Akajou Library",
    onClick: "openAkajouLibrary()",
    title: "Akajou Library",
    description:
      "A curated collection of books written by Black authors from across the African, Caribbean, and other Black diasporas.",
    status: "website",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/ThrillGrind_Logo%20(black%20background).png?updatedAt=1757627992165",
    alt: "Thrill Grind",
    onClick: "openThrillGrind()",
    title: "Thrill Grind",
    description:
      "A community for men by men serious about finance, health, and stoicism. Start building your empire.",
    status: "website",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/MelinaPalacios3.jpg?updatedAt=1792865344016",
    alt: "Melina Palacios",
    onClick: "openMelinaPalacios()",
    title: "Melina Palacios",
    description:
      "A stylist in CDMX specializing in hair care, offering personalized consultations to enhance natural beauty.",
    status: "website",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/like.jpg?updatedAt=1792865185468",
    alt: "WG Directory",
    onClick: "openWGDirectory()",
    title: "WG Directory",
    description:
      "A directory of job boards, companies, marketplaces and tools for people looking for work in the USA or Canada.",
    status: "project",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/Daybook3.jpg?updatedAt=1792865214065",
    alt: "DayBook",
    onClick: "openDaybook()",
    title: "Daybook",
    description:
      "Todo app that lets you add to-dos per day and general notes for quick access. Also with a stat page to monitor your progress. ",
    status: "project",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/Stocky3.jpg?updatedAt=1792865338855",
    alt: "STOCKY",
    onClick: "openStocky()",
    title: "STOCKY",
    description:
      "Lets users save their stocks in different watchlists while being able to see latest news & chart info.",
    status: "project",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/worldConquer.jpg?updatedAt=1792865373649",
    alt: "World Conquer",
    onClick: "openWorldConquer()",
    title: "World Conquer",
    description:
      "A program where users can track their world conquering quest by tagging countries as visited, wishlist or excluded.",
    status: "project",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/ColorPalette.jpg?updatedAt=1792865133946",
    alt: "Palette Studio",
    onClick: "openPaletteStudio()",
    title: "Palette Studio",
    description:
      "A program that helps users create and compare color palettes in a quick manner.",
    status: "project",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/InvoiceBuilder.jpg?updatedAt=1792865387544",
    alt: "Invoice Creator",
    onClick: "openInvoiceBuilder()",
    title: "Invoice Creator",
    description:
      "A program that allows users to create and customize professional invoices for their business needs.",
    status: "project",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/DrumMachine.jpg?updatedAt=1792865322214",
    alt: "Drum Machine",
    onClick: "openDrumMachine()",
    title: "Drum Machine",
    description:
      "A music production program that allows users to create drum patterns using a variety of sounds and effects.",
    status: "project",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/EmailGenerator2.png?updatedAt=1792865270898",
    alt: "Email Generator",
    onClick: "openEmailGenerator()",
    title: "Email Generator",
    description:
      "Generate multiple professional email variations with a single click to reach business contacts .",
    status: "project",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/EmailExtractor.png?updatedAt=1792865255175",
    alt: "Email Extractor",
    onClick: "",
    title: "Email Extractor",
    description:
      "A chrome extension to extract emails from multiple websites in one click and download as csv.",
    status: "extension",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/club4.jpg?updatedAt=1792865181213",
    alt: "ProductivPro",
    onClick: "",
    title: "ProductivPro",
    description:
      "A chrome extension that lets users block 5 specific URLs for a set time so they can focus on work.",
    status: "extension",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/todolist.jpg?updatedAt=1792865230965",
    alt: "TodoList",
    onClick: "",
    title: "TodoList",
    description:
      "A chrome extension that lets users save a To-do List directly in their browser for quick access.",
    status: "extension",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/Haiti4.jpg?updatedAt=1792865345824",
    alt: "Haiti Runner Game",
    onClick: "openHaitiGame()",
    title: "The Haïtian Runner",
    description:
      "A 2D Haïti themed running game with objective of collecting coins and avoiding obstacles.",
    status: "Game",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/mackandalStudios.PNG?updatedAt=1756756223603",
    alt: "Mackandal Studios",
    onClick: "openMackandal()",
    title: "Mackandal Studios",
    description:
      "A creative studio specializing in concept art, storyboarding, and visual development for films, games, and animations.",
    status: "art",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/TheCatalyst/TheCatalyst_Frame4056.jpg?updatedAt=1756756600325",
    alt: "The Catalyst",
    onClick: "openMackandal()",
    title: "The Catalyst",
    description:
      "AI generated movie concept scenes exploring Haïti in 2050 as an alien invasion takes place.",
    status: "art",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/Frontend%20Design.png?updatedAt=1792865283536",
    alt: "Front-end",
    onClick: "openFrontend()",
    title: "Front-end Design",
    description:
      "Portfolio highlighting my creative vision, interactive layouts, and polished visual skills through engaging web heroes.",
    status: "design",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/GraphicDesign2.png?updatedAt=1792865243416",
    alt: "Graphic Design",
    onClick: "openGraphicDesign()",
    title: "Graphic Design",
    description:
      "A collection of flyers and branding materials showcasing my ability to create visually compelling designs using Figma.",
    status: "design",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/IMG_0797.JPG?updatedAt=1760052758209",
    alt: "Always Skilled",
    onClick: "openAlwaysSkilled()",
    title: "Always Skilled",
    description:
      "All my original Music Production for quick access for listeners.",
    status: "Music",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/CAPY%20WORLD%20-%20Logo%20(Black%20Background).png",
    alt: "CAPŸ",
    onClick: "openCapy()",
    title: "CAPŸ",
    description:
      "Original Music produced by Always Skilled for quick access for listeners.",
    status: "Music",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/HidroFlora.jpg?updatedAt=1792865307989",
    alt: "Hydro Flora",
    onClick: "openHydroflora()",
    title: "Hydro Flora",
    description:
      "A music composition contracted for an ad to match the Hydro Flora brand. Produced using Ableton Live.",
    status: "Music",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/Terastacks.png?updatedAt=1792865140617",
    alt: "Terastacks",
    onClick: "",
    title: "Terastacks",
    description:
      "A blockchain infrastructure that allowed users to buy, sell and transfer a digital currency called Teracode.",
    status: "Offline",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/TerastacksApp.png?updatedAt=1792865276682",
    alt: "Terastacks App",
    onClick: "",
    title: "Terastacks App",
    description:
      "A SAAS facilitating fund transfers from Credit Cards to online payment accounts such as PayPal, Stripe, Cash App & more.",
    status: "Offline",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/Diggit3.jpg?updatedAt=1792865261588",
    alt: "Diggit",
    onClick: "",
    title: "Diggit",
    description:
      "A microblogging website where users can post, repost, comment, like text posts and follow users and tags.",
    status: "Offline",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Screenshot%202025-10-09%20at%205.35.18%20PM.png?updatedAt=1760052944654",
    alt: "Xaragua Hotel",
    onClick: "",
    title: "Xaragua Hotel",
    description:
      "Web Development & Design for a 50 room hotel located in the beautiful coast of Haïti.",
    status: "Offline",
  },
];

// Call the function to append the items
appendPortfolioItems(portfolioItems);
