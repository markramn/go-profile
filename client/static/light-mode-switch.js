const toggle = document.getElementById('mode-toggle');
const body = document.body;

// Function to set the mode
function setMode(isDark) {
    if (isDark) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        toggle.checked = true;
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        toggle.checked = false;
    }
}

// Initialize to dark mode
setMode(true);

// Event listener for toggle changes
toggle.addEventListener('change', function () {
    setMode(this.checked);
});

// Save user preference to localStorage
toggle.addEventListener('change', function () {
    localStorage.setItem('darkMode', this.checked);
});

// Load user preference from localStorage on page load
document.addEventListener('DOMContentLoaded', (event) => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
        setMode(savedMode === 'true');
    }
});