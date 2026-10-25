// === Function to append portfolio items ===
function appendPortfolioItems(items) {
  const portfolioContainer = document.getElementById("portfolioGallery");
  if (!portfolioContainer) {
    console.error("portfolioGallery container not found in DOM");
    return;
  }

  portfolioContainer.innerHTML = items
    .map((item) => {
      const key = item.title.toLowerCase().replace(/\s+/g, "");
      return `
        <button class="gallery-card project-gallery-card" type="button" data-gallery="${key}">
          <div class="gallery-media">
            <img src="${item.imageSrc}" alt="${item.alt}" loading="lazy" draggable="false" />
            <div class="gallery-glass"><p>${item.description}</p></div>
          </div>
          <div class="gallery-meta">
            <h3>${item.title}</h3>
            <span class="gallery-cat">Art</span>
          </div>
        </button>`;
    })
    .join("");
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
  console.error("Missing project gallery elements in DOM");
}

// === Open/close functions ===
function openProjectPreview(titleText, gallery) {
  const projectTitle = document.querySelector(".projectTitle");
  const projectGrid = document.querySelector(".projectGrid");
  const projectPreview = document.querySelector(".project_preview");

  if (!projectTitle || !projectGrid || !projectPreview) {
    console.error("Missing project gallery elements in DOM");
    return;
  }

  projectTitle.textContent = titleText;
  projectGrid.innerHTML = gallery
    .map(
      (imgUrl, i) => `
        <div class="gallery-media">
          <img
            src="${imgUrl}"
            class="project-preview-image"
            alt="${titleText} image ${i + 1}"
            loading="lazy"
            draggable="false"
          />
        </div>`,
    )
    .join("");
  projectPreview.classList.add("active");
  projectPreview.setAttribute("aria-hidden", "false");
  document.querySelector(".project-preview-close").focus();
}


function closeProjectPreview() {
  projectPreview.classList.remove("active");
  projectGrid.innerHTML = "";
  projectTitle.textContent = "";
  projectPreview.setAttribute("aria-hidden", "true");
}

// === Run after DOM is loaded ===
document.addEventListener("DOMContentLoaded", () => {
  appendPortfolioItems(portfolioItemsData);

  const portfolioGallery = document.getElementById("portfolioGallery");
  if (!portfolioGallery) {
    return;
  }

  portfolioGallery.addEventListener("click", (e) => {
    const card = e.target.closest(".project-gallery-card");
    if (!card) return;
    const key = card.dataset.gallery;
    const item = portfolioItemsData.find(
      (galleryItem) =>
        galleryItem.title.toLowerCase().replace(/\s+/g, "") === key,
    );
    if (!item || !galleries[key]) return;
    openProjectPreview(item.title, galleries[key]);
  });

});


document.addEventListener("click", (e) => {
  if (e.target.closest(".project-preview-close")) {
    closeProjectPreview();
    return;
  }
  if (projectPreview.classList.contains("active") && e.target === projectPreview) {
    closeProjectPreview();
  }
});

function openLargeImage(imgSrc) {
  const overlay = document.createElement("div");
  overlay.className = "project-image-lightbox";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Expanded project image");
  overlay.tabIndex = -1;
  const img = document.createElement("img");
  img.src = imgSrc;
  img.alt = "Expanded project artwork";
  overlay.appendChild(img);
  overlay.addEventListener("click", () => overlay.remove());
  document.body.appendChild(overlay);
  overlay.focus();
}

document.addEventListener("click", (e) => {
  const image = e.target.closest(".project-preview-image");
  if (!image) return;
  e.stopPropagation();
  openLargeImage(image.src);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const lightbox = document.querySelector(".project-image-lightbox");
    if (lightbox) {
      lightbox.remove();
      return;
    }
  }
  if (e.key === "Escape" && projectPreview.classList.contains("active"))
    closeProjectPreview();
});
