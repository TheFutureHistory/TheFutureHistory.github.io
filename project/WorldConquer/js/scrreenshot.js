function captureScreenshot() {
    // Hide elements
    const stickyMenuBottom = document.querySelector('.stickyMenuBottom');
    const closeMenuBTN = document.getElementById('closeMenuBTN');
    const map = document.getElementById("map");

    stickyMenuBottom.style.display = 'none';
    closeMenuBTN.style.display = 'none';

    const stats = document.getElementsByClassName("stats");
    for (let i = 0; i < stats.length; i++) {
        stats[i].style.display = "none";
    }

    // Wait briefly before capturing
    setTimeout(() => {
        whiteText();

        html2canvas(document.querySelector('.dashboard')).then(function (canvas) {
            const link = document.createElement('a');
            const name = document.getElementById('nameInput').value;
            const date = new Date().toISOString().slice(0, 10);
            link.download = name
                ? `${name} - World Conquer Map - ${date}.png`
                : `screenshot_${date}.png`;
            link.href = canvas.toDataURL();
            link.click();

            // Restore elements
            stickyMenuBottom.style.display = 'flex';
            closeMenuBTN.style.display = 'block';
            for (let i = 0; i < stats.length; i++) {
                stats[i].style.display = "block";
            }
        });
    }, 100); // small delay (100ms)
}
