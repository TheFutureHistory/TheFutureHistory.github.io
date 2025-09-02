function appendPortfolioItems(items) {
    const portfolioContainer = document.getElementById('portfolioGallery'); // Assume this is the container where you want to append the items
  
    items.forEach(item => {
      const section = document.createElement('section');
      section.className = 'portfolioItem';
  
      section.innerHTML = `
        <img src="${item.imageSrc}" alt="${item.alt}" class="portfolioItemPhoto" onclick="${item.onClick}">
        <div class="portfolioItemInfo">
          <p class="portfolioItemInformation">${item.title}</p>
          <p class="portfolioItemInformation">${item.category}</p>

        </div>
      `;
  
      portfolioContainer.appendChild(section);
    });
  }

  // <p class="portfolioItemInformation">${item.year}</p>
  // Example usage:
  const portfolioItems = [
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/work%20gambit%20homepage?updatedAt=1756840652364',
      alt: 'Work Gambit',
      onClick: 'openWorkGambit()',
      title: 'Work Gambit',
      category: '.com',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/high%20vibez%20homepage?updatedAt=1756840668734',
      alt: 'High Vibez',
      onClick: 'openHighVibez()',
      title: 'High Vibez',
      category: '.com',
    },
    {
    imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/MAPSCanada.png?updatedAt=1756756484999',
    alt: 'MAPS Canada',
    onClick: 'openMapsCanada()',
    title: 'MAPS Canada',
    category: '.com',
    },
    {
    imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/mackandalStudios.PNG?updatedAt=1756756223603',
    alt: 'Mackandal Studios',
    onClick: 'openMackandal()',
    title: 'Mackandal',
    category: 'Studios',
    },
    {
    imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/TheCatalyst/TheCatalyst_Frame4056.jpg?updatedAt=1756756600325',
    alt: 'The Catalyst',
    onClick: 'openTheCatalyst()',
    title: 'The Catalyst',
    category: 'Concept Art',
    },
    {
    imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/FrontendPortfolio-1000.webp?updatedAt=1756756236423',
    alt: 'Front-end',
    onClick: 'openFrontend()',
    title: 'Front-end',
    category: 'Design',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/GraphicDesign2.png?updatedAt=1756756329601',
      alt: 'Graphic Design',
      onClick: 'openGraphicDesign()',
      title: 'Graphic',
      category: 'Design',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/worldConquer.png?updatedAt=1756756257126',
      alt: 'World Conquer',
      onClick: 'openWorldConquer()',
      title: 'World Conquer',
      category: 'Program',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/DrumMachine.png?updatedAt=1756756059303',
      alt: 'Drum Machine',
      onClick: 'openDrumMachine()',
      title: 'Drum Machine',
      category: 'Program',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/InvoiceBuilder.png?updatedAt=1756756431448',
      alt: 'Invoice Builder',
      onClick: 'openInvoiceBuilder()',
      title: 'Invoice Builder',
      category: 'Program',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/HydroFlora.jpg?updatedAt=1756756108318',
      alt: 'Hydro Flora',
      onClick: 'openHydroflora()',
      title: 'Hydro Flora',
      category: 'Music',
    }
  ];
  
  // Call the function to append the items
  appendPortfolioItems(portfolioItems);