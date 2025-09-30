// Function to handle the mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    // Toggle the mobile menu state
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Change icon when active
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close the menu when a link is clicked (for smooth scrolling)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });
});

// Optional: Subtle header color change on scroll (to add flair)
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 15px -10px rgba(100, 255, 218, 0.2)';
    } else {
        navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.7)';
    }
});