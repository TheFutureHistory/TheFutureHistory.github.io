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
    imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/TheCatalyst/TheCatalyst_Frame4056.jpg?updatedAt=1756756600325',
      alt: 'The Catalyst',
      onClick: 'openTheCatalyst()',
      title: 'The Catalyst',
      category: '',
    },
    {
    imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Models/Gold%20On%20Black.jpg?updatedAt=1756756536326',
    alt: 'Models',
    onClick: 'openModels()',
    title: 'Models',
    category: '',
    },
    {
    imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/GOLDWOMEN/goldafro.jpg?updatedAt=1756756532064',
    alt: 'GOLD WOMEN',
    onClick: 'openGoldWomen()',
    title: 'GOLD WOMEN',
    category: '',
    },
    {
    imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Reality/blackjesus.jpg?updatedAt=1756756501252',
    alt: 'Reality',
    onClick: 'openReality()',
    title: 'Reality',
    category: '',
    },
    {
    imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Postcards/haiti%20Postcard3.jpg?updatedAt=1756756564158',
    alt: 'Postcards',
    onClick: 'openPostcards()',
    title: 'Postcards',
    category: '',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/Mackandal/Misc/diamond.jpg?updatedAt=1756756588389',
      alt: 'Misc',
      onClick: 'openMisc()',
      title: 'Misc',
      category: '',
    },
  ];
  
  // Call the function to append the items
  appendPortfolioItems(portfolioItems);