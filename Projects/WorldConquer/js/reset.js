function resetUserData() {
    localStorage.removeItem('worldMapUserData');
    location.reload();
    console.log("User data has been reset");
}

document.getElementById('resetBTN').addEventListener('click', function(event) {
    event.preventDefault();
    // Ask for confirmation before resetting
    if (confirm("Are you sure you want to reset all your data? This action cannot be undone.")) {
        resetUserData();
    }
});