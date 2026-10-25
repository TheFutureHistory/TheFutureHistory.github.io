/* ------------------------------------------------------------------
   Used by BOTH the homepage roller and the portfolio page.
   Optional per item:  state: "Live"   (shown as "Status" on the homepage roller;
                                        hidden when missing)
                       industry: "AI" (shown as "Industry" on the homepage roller;
                                       hidden when missing)
   button: "Visit site" (custom roller button label)
   link: "https://..."  (or an internal path)
   - with `link`    -> the card/button goes to the link
   - without `link` -> falls back to an existing `onClick` function, if provided
   - neither        -> not clickable (offline / extension items)
------------------------------------------------------------------- */
const portfolioItems = [
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/GoodMorningChat.png?updatedAt=1792865238413",
    alt: "GoodMorningChat AI",
    link: "GoodMorningChat.com",
    title: "GoodMorningChat AI",
    description:
      "GoodMorningChat is Sebastien's AI Assistant, here to help you learn more about his work, process, and approach.",
    button: "have a chat",
    status: "SAAS",
    state: "Live",
    industry: "AI",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/Haiti5.jpg",
    alt: "Itinerary Flow",
    link: "ItineraryFlow.com",
    title: "Itinerary Flow",
    description:
      "Create travel itineraries and easily manage your trips via a dashboard and CRM.",
    button: "visit site",
    status: "SAAS",
    state: "Live",
    industry: "Travel",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/workGambit.jpg",
    alt: "Work Gambit",
    link: "WorkGambit.com",
    title: "Work Gambit",
    description:
      "A dashboard to manage every aspect of your life. From tasks to work, finance, events, contacts, health and more.",
    button: "visit site",
    status: "SAAS",
    state: "Live",
    industry: "Perosnal Life",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/NocturneVIP.jpg?updatedAt=1792865330810",
    alt: "Nocturne VIP",
    link: "nocturnevip.com",
    title: "Nocturne VIP",
    description:
      "A VIP Sections Reservation service for the top venues in Montreal, Medellin & Punta Cana.",
    button: "visit site",
    status: "Website",
    state: "Live",
    industry: "Nightlife",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/HighVibez.jpg",
    alt: "High Vibez Global",
    link: "highvibezglobal.com",
    title: "High Vibez Global",
    description:
      "The #1 black-owned entertainment and travel agency in Playa Del Carmen to help you plan your next trip to Mexico.",
    button: "visit site",
    status: "website",
    state: "pending",
    industry: "pending",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/MAPS3.jpg?updatedAt=1792865345891",
    alt: "MAPS Canada",
    link: "mapscanada.org",
    title: "MAPS Canada",
    description:
      "Web design and implementation of the Canadian charity committed to advancing psychedelic medicine in Canada.",
    button: "visit site",
    status: "Website",
    state: "Live",
    industry: "Non-profit",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/LuxuryFleetStudio2.jpg",
    alt: "LuxuryFleetStudio",
    link: "luxuryfleetstudio.com",
    title: "LuxuryFleetStudio",
    description:
      "Web Design/Development and Booking systems for private transporation services in the USA.",
    button: "visit site",
    status: "Website",
    state: "Live",
    industry: "Transportation",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/AkajouLibrary.jpg?updatedAt=1792865045571",
    alt: "Akajou Library",
    link: "akajoulibrary.com",
    title: "Akajou Library",
    description:
      "A curated collection of books written by Black authors from across the African, Caribbean, and other Black diasporas.",
    button: "visit site",
    status: "Website",
    state: "Live",
    industry: "Education",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/thrillGrind.jpg",
    alt: "Thrill Grind",
    link: "thrillgrind.com",
    title: "Thrill Grind",
    description:
      "A community for men by men serious about finance, health, and stoicism. Start building your empire.",
    button: "visit site",
    status: "Website",
    state: "Live",
    industry: "Men's Health",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/MelinaPalacios3.jpg?updatedAt=1792865344016",
    alt: "Melina Palacios",
    link: "https://melinapalaciosstylist.netlify.app/",
    title: "Melina Palacios",
    description:
      "A stylist in CDMX specializing in hair care, offering personalized consultations to enhance natural beauty.",
    button: "visit site",
    status: "Website",
    state: "Live",
    industry: "Beauty",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/club4.jpg?updatedAt=1792865181213",
    alt: "WG Directory",
    link: "/project/WorkGambitApp/",
    title: "WG Directory",
    description:
      "A directory of job boards, companies, marketplaces and tools for people looking for work in the USA or Canada.",
    button: "visit site",
    status: "Project",
    state: "Live",
    industry: "Work",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/Daybook3.jpg?updatedAt=1792865214065",
    alt: "DayBook",
    link: "/project/Daybook/",
    title: "Daybook",
    description:
      "Todo app that lets you add to-dos per day and general notes for quick access. Also with a stat page to monitor your progress. ",
    button: "view project",
    status: "Project",
    state: "Portfolio",
    industry: "Management",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/Stocky4.jpg",
    alt: "STOCKY",
    link: "/project/Stocky/",
    title: "STOCKY",
    description:
      "Lets users save their stocks in different watchlists while being able to see latest news & chart info.",
    button: "view project",
    status: "Project",
    state: "Portfolio",
    industry: "Finance",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/WorldConquer7.jpg",
    alt: "World Conquer",
    link: "/project/WorldConquer/",
    title: "World Conquer",
    description:
      "A program where users can track their world conquering quest by tagging countries as visited, wishlist or excluded.",
    button: "view project",
    status: "Project",
    state: "Portfolio",
    industry: "Travel",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/ColorPalette3.jpg",
    alt: "Palette Studio",
    link: "/project/PaletteStudio/",
    title: "Palette Studio",
    description:
      "A program that helps users create and compare color palettes in a quick manner.",
    button: "view project",
    status: "Project",
    state: "Portfolio",
    industry: "Design",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/InvoiceBuilder2.jpg",
    alt: "Invoice Creator",
    link: "/project/InvoiceBuilder/",
    title: "Invoice Creator",
    description:
      "A program that allows users to create and customize professional invoices for their business needs.",
    button: "view project",
    status: "Project",
    state: "Portfolio",
    industry: "Business",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/DrumMachine3.jpg?updatedAt=1792865242227",
    alt: "Drum Machine",
    link: "/project/DrumMachine/",
    title: "Drum Machine",
    description:
      "A music production program that allows users to create drum patterns using a variety of sounds and effects.",
    button: "view project",
    status: "Project",
    state: "Portfolio",
    industry: "Music",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/EmailGenerator2.png?updatedAt=1792865270898",
    alt: "Email Generator",
    link: "/project/EmailGenerator/",
    title: "Email Generator",
    description:
      "Generate multiple professional email variations with a single click to reach business contacts .",
    button: "view project",
    status: "Project",
    state: "Portfolio",
    industry: "Business",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/EmailExtractor.png?updatedAt=1792865255175",
    alt: "Email Extractor",
    title: "Email Extractor",
    description:
      "A chrome extension to extract emails from multiple websites in one click and download as csv.",
    button: "pending",
    status: "Chrome Extension",
    state: "Offline",
    industry: "Business",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/like.jpg?updatedAt=1792865185468",
    alt: "ProductivPro",
    title: "ProductivPro",
    description:
      "A chrome extension that lets users block 5 specific URLs for a set time so they can focus on work.",
    button: "pending",
    status: "Chrome Extension",
    state: "Offline",
    industry: "Time Management",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/todolist.jpg?updatedAt=1792865230965",
    alt: "TodoList",
    title: "TodoList",
    description:
      "A chrome extension that lets users save a To-do List directly in their browser for quick access.",
    button: "pending",
    status: "Chrome Extension",
    state: "Offline",
    industry: "Productivity",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/Haiti4.jpg?updatedAt=1792865345824",
    alt: "Haiti Runner Game",
    link: "/project/HaitianRunner/",
    title: "The Haïtian Runner",
    description:
      "A 2D Haïti themed running game with objective of collecting coins and avoiding obstacles.",
    button: "view project",
    status: "Game",
    state: "Portfolio",
    industry: "Gaming",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/Mackandal.webp",
    alt: "Mackandal Studios",
    link: "/project/MackandalStudios/",
    title: "Mackandal Studios",
    description:
      "A creative studio specializing in concept art, storyboarding, and visual development for films, games, and animations.",
    button: "view gallery",
    status: "Art",
    state: "Portfolio",
    industry: "Art",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/TheCatalyst.webp",
    alt: "The Catalyst",
    link: "/project/TheCatalyst/",
    title: "The Catalyst",
    description:
      "AI generated movie concept scenes exploring Haïti in 2050 as an alien invasion takes place.",
    button: "view gallery",
    status: "Art",
    state: "Portfolio",
    industry: "Art",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/Frontend%20Design.png?updatedAt=1792865283536",
    alt: "Front-end",
    link: "/project/FrontEnd/",
    title: "Front-end Design",
    description:
      "Portfolio highlighting my creative vision, interactive layouts, and polished visual skills through engaging web heroes.",
    button: "view gallery",
    status: "Design",
    state: "Portfolio",
    industry: "Design",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/GraphicDesign2.png?updatedAt=1792865243416",
    alt: "Graphic Design",
    link: "/project/GraphicDesign/",
    title: "Graphic Design",
    description:
      "A collection of flyers and branding materials showcasing my ability to create visually compelling designs using Figma.",
    button: "view gallery",
    status: "Design",
    state: "Portfolio",
    industry: "Design",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/Screen%20Shot%202022-08-18%20at%202.26.29%20PM.png",
    alt: "Always Skilled",
    title: "Always Skilled",
    description:
      "Original Music produced by Always Skilled for quick access for listeners via the artist website.",
    button: "visit site",
    status: "Music",
    state: "Live",
    industry: "Music",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/TSSC%20-%20Youtube.png",
    alt: "CAPŸ",
    title: "CAPŸ",
    description:
      "Original Music by Capÿ for quick access for listeners  via the artist website.",
    button: "visit site",
    status: "Music",
    state: "Live",
    industry: "Music",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/HidroFlora.jpg?updatedAt=1792865307989",
    alt: "Hydro Flora",
    title: "Hydro Flora",
    description:
      "A music composition contracted for an ad to match the Hydro Flora brand. Produced using Ableton Live.",
    button: "view video",
    status: "Music",
    state: "Portfolio",
    industry: "Hydroponics",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/Terastack3.jpg",
    alt: "Terastacks",
    title: "Terastacks",
    description:
      "A blockchain infrastructure that allowed users to buy, sell and transfer a digital currency called Teracode.",
    button: "pending",
    status: "Offline",
    state: "Portfolio",
    industry: "Finance",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/TerastacksApp.png?updatedAt=1792865276682",
    alt: "Terastacks App",
    title: "Terastacks App",
    description:
      "A SAAS facilitating fund transfers from Credit Cards to online payment accounts such as PayPal, Stripe, Cash App & more.",
    button: "pending",
    status: "Offline",
    state: "Portfolio",
    industry: "Finance",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/Diggit3.jpg?updatedAt=1792865261588",
    alt: "Diggit",
    title: "Diggit",
    description:
      "A microblogging website where users can post, repost, comment, like text posts and follow users and tags.",
    button: "pending",
    status: "Offline",
    state: "Portfolio",
    industry: "Social Media",
  },
  {
    imageSrc:
      "https://ik.imagekit.io/sebastienaugustin/images/projects/Sebastien%20Portfolio/Portfolio/13_Sunset.JPG",
    alt: "Xaragua Hotel",
    title: "Xaragua Hotel",
    description:
      "Web Development & Design for a 50 room hotel located in the beautiful coast of Haïti.",
    button: "pending",
    status: "Offline",
    state: "Portfolio",
    industry: "Hospitality",
  },
];
