/* Shared on every page: injects nav, mobile menu, footer and the About/Contact modals. */
(function () {
  const root = document.documentElement;
  const body = document.body;
  // Custom cursor
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  /* Old homepage anchors -> new pages */
  if (body.dataset.page === "home") {
    const redirect = {
      "#services": "/services",
      "#Capabilities": "/services",
      "#portfolio": "/portfolio",
    }[location.hash];
    if (redirect) location.replace(redirect);
  }

  const NAV = `
    <nav class="navbar">
      <div class="nav-content">
        <a class="logo" href="/">
          <span>Sebastien Augustin</span>
        </a>
        <ul class="nav-links">
          <li><a href="#about" data-modal="about">About</a></li>
          <li><a href="/portfolio/">Portfolio Grid</a></li>
          <li><a href="/services/">Services</a></li>
        </ul>
        <div class="nav-actions">
          <button class="btn-primary" data-modal="contact">Get Started</button>
          <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-menu">
            <span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
    <div class="mobile-menu" id="mobile-menu">
      <a href="#about" data-modal="about">About</a>
      <a href="/portfolio/">Portfolio Grid</a>
      <a href="/services/">Services</a>
      <button class="btn-primary" data-modal="contact">Get Started</button>
    </div>`;

  const FOOTER = `
    <footer class="footer">
      <p>&copy; ${new Date().getFullYear()} Sebastien Augustin. All rights reserved.</p>
            <div class="footerLegal">
        <a href="https://twitter.com/sebastientalks" target="_blank" aria-label="Twitter">Twitter</a>
        <a href="https://www.linkedin.com/in/sebastien-augustin/" target="_blank" aria-label="LinkedIn">LinkedIn</a>
      </div>
      <div class="footerLegal">
        <a href="/terms/" aria-label="Terms">Terms</a>
        <a href="/privacy/" aria-label="Privacy Policy">Privacy Policy</a>
      </div>
    </footer>`;

  const ABOUT = `
    <dialog class="modal" id="modal-about" aria-label="About">
      <button class="modal-close" aria-label="Close">&times;</button>
      <div class="aboutSection">
        <div class="about-Capabilities">
          <h2 class="sectionTitle">
            Your Creative Director for <br />
            <span class="white">Strategic Brand Growth</span>
          </h2>
          <p class="white">
            Through strategy-driven design and development, Sebastien helps
            brands in scaling efficiently, innovating with purpose, and
            maintaining a competitive edge.
          </p>
          <p>Discover how measurable impact is created for brands like yours.</p>
        </div>
        <img class="aboutImage" src="https://ik.imagekit.io/goodmorningchat/Misc/Header21.png?updatedAt=1770149038754" alt="" loading="lazy" />
      </div>
    </dialog>`;

  const CONTACT = `
    <dialog class="modal" id="modal-contact" aria-label="Contact">
      <button class="modal-close" aria-label="Close">&times;</button>
      <div class="contact-wrapper">
        <div class="contact-info">
          <h2>Let's Talk</h2>
          <p class="contact-description">
            <span class="white">Tell us your needs</span> - From 0-1 <br />
            Branding & Web Development
          </p>
          <p class="contact-description">
            Have a question or want to learn more about Sebastien's process?
            We'd love to hear from you.
          </p>
        </div>
        <div class="contact-form-container">
          <form class="contact-form" id="contactForm" action="https://api.web3forms.com/submit" method="POST">
            <input type="hidden" name="access_key" value="09026c59-8dde-41cf-adac-ab6ac323bc11" />
            <div class="form-row">
              <div class="form-field"><input type="text" name="firstName" required placeholder="John" aria-label="First name" /></div>
              <div class="form-field"><input type="text" name="lastName" required placeholder="Doe" aria-label="Last name" /></div>
            </div>
            <div class="form-field"><input type="email" name="email" required placeholder="john@example.com" aria-label="Email" /></div>
            <div class="form-field"><input type="text" name="company" placeholder="Your Company Name" aria-label="Company" /></div>
            <div class="form-field"><textarea name="message" rows="5" required placeholder="Type your message here ..." aria-label="Message"></textarea></div>
            <div class="form-field checkbox-field">
              <input type="checkbox" id="newsletter" name="newsletter" />
              <label for="newsletter" class="checkbox-label">I'd like to receive product updates and marketing emails</label>
            </div>
            <button type="submit" class="btn-submit">Send Message</button>
            <p class="form-note">We'll get back to you within 24 hours.</p>
          </form>
          <p class="form-message" role="status"></p>
        </div>
      </div>
    </dialog>`;

  body.insertAdjacentHTML("afterbegin", NAV);
  body.insertAdjacentHTML("beforeend", FOOTER + ABOUT + CONTACT);

  const currentPath = location.pathname.replace(/\/+$/, "") || "/";
  document.querySelectorAll('.nav-links a[href^="/"]').forEach((link) => {
    const linkPath = new URL(link.href).pathname.replace(/\/+$/, "") || "/";
    if (linkPath === currentPath) link.setAttribute("aria-current", "page");
  });

  /* Navbar height -> --nav-h (used by the roller and sticky filter bar) */
  const nav = document.querySelector(".navbar");
  const setNavHeight = () =>
    root.style.setProperty("--nav-h", nav.offsetHeight + "px");
  setNavHeight();
  window.addEventListener("resize", setNavHeight);
  window.addEventListener("load", setNavHeight);

  /* Mobile menu */
  const toggle = document.querySelector(".menu-toggle");
  const setMenu = (open) => {
    root.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", open);
  };
  toggle.addEventListener("click", () =>
    setMenu(!root.classList.contains("menu-open")),
  );
  window
    .matchMedia("(min-width: 861px)")
    .addEventListener("change", (e) => e.matches && setMenu(false));
  document.addEventListener(
    "keydown",
    (e) => e.key === "Escape" && setMenu(false),
  );

  /* Modals */
  const modals = document.querySelectorAll("dialog.modal");
  const openModal = (name) => {
    const dialog = document.getElementById("modal-" + name);
    if (!dialog || dialog.open) return;
    dialog.showModal();
    dialog.appendChild(cursor);
    root.classList.add("no-scroll");
  };

  modals.forEach((dialog) => {
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog || e.target.closest(".modal-close"))
        dialog.close();
    });
    dialog.addEventListener("close", () => {
      const openDialog = document.querySelector("dialog.modal[open]");
      (openDialog || body).appendChild(cursor);
      root.classList.remove("no-scroll");
      if (["#about", "#contact"].includes(location.hash)) {
        history.replaceState(null, "", location.pathname + location.search);
      }
    });
  });

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-modal]");
    if (!trigger) return;
    e.preventDefault();
    setMenu(false);
    openModal(trigger.dataset.modal);
  });

  if (["#about", "#contact"].includes(location.hash))
    openModal(location.hash.slice(1));

  /* Contact form */
  const form = document.getElementById("contactForm");
  const message = document.querySelector(".form-message");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const button = form.querySelector(".btn-submit");
    button.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
      });
      if (!res.ok) throw new Error();
      message.textContent = "Your message was successfully sent!";
      form.reset();
    } catch {
      message.textContent =
        "Unfortunately, we can not send your message. Please try again.";
    }
    button.disabled = false;
  });
})();
