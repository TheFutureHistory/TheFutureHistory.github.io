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
      imageSrc: './static/images/projects/HighVibez.png',
      alt: 'High Vibez',
      onClick: 'openHighVibez()',
      title: 'High Vibez',
      category: '.com',
    },
    {
    imageSrc: './static/images/projects/MAPSCanada-500.webp',
    alt: 'MAPS Canada',
    onClick: 'openMapsCanada()',
    title: 'MAPS Canada',
    category: '.com',
    },
    {
    imageSrc: './static/images/projects/mackandalStudios.PNG',
    alt: 'Mackandal Studios',
    onClick: 'openMackandal()',
    title: 'Mackandal',
    category: 'Studios',
    },
    {
    imageSrc: './static/images/projects/FrontendPortfolio-500.webp',
    alt: 'Front-end',
    onClick: 'openFrontend()',
    title: 'Front-end',
    category: 'Design',
    },
    {
      imageSrc: './static/images/projects/SATURDAZE.webp',
      alt: 'Front-end',
      onClick: 'openGraphicDesign()',
      title: 'Graphic',
      category: 'Design',
    },
    {
      imageSrc: './static/images/projects/Logos.webp',
      alt: 'Front-end',
      onClick: 'openLogos()',
      title: 'Logo',
      category: 'Design',
    },
    {
      imageSrc: './static/images/projects/worldConquer.png',
      alt: 'World Conquer',
      onClick: 'openWorldConquer()',
      title: 'World Conquer',
      category: 'Program',
    },
    {
      imageSrc: './static/images/DrumMachine.png',
      alt: 'Drum Machine',
      onClick: 'openDrumMachine()',
      title: 'Drum Machine',
      category: 'Program',
    },
    {
      imageSrc: './static/images/projects/HydroFlora.jpg',
      alt: 'Hydro Flora',
      onClick: 'openHydroflora()',
      title: 'Hydro Flora',
      category: 'Music',
    }
  ];
  
  // Call the function to append the items
  appendPortfolioItems(portfolioItems);