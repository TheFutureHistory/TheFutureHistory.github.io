function appendPortfolioItems(items) {
    const portfolioContainer = document.getElementById('build-grid'); // Assume this is the container where you want to append the items
  
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'build-card';
      const status = item.status || 'Online';

      card.innerHTML = `
        <div class="build-visual" onclick="${item.onClick}">
          <div class="build-row">
            <img src="${item.imageSrc}" alt="${item.alt}" >
            <div>
              <p class="build-status">${status}</p>
            </div>

          </div>
          <div class="build-row">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        </div>
      `;

      const statusEl = card.querySelector('.build-status');
      const lowerStatus = status.toLowerCase();
      if (lowerStatus === 'online') {
        statusEl.style.background = '#CFFAE4';
        statusEl.style.color = '#007A55';
      } else if (lowerStatus === 'offline') {
        statusEl.style.background = '#FEE2E2';
        statusEl.style.color = '#C2000C';
      } else if (lowerStatus === 'art') {
        statusEl.style.background = '#FFF0D9'; // new light orange for art
        statusEl.style.color = '#B35C00';
      } else if (lowerStatus === 'music') {
        statusEl.style.background = '#E8DFFF'; // new light purple for music
        statusEl.style.color = '#5C00B3';
      } else if (lowerStatus === 'design') {
        statusEl.style.background = '#DBEAFF';
        statusEl.style.color = '#1447E5';
      } else if (lowerStatus === 'project') {
        statusEl.style.background = '#fff3cd';
        statusEl.style.color = '#BA4D00';
      } else if (lowerStatus === 'in progress') {
        statusEl.style.background = '#fff3cd';
        statusEl.style.color = '#BA4D00';
      } else {
        statusEl.style.background = '#E6E7EB';
        statusEl.style.color = '#394456';
      }

  
      portfolioContainer.appendChild(card);
    });
  }
  const portfolioItems = [
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/GMC_black.png',
      alt: 'GoodMorningChat',
      onClick: 'openGoodMorningChat()',
      title: 'GoodMorningChat',
      description: 'A Digital growth agency elevating Brands through strategic creativity & reputation management.',
      status: 'online',
      category: 'Founder',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/High%20Vibez%20-%20Logo%20(Black)%20_Print_.png?updatedAt=1760058060512',
      alt: 'High Vibez Global',
      onClick: 'openHighVibez()',
      title: 'High Vibez Global',
      description: 'The #1 black-owned entertainment and travel agency in Playa Del Carmen to help you plan your next trip to Mexico.',
      status: 'online',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/WG_blackBox.PNG?updatedAt=1757627966922',
      alt: 'Work Gambit',
      onClick: 'openWorkGambit()',
      title: 'Work Gambit',
      description: 'A directory with job boards, companies and tools to help job seekers with their career development.',
      status: 'online',
    },
    {
    imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/Screenshot%202025-10-09%20at%205.04.28%20PM.png?updatedAt=1760051086124',
    alt: 'MAPS Canada',
    onClick: 'openMapsCanada()',
    title: 'MAPS Canada',
    description: 'Web design and implementation of the Canadian charity committed to advancing psychedelic medicine in Canada.',
    status: 'online',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/Logo.png?updatedAt=1762197005313',
      alt: 'Akajou Library',
      onClick: 'openAkajouLibrary()',
      title: 'Akajou Library',
      description: 'A curated collection of books written by Black authors from across the African, Caribbean, and other Black diasporas.',
      status: 'online',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/ThrillGrind_Logo%20(black%20background).png?updatedAt=1757627992165',
      alt: 'Thrill Grind',
      onClick: 'openThrillGrind()',
      title: 'Thrill Grind',
      description: 'A community for men by men serious about finance, health, and stoicism. Start building your empire.',
      status: 'online',
    },
    {
    imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/mackandalStudios.PNG?updatedAt=1756756223603',
    alt: 'Mackandal Studios',
    onClick: 'openMackandal()',
    title: 'Mackandal Studios',
    description: 'A creative studio specializing in concept art, storyboarding, and visual development for films, games, and animations.',
      status: 'art',
    },
    {
    imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/TheCatalyst/TheCatalyst_Frame4056.jpg?updatedAt=1756756600325',
    alt: 'The Catalyst',
    onClick: 'openMackandal()',
    title: 'The Catalyst',
    description: 'AI generated movie concept scenes exploring Haïti in 2050 as an alien invasion takes place.',
    status: 'art',
    },
    {
    imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/FrontendPortfolio-1000.webp?updatedAt=1756756236423',
    alt: 'Front-end',
    onClick: 'openFrontend()',
    title: 'Front-end Design',
    description: 'Portfolio highlighting my creative vision, interactive layouts, and polished visual skills through engaging web heroes.',
    status: 'design',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/GraphicDesign2.png?updatedAt=1756756329601',
      alt: 'Graphic Design',
      onClick: 'openGraphicDesign()',
      title: 'Graphic Design',
      description: 'A collection of flyers and branding materials showcasing my ability to create visually compelling designs using Figma.',
      status: 'design',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/world.jpeg?updatedAt=1760137355015',
      alt: 'World Conquer',
      onClick: 'openWorldConquer()',
      title: 'World Conquer',
      description: 'A program where users can track their world conquering quest by tagging countries as visited, wishlist or excluded.',
      status: 'project',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/SubLogo.jpg?updatedAt=1758986126741',
      alt: 'Expense Tracker',
      onClick: 'openExpenseTracker()',
      title: 'Expense Tracker',
      description: 'A program that helps users manage their finances by manually tracking expenses.',
      status: 'in progress',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/invoicegenerator.jpg?updatedAt=1760220049982',
      alt: 'Invoice Creator',
      onClick: 'openInvoiceBuilder()',
      title: 'Invoice Creator',
      description: 'A program that allows users to create and customize professional invoices for their business needs.',
      status: 'project',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/DrumMachine.png?updatedAt=1756756059303',
      alt: 'Drum Machine',
      onClick: 'openDrumMachine()',
      title: 'Drum Machine',
      description: 'A music production program that allows users to create drum patterns using a variety of sounds and effects.',
      status: 'project',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/emailgenerator.jpg?updatedAt=1760220049884',
      alt: 'Email Generator',
      onClick: 'openEmailGenerator()',
      title: 'Email Generator',
      description: 'Generate multiple professional email variations with a single click to reach business contacts .',
      status: 'project',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/emailgenerator.jpg?updatedAt=1760220049884',
      alt: 'Email Extractor',
      onClick: '',
      title: 'Email Extractor',
      description: 'A chrome extension to extract emails from multiple websites in one click and download as csv.',
      status: 'extension',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/ProductiveP.png?updatedAt=1760214036489',
      alt: 'ProductivPro',
      onClick: '',
      title: 'ProductivPro',
      description: 'A chrome extension that lets users block 5 specific URLs for a set time so they can focus on work.',
      status: 'extension',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/icon192.png?updatedAt=1760214942716',
      alt: 'TodoList',
      onClick: '',
      title: 'TodoList',
      description: 'A chrome extension that lets users save a To-do List directly in their browser for quick access.',
      status: 'extension',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/IMG_0797.JPG?updatedAt=1760052758209',
      alt: 'Always Skilled',
      onClick: 'openAlwaysSkilled()',
      title: 'Always Skilled',
      description: 'All my original music production for quick access for listeners.',
      status: 'Music',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/HydroFlora.jpg?updatedAt=1756756108318',
      alt: 'Hydro Flora',
      onClick: 'openHydroflora()',
      title: 'Hydro Flora',
      description: 'A music composition contracted for an ad to match the Hydro Flora brand. Produced using Ableton Live.',
      status: 'Music',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/terastacks_logo.jpg?updatedAt=1760052999268',
      alt: 'Terastacks',
      onClick: '',
      title: 'Terastacks',
      description: 'A blockchain infrastructure that allowed users to buy, sell and transfer a digital currency called Teracode.',
      status: 'Offline',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/Screenshot%202025-10-09%20at%205.37.11%20PM.png?updatedAt=1760053049149',
      alt: 'Terastacks App',
      onClick: '',
      title: 'Terastacks App',
      description: 'A SAAS facilitating fund transfers from Credit Cards to online payment accounts such as PayPal, Stripe, Cash App & more.',
      status: 'Offline',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/diggit_logo.png?updatedAt=1760053091338',
      alt: 'Diggit',
      onClick: '',
      title: 'Diggit',
      description: 'A microblogging website where users can post, repost, comment, like text posts and follow users and tags.',
      status: 'Offline',
    },
    {
      imageSrc: 'https://ik.imagekit.io/sebastienaugustin/images/projects/Screenshot%202025-10-09%20at%205.35.18%20PM.png?updatedAt=1760052944654',
      alt: 'Xaragua Hotel',
      onClick: '',
      title: 'Xaragua Hotel',
      description: 'Web Development & Design for a 50 room hotel located in the beautiful coast of Haïti.',
      status: 'Offline',
    },
  ];
  
  // Call the function to append the items
  appendPortfolioItems(portfolioItems);