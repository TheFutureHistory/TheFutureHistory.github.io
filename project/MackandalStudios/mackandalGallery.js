// === Function to append portfolio items ===
function appendPortfolioItems(items) {
  const portfolioContainer = document.getElementById("portfolioGallery");
  if (!portfolioContainer) {
    console.error("❌ portfolioGallery container not found in DOM");
    return;
  }

  console.log("✅ Appending portfolio items...");
  items.forEach((item, i) => {
    const section = document.createElement("section");
    section.className = "portfolioItem";

    section.innerHTML = `
      <img src="${item.imageSrc}" alt="${item.alt}" class="portfolioItemPhoto">
      <div class="portfolioItemInfo">
        <p class="portfolioItemInformation">${item.title}</p>
        <p class="portfolioItemDescription">${item.description}</p>
      </div>
    `;

    portfolioContainer.appendChild(section);
    console.log(`🖼️ Added portfolio item #${i + 1}: ${item.title}`);
  });
}

// === Portfolio items data ===
const portfolioItemsData = [
  { imageSrc: "https://ik.imagekit.io/sebastienaugustin/images/projects/TheCatalyst/TheCatalyst_Frame4056.jpg?updatedAt=1756756600325", alt: "The Catalyst", title: "The Catalyst" , 
    description: `In 2050, the skies over Haïti, Port-au-Prince darken as an alien invasion takes place.
                Inspired by gang activities in Haïti.`},
  { imageSrc: "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Models/Gold%20On%20Black.jpg?updatedAt=1756756536326", alt: "Models", title: "Models", 
    description: `How will the future of High Fashion marketing function in the age of AI generated models?` },
  { imageSrc: "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/GOLDWOMEN/goldafro.jpg?updatedAt=1756756532064", alt: "GOLD WOMEN", title: "GOLD WOMEN", 
    description: `From the struggle of inequality from racism and sexist, ebony women still shine through it all.` },
  { imageSrc: "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Reality/blackjesus.jpg?updatedAt=1756756501252", alt: "Reality", title: "Reality", 
    description: "Who determines what is real in an era where anything can be generated to represent reality." },
  { imageSrc: "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Postcards/haiti%20Postcard3.jpg?updatedAt=1756756564158", alt: "Postcards", title: "Postcards", 
    description: "I've been around the world but I always carry Haïti with me." },
  { imageSrc: "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Misc/diamond.jpg?updatedAt=1756756588389", alt: "Misc", title: "Misc", 
    description: "Anything conceived by the mind can now be generated in less than 1 minute. Creativity is the only limitation." },
];

// === Define galleries ===
const galleries = {
  goldwomen: [
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/GOLDWOMEN/goldafro.jpg?updatedAt=1756756532064",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/GOLDWOMEN/goldwomen2.jpg?updatedAt=1756756515870",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/GOLDWOMEN/goldwomen3.jpg?updatedAt=1756756514234",
  ],
  models: [
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Models/Gold%20On%20Black.jpg?updatedAt=1756756536326",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Models/Goldonblack4.jpg?updatedAt=1756756542506",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Models/Gold%20on%20Black2.jpg?updatedAt=1756756541794",
    // "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Models/Gold%20on%20black3.jpg?updatedAt=1756756543644",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Models/BlackModel.jpg?updatedAt=1756756531614",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Models/BlackModel3.jpg?updatedAt=1756756542401",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Models/White%20HorseWoman.jpg?updatedAt=1756756558407",
  ],
  misc:[
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Misc/spachsipburning2.jpg?updatedAt=1756756565974",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Misc/ALIENCRASH.jpg?updatedAt=1756756599284",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Misc/desallinestroop3.jpg?updatedAt=1756756564665",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Misc/diamond.jpg?updatedAt=1756756588389",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Misc/HAITI%20-%20GTA5.jpg?updatedAt=1756756566127",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Misc/HAITI%20-%20GTA9.jpg?updatedAt=1756756595916",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Misc/Restaurant%20-%20alien.jpg?updatedAt=1756756565593",
  ],
  thecatalyst: [
    "https://ik.imagekit.io/sebastienaugustin/images/projects/TheCatalyst/TheCatalyst_Frame1012.jpg?updatedAt=1756756619430",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/TheCatalyst/TheCatalyst_Frame3034.jpg?updatedAt=1756756622994",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/TheCatalyst/TheCatalyst_Frame1265%20.jpg?updatedAt=1756756598651",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/TheCatalyst/TheCatalyst_Frame2689%20.jpg?updatedAt=1756756621616",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/TheCatalyst/TheCatalyst_Frame2311%20.jpg?updatedAt=1756756598376",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/TheCatalyst/TheCatalyst_Frame0652.jpg?updatedAt=1756756600764",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/TheCatalyst/TheCatalyst_Frame1884.jpg?updatedAt=1756756596900",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/TheCatalyst/TheCatalyst_Frame2020.jpg?updatedAt=1756756598567",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/TheCatalyst/TheCatalyst_Frame0154.jpg?updatedAt=1756756598645",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/TheCatalyst/TheCatalyst_Frame0247.jpg?updatedAt=1756756612632",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/TheCatalyst/TheCatalyst_Frame3388.jpg?updatedAt=1756756613936",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/TheCatalyst/TheCatalyst_Frame3730.jpg?updatedAt=1756756622969",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/TheCatalyst/TheCatalyst_Frame4056.jpg?updatedAt=1756756600325",
  ],
  reality: [
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Reality/black%20barbershop.jpg?updatedAt=1756756502310",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Reality/blackbarbershop2.jpg?updatedAt=1756756487034",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Reality/blackjesus.jpg?updatedAt=1756756501252",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Reality/revolution.jpg?updatedAt=1756756514923",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Reality/image_fx%20(1).jpg?updatedAt=1756756510891",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Reality/haitian%20woemn.jpg?updatedAt=1756756488257",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Reality/beachgirl.jpg?updatedAt=1756756513424",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Reality/dominoes.jpg?updatedAt=1756756516306",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Reality/Haitian%20revolution.jpg?updatedAt=1756756483236",
  ],
  postcards: [
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Postcards/haiti%20postcard%205.jpg?updatedAt=1756756566085",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Postcards/haiti%20postcard.jpg?updatedAt=1756756565379",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Postcards/haiti%20postcard2.jpg?updatedAt=1756756564037",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Postcards/haiti%20Postcard3.jpg?updatedAt=1756756564158",
    "https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Postcards/haiti%20postcard4.jpg?updatedAt=1756756562336",
  ]

};

