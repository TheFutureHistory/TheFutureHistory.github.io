console.log("show country")

// Select all the country paths
const countries = document.querySelectorAll('#map path');

// Create a tooltip element
const tooltip = document.createElement('div');
tooltip.style.position = 'absolute';
tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
tooltip.style.color = 'white';
tooltip.style.padding = '5px';
tooltip.style.borderRadius = '5px';
tooltip.style.pointerEvents = 'none'; // Prevent the tooltip from interfering with mouse events
tooltip.style.visibility = 'hidden'; // Initially hidden
document.body.appendChild(tooltip);

// Add mouseover, mousemove, and mouseout event listeners
countries.forEach(country => {
    const originalColor = country.getAttribute('fill'); // Store the original color

    country.addEventListener('mouseover', (event) => {
        const countryName = country.getAttribute('name') || country.getAttribute('title') || country.getAttribute('class'); // Get country name
        tooltip.textContent = countryName; // Set tooltip text
        tooltip.style.visibility = 'visible';
        tooltip.style.left = `${event.pageX + 10}px`; // Position the tooltip
        tooltip.style.top = `${event.pageY + 10}px`;

        country.setAttribute('fill', '#FFFFFF'); // Change country color on hover
    });

    country.addEventListener('mousemove', (event) => {
        tooltip.style.left = `${event.pageX + 10}px`; // Update tooltip position
        tooltip.style.top = `${event.pageY + 10}px`;
    });

    country.addEventListener('mouseout', () => {
        tooltip.style.visibility = 'hidden'; // Hide the tooltip
        country.setAttribute('fill', originalColor); // Reset country color
    });
});

