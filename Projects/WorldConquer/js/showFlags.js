function fillCountryWithFlag(country) {
    const countryName = country.getAttribute('name') || country.getAttribute('title') || country.getAttribute('class');
    
    // Convert country name to two-letter code
    const countryCode = getCountryCode(countryName);
    
    if (countryCode) {
        const flagUrl = `WorldConquer/images/flags/${countryCode.toLowerCase()}.svg`;
        
        // Create a pattern element
        const patternId = `flag-${countryCode}`;
        let pattern = document.getElementById(patternId);

        // Create pattern if it doesn't exist
        if (!pattern) {
            pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
            pattern.setAttribute("id", patternId);
            pattern.setAttribute("patternUnits", "objectBoundingBox");
            pattern.setAttribute("width", "100%");
            pattern.setAttribute("height", "100%");

            // Create an image element
            const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
            image.setAttribute("href", flagUrl);
            image.setAttribute("width", "100%");
            image.setAttribute("height", "100%");
            image.setAttribute("preserveAspectRatio", "xMidYMid slice");

            // Append image to pattern
            pattern.appendChild(image);

            // Add pattern to SVG defs
            const defs = document.querySelector("svg defs") || document.querySelector("svg").insertBefore(document.createElementNS("http://www.w3.org/2000/svg", "defs"), document.querySelector("svg").firstChild);
            defs.appendChild(pattern);
        }

        // Set the fill of the country to use the pattern
        country.style.fill = `url(#${patternId})`;
    }
}

function clearCountryFill(country) {
    country.style.fill = ''; // Reset to original color
}

function getCountryCode(countryName) {
    // This is a simplified example. You'd need a more comprehensive mapping.
    const countryMap = {
        'Mexico': 'MX',
        'United States': 'US',
        'Canada': 'CA',
        // Add more countries as needed
    };
    
    return countryMap[countryName] || null;
}

// Usage
document.querySelectorAll('path').forEach(country => {
    country.addEventListener('mouseenter', () => fillCountryWithFlag(country));
    country.addEventListener('mouseleave', () => clearCountryFill(country));
});