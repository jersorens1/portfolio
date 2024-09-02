// HAMBURGER ELEMENT FOR SMALL SCREENS
const toggleBtn = document.querySelector('.toggle-btn');
const dropDownMenu = document.querySelector('.dropdown-menu');

toggleBtn.addEventListener('click', () => {
    dropDownMenu.classList.toggle('open');
    toggleBtn.classList.toggle('open');
});

// FOOTER INFO
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentYearElement = document.getElementById('currentyear');
currentYearElement.textContent = currentYear;

