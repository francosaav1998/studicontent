// ==========================================
// Scroll Header Effect
// ==========================================
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ==========================================
// Scroll Reveal Observer
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ==========================================
// Smooth Scroll (only for non-popup links)
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Skip if its target is #comprar (handled by popup)
        if (this.getAttribute('href') === '#comprar') return;
        // Skip modal-close or other UI buttons
        if (this.closest('#purchase-modal')) return;

        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==========================================
// Shopify checkout URL
// ==========================================
const SHOPIFY_URL = 'https://studiocontent-2.myshopify.com/checkouts/cn/hWNBkks9FLQfvspWNMtIeaUk/es-cl';

// ==========================================
// Purchase Popup Modal
// ==========================================
const modal = document.getElementById('purchase-modal');
const modalClose = document.getElementById('modal-close');
const modalAddToCart = document.getElementById('modal-add-to-cart');

// Open modal
function openPopup() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Meta Pixel: AddToCart event
    if (typeof fbq !== 'undefined') {
        fbq('track', 'AddToCart', {
            content_name: 'AI Content Generation Workflow',
            content_category: 'Digital Product',
            value: 12.99,
            currency: 'USD'
        });
    }
}

// Close modal
function closePopup() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close button
modalClose.addEventListener('click', closePopup);

// Click outside modal to close
modal.addEventListener('click', function (e) {
    if (e.target === modal) closePopup();
});

// ESC key to close
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closePopup();
    }
});

// "Ir al pago" button — just navigates to Shopify
modalAddToCart.addEventListener('click', function (e) {
    // AddToCart already fired when popup opened
    // Let the link navigate naturally
});

// ==========================================
// Intercept ALL "Comprar" buttons → open popup
// ==========================================
document.addEventListener('click', function (e) {
    // Click on any link that goes to Shopify checkout
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href') || '';

    // Match: #comprar links (hero, section CTAs, etc.)
    // OR direct Shopify checkout links (nav, pricing card)
    if (href === '#comprar' || href.includes('myshopify.com')) {
        // Don't intercept the modal's own button
        if (link.closest('#purchase-modal')) return;

        e.preventDefault();
        openPopup();
    }
});

// ==========================================
// Initial state: make sure modal is hidden
// ==========================================
modal.classList.remove('active');
