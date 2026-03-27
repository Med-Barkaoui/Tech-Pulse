document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 2. Active Link Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // 3. Contact Form Validation (runs only on contact.html)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Reset errors
            document.querySelectorAll('.form-error').forEach(err => err.style.display = 'none');
            
            if (!name.value.trim()) {
                document.getElementById('nameError').style.display = 'block';
                isValid = false;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            }
            
            if (!message.value.trim()) {
                document.getElementById('messageError').style.display = 'block';
                isValid = false;
            }
            
            if (isValid) {
                // Mock form submission
                const btn = contactForm.querySelector('button[type="submit"]');
                const originalText = btn.textContent;
                btn.textContent = 'Sending...';
                btn.disabled = true;
                
                setTimeout(() => {
                    document.getElementById('formSuccess').style.display = 'block';
                    contactForm.reset();
                    btn.textContent = originalText;
                    btn.disabled = false;
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        document.getElementById('formSuccess').style.display = 'none';
                    }, 5000);
                }, 1500);
            }
        });
    }

    // 4. Articles Filtering & Pagination (runs only on articles.html)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const articleCards = Array.from(document.querySelectorAll('.article-card-wrapper'));
    const paginationContainer = document.getElementById('pagination');
    
    if (articleCards.length > 0) {
        const itemsPerPage = 3;
        let currentPage = 1;
        let currentFilter = 'all';
        let filteredArticles = [...articleCards];

        const updateDisplay = () => {
            // Calculate slice
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            
            // Hide all first
            articleCards.forEach(card => card.style.display = 'none');
            
            // Show only relevant slice
            const pageArticles = filteredArticles.slice(startIndex, endIndex);
            pageArticles.forEach(card => card.style.display = 'block');
            
            updatePaginationUI();
        };

        const updatePaginationUI = () => {
            if (!paginationContainer) return;

            const pageNumbersContainer = document.getElementById('pageNumbers');
            const prevBtn = document.getElementById('prevPage');
            const nextBtn = document.getElementById('nextPage');
            
            const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
            
            // If only 1 page, we could hide pagination, but let's keep it for UI consistency or just disable buttons
            if (totalPages <= 1) {
                paginationContainer.style.display = 'none';
                return;
            } else {
                paginationContainer.style.display = 'flex';
            }

            // Clear and render page numbers
            pageNumbersContainer.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement('button');
                btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
                btn.textContent = i;
                btn.addEventListener('click', () => {
                    currentPage = i;
                    updateDisplay();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
                pageNumbersContainer.appendChild(btn);
            }

            // Update Prev/Next states
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === totalPages;
        };

        // Event Listeners for Prev/Next
        if (paginationContainer) {
            document.getElementById('prevPage').addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    updateDisplay();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });

            document.getElementById('nextPage').addEventListener('click', () => {
                const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    updateDisplay();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }

        // Filter Logic
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                currentFilter = btn.getAttribute('data-filter');
                currentPage = 1; // Reset to page 1 on filter change
                
                if (currentFilter === 'all') {
                    filteredArticles = [...articleCards];
                } else {
                    filteredArticles = articleCards.filter(card => 
                        card.getAttribute('data-category') === currentFilter
                    );
                }
                
                updateDisplay();
            });
        });

        // Initialize display
        updateDisplay();
    }
});
