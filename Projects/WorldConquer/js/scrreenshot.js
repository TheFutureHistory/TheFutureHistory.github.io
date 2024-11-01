function captureScreenshot() {
    const stats = document.getElementsByClassName("stats")
    for (let i = 0; i < stats.length; i++) {
        stats[i].style.display = "none";
    }

    whiteText()
    html2canvas(document.querySelector('.dashboard')).then(function (canvas) {
        // Create a temporary link element
        var link = document.createElement('a');
        var name = document.getElementById('nameInput').value
        var date = new Date().toISOString().slice(0, 10);
        if (name === "") {
            link.download = 'screenshot_' + date + '.png';
        } else {
            link.download = name + ' - World Conquer Map - ' + date + '.png';
        }
        link.href = canvas.toDataURL();

        // Trigger the download
        link.click();
    });
    for (let i = 0; i < stats.length; i++) {
        stats[i].style.display = "block";
    }
}