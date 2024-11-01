const totalCountries = 169;
let userData = {
    countriesWishlist: [],
    countriesVisited: [],
    countriesRuledOut: [],
    countriesExplored: 0,
    countryColors: {},
};

// STEP 7


// STEP 5
function saveUserData() {
    console.log("saving user data");
    localStorage.setItem('worldMapUserData', JSON.stringify(userData));
}

// STEP 6
function loadUserData() {
    console.log("loading user data");
    const savedData = localStorage.getItem('worldMapUserData');

    if (savedData) {
        userData = JSON.parse(savedData);
        
        // Initialize arrays if they don't exist in the saved data
        userData.countriesWishlist = userData.countriesWishlist || [];
        userData.countriesVisited = userData.countriesVisited || [];
        userData.countriesRuledOut = userData.countriesRuledOut || [];
        userData.countryColors = userData.countryColors || {};

        // Restore the country colors
        for (const countryName in userData.countryColors) {
            const countryElements = document.querySelectorAll(`.${countryName}`);
            countryElements.forEach(element => {
                if (element) {
                    element.style.fill = userData.countryColors[countryName];
                } else {
                    console.warn(`Country element not found for: ${countryName}`);
                }
            });
        }

        // Update colors based on the arrays
        updateCountryColors();
        updateStats();
    } else {
        // Initialize userData with empty arrays if no saved data
        userData = {
            countriesWishlist: [],
            countriesVisited: [],
            countriesRuledOut: [],
            countryColors: {}
        };
    }
}

// STEP 4
function updateStats() {
    document.getElementById('countriesWishlist').innerHTML = `${userData.countriesWishlist.length}`;
    document.querySelectorAll('.countriesAmt')[0].value = (userData.countriesWishlist.length / totalCountries) * 100;

    document.getElementById('CountriesVisited').innerHTML = `${userData.countriesVisited.length}`;
    document.querySelectorAll('.countriesAmt')[1].value = (userData.countriesVisited.length / totalCountries) * 100;

    document.getElementById('CountriesOut').innerHTML = `${userData.countriesRuledOut.length}`;
    document.querySelectorAll('.countriesAmt')[2].value = (userData.countriesRuledOut.length / totalCountries) * 100;

    const exploredCountries = Math.floor((userData.countriesVisited.length * 100) / 169);


    document.getElementById('CountriesExplored').innerHTML = `${exploredCountries}%`;
    document.querySelectorAll('.countriesAmt')[3].value = (userData.countriesExplored / totalCountries) * 100;
}

// STEP 2
function handleCountryClick(country) {
    const countryName = country.getAttribute('name') || country.getAttribute('title') || country.getAttribute('class');

    // Determine the current state of the country
    if (userData.countriesWishlist.includes(countryName)) {
        // If clicked twice, move to visited
        userData.countriesWishlist = userData.countriesWishlist.filter(c => c !== countryName);
        userData.countriesVisited.push(countryName);
        ['ctWishlist', 'countriesWishlist'].forEach(id => document.getElementById(id)?.style.setProperty('color', 'white'));
        ['ctVisited', 'CountriesVisited'].forEach(id => document.getElementById(id)?.style.setProperty('color', '#4bdc73'));
        ['ctOut', 'CountriesOut'].forEach(id => document.getElementById(id)?.style.setProperty('color', 'white'));
    } else if (userData.countriesVisited.includes(countryName)) {
        // If clicked thrice, move to ruled out
        userData.countriesVisited = userData.countriesVisited.filter(c => c !== countryName);
        userData.countriesRuledOut.push(countryName);
        ['ctWishlist', 'countriesWishlist'].forEach(id => document.getElementById(id)?.style.setProperty('color', 'white'));
        ['ctVisited', 'CountriesVisited'].forEach(id => document.getElementById(id)?.style.setProperty('color', 'white'));
        ['ctOut', 'CountriesOut'].forEach(id => document.getElementById(id)?.style.setProperty('color', '#ff5e62'));
    } else if (userData.countriesRuledOut.includes(countryName)) {
        userData.countriesRuledOut = userData.countriesRuledOut.filter(c => c !== countryName);
        ['ctWishlist', 'countriesWishlist'].forEach(id => document.getElementById(id)?.style.setProperty('color', 'white'));
        ['ctVisited', 'CountriesVisited'].forEach(id => document.getElementById(id)?.style.setProperty('color', 'white'));
        ['ctOut', 'CountriesOut'].forEach(id => document.getElementById(id)?.style.setProperty('color', 'white'));
        // If clicked four times, do nothing (or reset)
    } else {
        // If clicked once, add to wishlist
        userData.countriesWishlist.push(countryName);
        ['ctWishlist', 'countriesWishlist'].forEach(id => document.getElementById(id)?.style.setProperty('color', '#1679df'));
        ['ctVisited', 'CountriesVisited'].forEach(id => document.getElementById(id)?.style.setProperty('color', 'white'));
        ['ctOut', 'CountriesOut'].forEach(id => document.getElementById(id)?.style.setProperty('color', 'white'));
    }

    // Update colors for all countries
    updateCountryColors();
    updateStats()
    saveUserData()
    updateLists()
}

// STEP 3
function updateCountryColors() {
    // Reset all countries to default color
    document.querySelectorAll('path').forEach(country => {
        country.style.fill = '';
    });

    // Color wishlist countries
    userData.countriesWishlist.forEach(countryName => {
        const escapedCountryName = CSS.escape(countryName);
        const country = document.querySelector(`[name="${escapedCountryName}"], .${escapedCountryName}, [title="${escapedCountryName}"], [class="${escapedCountryName}"], [id="${escapedCountryName}"]`);
        if (country) country.style.fill = '#1679df';
        const allPaths = document.querySelectorAll(`[class="${escapedCountryName}"]`);
        allPaths.forEach(path => {
            path.style.fill = '#1679df';
        });
    });

    // Color visited countries
    userData.countriesVisited.forEach(countryName => {
        const country = document.querySelector(`[name="${countryName}"], [title="${countryName}"], [class="${countryName}"], [id="${countryName}"]`);
        if (country) country.style.fill = '#4bdc73';
        const allPaths = document.querySelectorAll(`[class="${countryName}"]`);
        allPaths.forEach(path => {
            path.style.fill = '#4bdc73';
        });
    });

    // Color ruled out countries
    userData.countriesRuledOut.forEach(countryName => {
        const country = document.querySelector(`[name="${countryName}"], [title="${countryName}"], [class="${countryName}"], [id="${countryName}"]`);
        if (country) country.style.fill = '#ff5e62';
        const allPaths = document.querySelectorAll(`[class="${countryName}"]`);
        allPaths.forEach(path => {
            path.style.fill = '#ff5e62';
        });
    });
}

// STEP 1
countries.forEach(country => {
    country.addEventListener('click', () => {
        handleCountryClick(country);
    });
});

loadUserData();






