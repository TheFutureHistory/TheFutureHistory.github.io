document.addEventListener('DOMContentLoaded', () => {
    const closeMenuBTN = document.getElementById('closeMenuBTN');
    const menuTitle = document.querySelector('.menuTitle');
    const nameInputContainer = document.querySelector('.nameInputContainer');
    const statsContainer = document.querySelector('.statsContainer');
    const stickyMenuBottom = document.querySelector('.stickyMenuBottom');

    closeMenuBTN.addEventListener('click', () => {
        nameInputContainer.style.display = 'none';
        statsContainer.style.display = 'none';
        stickyMenuBottom.style.display = 'none';
    });

    menuTitle.addEventListener('click', () => {
        nameInputContainer.style.display = 'flex';
        statsContainer.style.display = 'flex';
        stickyMenuBottom.style.display = 'flex';
    });
});
