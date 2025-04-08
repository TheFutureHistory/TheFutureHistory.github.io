function fillCountryWithFlag(country) {
    const countryName = country.getAttribute('name') || country.getAttribute('title') || country.getAttribute('class');
    
    // Convert country name to two-letter code
    const countryCode = getCountryCode(countryName);
    
    if (countryCode) {
        const flagUrl = `WorldConquer/images/flags/${countryCode.toLowerCase()}.svg`;
        
        // Declare patternId before accessing it
        const patternId = `flag-${countryCode}`;
        
        // Try to find the pattern already created
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

            // Add pattern to SVG defs if not present
            const defs = document.querySelector("svg defs") || document.querySelector("svg").insertBefore(document.createElementNS("http://www.w3.org/2000/svg", "defs"), document.querySelector("svg").firstChild);
            defs.appendChild(pattern);
        }

        // Set the fill of the country to use the pattern
        country.style.fill = `url(#${patternId})`;
    }
}

// Example function to add the flag to all countries (like SVG path elements)
function addFlagsToCountries() {
    const countries = document.querySelectorAll('svg path');  // Change this to target the country elements (like paths in the SVG)
    countries.forEach(country => {
        fillCountryWithFlag(country);
    });
}
