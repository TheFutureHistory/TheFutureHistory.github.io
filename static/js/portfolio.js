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
          <p class="portfolioItemInformation">${item.year}</p>
        </div>
      `;
  
      portfolioContainer.appendChild(section);
    });
  }
  
  // Example usage:
  const portfolioItems = [
    {
      imageSrc: './static/images/DrumMachine.png',
      alt: 'Drum Machine',
      onClick: 'openDrumMachine()',
      title: 'Drum Machine',
      category: 'Music',
      year: '2024'
    },
    {
      imageSrc: './static/images/projects/worldConquer.png',
      alt: 'World Conquer',
      onClick: 'openWorldConquer()',
      title: 'World Conquer',
      category: 'Travel',
      year: '2024'
    },
    {
    imageSrc: './static/images/projects/MAPSCanada-500.webp',
    alt: 'MAPS Canada',
    onClick: 'openMapsCanada()',
    title: 'MAPS Canada',
    category: 'Non-profit',
    year: '2022'
    },
    {
    imageSrc: './static/images/projects/XaraguaHotel-500.webp',
    alt: 'Xaragua Hotel',
    onClick: 'openXaragua()',
    title: 'Xaragua Hotel',
    category: 'Travel',
    year: '2017'
    },
    {
    imageSrc: './static/images/projects/alwaysSkilled.png',
    alt: 'Always Skilled',
    onClick: 'openAlwaysSkilled()',
    title: 'Always Skilled',
    category: 'Music',
    year: '2005'
    },
    {
    imageSrc: './static/images/projects/HydroFlora.jpg',
    alt: 'Hydro Flora',
    onClick: 'openHydroflora()',
    title: 'Hydro Flora',
    category: 'Music Production',
    year: '2017'
    },
    {
    imageSrc: './static/images/projects/FrontendPortfolio-500.webp',
    alt: 'Front-end',
    onClick: 'openBehance()',
    title: 'Front-end',
    category: 'Design',
    year: '0000'
    }
  ];
  
  // Call the function to append the items
  appendPortfolioItems(portfolioItems);