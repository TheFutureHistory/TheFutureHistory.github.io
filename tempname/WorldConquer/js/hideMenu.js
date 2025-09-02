document.addEventListener('DOMContentLoaded', () => {
    const closeIcon = document.querySelector('.fa-close');
    const menuTitle = document.querySelector('.menuTitle');
    const nameInputContainer = document.querySelector('.nameInputContainer');
    const statsContainer = document.querySelector('.statsContainer');
    const stickyMenuBottom = document.querySelector('.stickyMenuBottom');
    const closeBtn = document.querySelector('.fa-close')

    closeIcon.addEventListener('click', () => {
        nameInputContainer.style.display = 'none';
        statsContainer.style.display = 'none';
        stickyMenuBottom.style.display = 'none';
        closeBtn.style.display = 'none';
    });

    menuTitle.addEventListener('click', () => {
        nameInputContainer.style.display = 'block';
        statsContainer.style.display = 'block';
        stickyMenuBottom.style.display = 'block';
        closeBtn.style.display = 'block';
    });
});