// === Select project preview elements ===
const projectTitle = document.querySelector(".projectTitle");
const projectGrid = document.querySelector(".projectGrid");
const projectPreview = document.querySelector(".project_preview");

if (!projectTitle || !projectGrid || !projectPreview) {
  console.error("❌ Missing .projectTitle, .projectGrid, or .project_preview in DOM");
}

// === Open/close functions ===
function openProjectPreview(titleText, gallery) {
  const projectTitle = document.querySelector(".projectTitle");
  const projectGrid = document.querySelector(".projectGrid");
  const projectPreview = document.querySelector(".project_preview");

  if (!projectTitle || !projectGrid || !projectPreview) {
    console.error("❌ Missing .projectTitle, .projectGrid, or .project_preview in DOM");
    return;
  }

  console.log(`🟢 Opening project preview for: ${titleText}`);

  projectTitle.textContent = titleText;
  projectGrid.innerHTML = "";

  gallery.forEach((imgUrl, i) => {
    const img = document.createElement("img");
    img.src = imgUrl;
    img.classList.add("project_gallery");
    img.alt = `${titleText} image ${i + 1}`;
    projectGrid.appendChild(img);
    console.log(`   ➕ Added image ${i + 1}: ${imgUrl}`);
  });

  projectPreview.classList.add("active");

  // Add click listeners to gallery images
  const galleryImages = document.querySelectorAll(".project_gallery");
  galleryImages.forEach((img) => {
    img.addEventListener("click", (e) => {
      e.stopPropagation();
      openLargeImage(img.src);
    });
  });
}


function closeProjectPreview() {
  console.log("🔴 Closing project preview...");
  projectPreview.classList.remove("active");
  projectGrid.innerHTML = "";
  projectTitle.textContent = "";
}

// === Run after DOM is loaded ===
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM fully loaded");
  appendPortfolioItems(portfolioItemsData);

  const portfolioGallery = document.getElementById("portfolioGallery");
  if (!portfolioGallery) {
    console.error("❌ portfolioGallery not found for event delegation");
    return;
  }

  // Event delegation — detect clicks anywhere in a portfolioItem
  portfolioGallery.addEventListener("click", (e) => {
    const portfolioItem = e.target.closest(".portfolioItem");
    if (!portfolioItem) {
      console.log("⚠️ Click not inside a .portfolioItem");
      return;
    }

    e.stopPropagation();

    // Find the title text within the clicked item
    const info = portfolioItem.querySelector(".portfolioItemInformation");
    if (!info) {
      console.error("❌ No .portfolioItemInformation found inside clicked item");
      return;
    }

    const titleText = info.textContent.trim();
    const key = titleText.toLowerCase().replace(/\s+/g, "");
    console.log(`🖱️ Clicked project: "${titleText}" → key: "${key}"`);

    if (galleries[key]) {
      openProjectPreview(titleText, galleries[key]);
    } else {
      console.warn(`⚠️ No gallery found for key: "${key}"`);
      projectTitle.textContent = titleText;
      projectGrid.innerHTML = `<p>No gallery found for "${titleText}".</p>`;
      projectPreview.classList.add("active");
    }
  });
});


// === Click outside to close ===
document.addEventListener("click", (e) => {
  if (projectPreview.classList.contains("active") && !projectPreview.contains(e.target)) {
    console.log("🖱️ Clicked outside of project preview");
    closeProjectPreview();
  }
});



// Function to open image in large view
function openLargeImage(imgSrc) {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0,0,0,0.8)";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = 9999;
  overlay.style.cursor = "pointer";

  // Create image
  const img = document.createElement("img");
  img.src = imgSrc;
  img.style.height = "80vh";
  img.style.maxWidth = "80vw"; // 80% of viewport height
  img.style.width = "auto"; // width adjusts proportionally
  img.style.objectFit = "contain";
  overlay.appendChild(img);

  // Click overlay to close
  overlay.addEventListener("click", () => {
    document.body.removeChild(overlay);
  });

  document.body.appendChild(overlay);
}

// Add event listener to all project_gallery images after project preview is opened
function addGalleryClickListeners() {
  const galleryImages = document.querySelectorAll(".project_gallery");
  galleryImages.forEach((img) => {
    img.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent closing project preview
      openLargeImage(img.src);
    });
  });
}

