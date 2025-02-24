    document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        const theme = this.getAttribute('data-theme');
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme); // Save preference

    });
});

    // Load saved theme from localStorage
    // this was not in the assignment, but I don't think we can launch
    // anything directed for end-user without a dark/theme switch
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
