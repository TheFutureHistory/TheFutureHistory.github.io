document.addEventListener("DOMContentLoaded", () => {
  let favoritesFilterActive = false;
  let searchMode = false; // Track if we're in search mode

  function normalize(str) {
    return str.trim().toLowerCase().replace(/\s+/g, '');
  }

  function updateFavoritesButtonText() {
    const favoritesBtn = document.getElementById('filterBTNFav');
    if (favoritesBtn && window.favoritesManager) {
      const favCount = window.favoritesManager.getFavoriteCount();
      
      if (favoritesFilterActive) {
        // In search mode: "Show All Search Results" vs "Show All"
        favoritesBtn.textContent = searchMode ? 'Show Search' : 'Show All';
      } else {
        favoritesBtn.textContent = `${favCount} Favorites`;
      }
    }
  }

  function updateResultsCount() {
    const listingInfos = document.querySelectorAll('.listingInfo');
    const totalResults = listingInfos.length;
    let displayedResults = 0;

    listingInfos.forEach(listingInfo => {
      if (!listingInfo.classList.contains('hiddenListing')) {
        displayedResults++;
      }
    });

    const resultsTag = document.getElementById('resultsAmt');
    if (resultsTag) {
      resultsTag.textContent = `${displayedResults}/${totalResults}`;
    }

    // Update "Open Tabs" button
    const openTabsBtn = document.getElementById('openTabs');
    if (openTabsBtn) {
      if (displayedResults > 0) {
        openTabsBtn.textContent = `Open ${displayedResults} Tabs`;
        openTabsBtn.style.display = 'inline-block';
      } else {
        openTabsBtn.style.display = 'none';
      }
    }
  }

  function applyAllFilters() {
    const listingInfos = document.querySelectorAll('.listingInfo');
    const searchInput = document.getElementById('searchInput');
    const checkboxes = document.querySelectorAll('.filterInput');
    const searchQuery = searchInput ? searchInput.value.trim().toLowerCase() : '';

    // Update search mode status
    searchMode = searchQuery.length > 0;

    // Get the base set of items to work with
    let baseItems = [];
    
    listingInfos.forEach(listingInfo => {
      let includeInBase = true;

      // STEP 1: Apply search filter to determine base set
      if (searchMode) {
        const name = listingInfo.querySelector('.listingInfo_name').textContent.toLowerCase();
        if (!name.startsWith(searchQuery)) {
          includeInBase = false;
        }
      }

      // Add to base set if it passed search filter (or no search active)
      if (includeInBase) {
        baseItems.push(listingInfo);
      } else {
        // Hide items that don't match search
        listingInfo.classList.add('hiddenListing');
      }
    });

    // STEP 2: Apply favorites and checkbox filters to the base set
    baseItems.forEach(listingInfo => {
      let showListing = true;

      // Apply favorites filter
      if (favoritesFilterActive) {
        const listingId = listingInfo.dataset.listingId;
        const isFavorited = window.favoritesManager && window.favoritesManager.isFavorited(listingId);
        if (!isFavorited) {
          showListing = false;
        }
      }

      // Apply checkbox filters (only if favorites didn't filter it out)
      if (showListing) {
        checkboxes.forEach(check => {
          if (check.checked) {
            const filterClass = normalize(check.id) + 'Listing';

            if (check.id === 'other') {
              // "Other" means it should NOT match tech, finance, or gig
              const isOther =
                !listingInfo.classList.contains('techListing') &&
                !listingInfo.classList.contains('financeListing') &&
                !listingInfo.classList.contains('gigListing');
              if (!isOther) showListing = false;
            } else {
              // Normal filters
              if (!listingInfo.classList.contains(filterClass)) {
                showListing = false;
              }
            }
          }
        });
      }

      // Show or hide the listing
      if (showListing) {
        listingInfo.classList.remove('hiddenListing');
      } else {
        listingInfo.classList.add('hiddenListing');
      }
    });

    // Update UI
    updateResultsCount();
    updateFavoritesButtonText();
  }

  function setupUnifiedFiltering() {
    const searchInput = document.getElementById('searchInput');
    const favoritesBtn = document.getElementById('filterBTNFav');
    const checkboxes = document.querySelectorAll('.filterInput');

    // Search input handler
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        // Clear favorites filter when starting a new search
        if (searchInput.value.trim().length > 0 && favoritesFilterActive) {
          favoritesFilterActive = false;
          if (favoritesBtn) {
            favoritesBtn.classList.remove('active');
          }
        }
        
        applyAllFilters();
      });
    }

    // Favorites button handler
    if (favoritesBtn) {
      favoritesBtn.addEventListener('click', () => {
        favoritesFilterActive = !favoritesFilterActive;
        
        // Update button appearance
        if (favoritesFilterActive) {
          favoritesBtn.classList.add('active');
        } else {
          favoritesBtn.classList.remove('active');
        }

        applyAllFilters();
      });
    }

    // Checkbox filters
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', applyAllFilters);
    });

    // Initial setup
    applyAllFilters();
  }

  // Listen for favorites changes to update everything
  document.addEventListener('click', (e) => {
    if (e.target.closest('.favorite-btn')) {
      setTimeout(() => {
        applyAllFilters();
      }, 50);
    }
  });

  // Initialize the unified filtering system
  setupUnifiedFiltering();
});