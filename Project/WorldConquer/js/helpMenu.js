const overlay = document.getElementById('overlay');
const helpButton = document.getElementById('helpBTN');
const helpSection = document.querySelector('.helpSection');
const closeHelp = document.getElementById('closeHelp');
const detailsButton = document.getElementById('detailsBTN')
const detailsSection = document.getElementById("detailsSection")
const closeDetails = document.getElementById('closeDetails');

function whiteText(){
    ['ctWishlist', 'countriesWishlist'].forEach(id => document.getElementById(id)?.style.setProperty('color', 'white'));
    ['ctVisited', 'CountriesVisited'].forEach(id => document.getElementById(id)?.style.setProperty('color', 'white'));
    ['ctOut', 'CountriesOut'].forEach(id => document.getElementById(id)?.style.setProperty('color', 'white'));
}

// Help
helpButton.addEventListener('click', () => {
    helpSection.style.display = 'flex';
    overlay.style.display = 'block';
    whiteText()
});
closeHelp.addEventListener('click', () => {
    helpSection.style.display = 'none';
    overlay.style.display = 'none';
    whiteText()
});

// Details
detailsButton.addEventListener('click', () => {
    detailsSection.style.display = 'flex';
    overlay.style.display = 'block';
    whiteText()
});

closeDetails.addEventListener('click', () => {
    detailsSection.style.display = 'none';
    overlay.style.display = 'none';
    whiteText()
});

function updateLists(){
    // wishlist
    const wishlistDetails = document.getElementById('wishlistDetails');
    let countryWishlist = document.getElementById('wishlistUl');
    if (!countryWishlist) {
        countryWishlist = document.createElement('ul');
        countryWishlist.id = 'wishlistUl';
        wishlistDetails.appendChild(countryWishlist);
    } else {
        countryWishlist.innerHTML = '';
    }
    userData.countriesWishlist.forEach(country => {
        const listItem = document.createElement('li');
        listItem.textContent = country;
        countryWishlist.appendChild(listItem);
    });

    // visited
    const visitedDetails = document.getElementById('VisitedDetails');
    let countryVisited = document.getElementById('visitedUl');
    if (!countryVisited) {
        countryVisited = document.createElement('ul');
        countryVisited.id = 'visitedUl';
        visitedDetails.appendChild(countryVisited);
    } else {
        countryVisited.innerHTML = '';
    }
    userData.countriesVisited.forEach(country => {
        const listItem = document.createElement('li');
        listItem.textContent = country;
        countryVisited.appendChild(listItem);
    });

    // rejected
    const rejectedDetails = document.getElementById('rejectedDetails');
    let countryRejected = document.getElementById('rejectedUl');

    // If the ul doesn't exist, create it
    if (!countryRejected) {
        countryRejected = document.createElement('ul');
        countryRejected.id = 'rejectedUl';
        rejectedDetails.appendChild(countryRejected);
    } else {
        // Clear existing list items
        countryRejected.innerHTML = '';
    }

    // Add new list items
    userData.countriesRuledOut.forEach(country => {
        const listItem = document.createElement('li');
        listItem.textContent = country;
        countryRejected.appendChild(listItem);
    });
}

updateLists()