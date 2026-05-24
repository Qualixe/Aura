/**
 * 1. DATA (Products)
 */
const products = [
    { id: 1, name: "Organic Cotton Ribbed Onesie", price: 35.00, category: "Clothing", rating: 5, image: "./assets/clothing.jpg", featured: true, bestSeller: true, inStock: true, desc: "Ethically made from 100% organic cotton, incredibly soft against delicate newborn skin." },
    { id: 2, name: "Cashmere Heirloom Blanket", price: 120.00, category: "Nursery", rating: 5, image: "./assets/Nursing.jpg", featured: true, bestSeller: false, inStock: true, desc: "A luxurious cashmere blend blanket, perfect for the crib or stroller." },
    { id: 3, name: "Montessori Wooden Stacking Rings", price: 28.00, category: "Toys", rating: 4.8, image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800", featured: false, bestSeller: true, inStock: true, desc: "Sustainable beechwood toy painted with non-toxic, water-based dyes." },
    { id: 4, name: "Lavender Oat Baby Wash", price: 22.00, category: "Bath", rating: 4.9, image: "https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&q=80&w=800", featured: true, bestSeller: true, inStock: true, desc: "Tear-free, plant-based formula with calming lavender and colloidal oatmeal." },
    { id: 5, name: "Knitted Vintage Romper", price: 45.00, category: "Clothing", rating: 4.7, image: "./assets/clothing.jpg", featured: false, bestSeller: false, inStock: true, desc: "A timeless knit romper featuring wooden buttons and a relaxed fit." },
    { id: 6, name: "Silicone Cloud Night Light", price: 32.00, category: "Nursery", rating: 4.6, image: "./assets/Nursing.jpg", featured: false, bestSeller: true, inStock: true, desc: "Dimmable, squishy silicone night light providing a warm, comforting glow." },
    { id: 7, name: "Plush Linen Bunny", price: 25.00, category: "Toys", rating: 4.9, image: "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&q=80&w=800", featured: true, bestSeller: false, inStock: true, desc: "Hand-stitched linen bunny designed to be a lifelong companion." },
    { id: 8, name: "Bamboo Hooded Towel Set", price: 38.00, category: "Bath", rating: 5, image: "https://images.unsplash.com/photo-1519239463718-9788075ccd8d?auto=format&fit=crop&q=80&w=800", featured: false, bestSeller: true, inStock: true, desc: "Ultra-absorbent bamboo terry cloth that gets softer with every wash." },
    { id: 9, name: "Artisan Rattan Bassinet", price: 250.00, category: "Nursery", rating: 5, image: "https://images.unsplash.com/photo-1596200235071-8798e945c48b?auto=format&fit=crop&q=80&w=800", featured: true, bestSeller: false, inStock: true, desc: "Handcrafted rattan bassinet bringing a bohemian elegance to the nursery." },
    { id: 10, name: "Organic Muslin Swaddle Set", price: 42.00, category: "Nursery", rating: 4.8, image: "https://images.unsplash.com/photo-1505305976870-c0be144167e4?auto=format&fit=crop&q=80&w=800", featured: false, bestSeller: true, inStock: true, desc: "Breathable, lightweight muslin cloths in earthy, muted tones." },
    { id: 11, name: "Wooden Activity Walker", price: 85.00, category: "Toys", rating: 4.7, image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=800", featured: true, bestSeller: false, inStock: false, desc: "Sturdy wooden walker with interactive elements to aid first steps." },
    { id: 12, name: "Silk Lined Booties", price: 30.00, category: "Clothing", rating: 4.9, image: "https://images.unsplash.com/photo-1512411512803-10815180f17b?auto=format&fit=crop&q=80&w=800", featured: false, bestSeller: false, inStock: true, desc: "Keeps tiny toes warm with a luxurious silk lining to prevent friction." }
];

/**
 * 2. STATE
 */
let state = {
    cart: JSON.parse(localStorage.getItem('luxuryBabyCart')) || [],
    wishlist: JSON.parse(localStorage.getItem('luxuryBabyWishlist')) || [],
    theme: localStorage.getItem('theme') || 'light'
};

/**
 * 3. CORE UTILITIES
 */
const formatPrice = (price) => `$${price.toFixed(2)}`;

const saveState = () => {
    localStorage.setItem('luxuryBabyCart', JSON.stringify(state.cart));
    localStorage.setItem('luxuryBabyWishlist', JSON.stringify(state.wishlist));
    updateBadges();
};

const showToast = (message, icon = 'fa-check-circle') => {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);
    void toast.offsetWidth;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

const updateBadges = () => {
    const cartTotal = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById('cartCount');
    const wishlistCountEl = document.getElementById('wishlistCount');
    if (cartCountEl) cartCountEl.textContent = cartTotal;
    if (wishlistCountEl) wishlistCountEl.textContent = state.wishlist.length;
    
    const bnavCart = document.getElementById('bnavCartCount');
    const bnavWishlist = document.getElementById('bnavWishlistCount');
    if (bnavCart) bnavCart.textContent = cartTotal;
    if (bnavWishlist) bnavWishlist.textContent = state.wishlist.length;
};

/**
 * 4. UI COMPONENTS
 */
const generateProductCard = (product) => `
    <div class="product-card reveal" data-id="${product.id}">
        <div class="product-badges">
            ${product.bestSeller ? '<span class="badge-tag gold">Bestseller</span>' : ''}
            ${!product.inStock ? '<span class="badge-tag">Out of Stock</span>' : ''}
        </div>
        <div class="product-image-wrap" onmousemove="handleTilt(event, this)" onmouseleave="resetTilt(this)"
             onclick="window.location.href='product.html?id=${product.id}'" style="cursor:pointer;">
            <img src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div class="product-actions">
            <button class="btn-icon" onclick="toggleWishlist(${product.id})" aria-label="Add to Wishlist">
                <i class="fa-${state.wishlist.includes(product.id) ? 'solid' : 'regular'} fa-heart"></i>
            </button>
            <button class="btn-icon" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''} aria-label="Add to Cart">
                <i class="fa-solid fa-bag-shopping"></i>
            </button>
            <button class="btn-icon" onclick="openQuickView(${product.id})" aria-label="Quick View">
                <i class="fa-solid fa-eye"></i>
            </button>
        </div>
        <div class="product-info">
            <span class="product-category">${product.category}</span>
            <h3 class="product-title" onclick="window.location.href='product.html?id=${product.id}'">${product.name}</h3>
            <div class="product-price-rating">
                <span class="product-price">${formatPrice(product.price)}</span>
                <div class="product-rating">
                    ${'<i class="fa-solid fa-star"></i>'.repeat(Math.floor(product.rating))}
                    ${product.rating % 1 !== 0 ? '<i class="fa-solid fa-star-half-stroke"></i>' : ''}
                </div>
            </div>
        </div>
    </div>
`;

/**
 * 5. INTERACTIONS
 */
const addToCart = (id, qty = 1) => {
    const product = products.find(p => p.id === id);
    if (!product || !product.inStock) return;
    const existing = state.cart.find(item => item.id === id);
    if (existing) existing.quantity += qty;
    else state.cart.push({ ...product, quantity: qty });
    saveState();
    renderCart();
    document.getElementById('cartSidebar').classList.add('active');
    document.getElementById('overlay').classList.add('active');
    showToast(`${product.name} added to cart`);
};

const updateQuantity = (id, change) => {
    const item = state.cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) state.cart = state.cart.filter(i => i.id !== id);
        saveState();
        renderCart();
    }
};

const toggleWishlist = (id) => {
    const index = state.wishlist.indexOf(id);
    if (index > -1) {
        state.wishlist.splice(index, 1);
        showToast('Removed from wishlist', 'fa-info-circle');
    } else {
        state.wishlist.push(id);
        showToast('Added to wishlist');
    }
    saveState();
    document.querySelectorAll(`.product-card[data-id="${id}"] .fa-heart`).forEach(icon => {
        icon.className = state.wishlist.includes(id) ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
    });
    const pdpHeart = document.getElementById('pdpWishlistBtn')?.querySelector('i');
    if(pdpHeart) pdpHeart.className = state.wishlist.includes(id) ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
};

const renderCart = () => {
    const container = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotalValue');
    if (!container || !totalEl) return;
    if (state.cart.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding: 2rem; color: var(--text-muted);">Your cart is empty.<br><br><i class="fa-solid fa-bag-shopping" style="font-size:3rem; opacity:0.2;"></i></div>`;
        totalEl.textContent = '$0.00';
        return;
    }
    let total = 0;
    container.innerHTML = state.cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="cart-item">
                <div class="cart-item-img"><img src="${item.image}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover; border-radius:var(--radius-md);"></div>
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                    <div class="qty-control">
                        <span class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</span>
                        <span>${item.quantity}</span>
                        <span class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</span>
                    </div>
                </div>
                <i class="fa-solid fa-trash cart-remove" onclick="updateQuantity(${item.id}, -${item.quantity})"></i>
            </div>`;
    }).join('');
    totalEl.textContent = formatPrice(total);
};

const openQuickView = (id) => {
    const product = products.find(p => p.id === id);
    const content = document.getElementById('quickViewContent');
    content.innerHTML = `
        <div class="qv-img"><img src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover; border-radius:var(--radius-md);"></div>
        <div class="qv-details">
            <span class="product-category">${product.category}</span>
            <h2 class="title-md">${product.name}</h2>
            <div class="qv-price">${formatPrice(product.price)}</div>
            <p class="qv-desc">${product.desc}</p>
            <div style="display:flex; gap:1rem; margin-top:2rem;">
                <button class="btn btn-primary" style="flex:1;" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>${product.inStock ? 'Add to Cart' : 'Out of Stock'}</button>
                <button class="btn-icon" onclick="toggleWishlist(${product.id})"><i class="fa-${state.wishlist.includes(product.id) ? 'solid' : 'regular'} fa-heart"></i></button>
            </div>
        </div>`;
    document.getElementById('quickViewModal').classList.add('active');
    document.getElementById('overlay').classList.add('active');
};

const closeModals = () => document.querySelectorAll('.modal, .sidebar, .filter-sidebar, .overlay').forEach(el => el.classList.remove('active'));

const handleTilt = (e, el) => {
    const rect = el.getBoundingClientRect();
    const rotateX = ((e.clientY - rect.top - rect.height/2) / (rect.height/2)) * -10;
    const rotateY = ((e.clientX - rect.left - rect.width/2) / (rect.width/2)) * 10;
    el.parentElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
};
const resetTilt = (el) => el.parentElement.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

/**
 * 6. INITIALIZATION
 */
const applyTheme = (themeName) => {
    document.body.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
    state.theme = themeName;
    const icon = document.querySelector('#themeToggle i');
    if(icon) icon.className = (themeName === 'dark') ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
};

const initObservers = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('active'); observer.unobserve(entry.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
};

document.addEventListener('DOMContentLoaded', () => {
    applyTheme(state.theme);
    updateBadges();
    renderCart();
    initObservers();

    // Cursor
    const cursor = document.getElementById('cursor');
    if(cursor) {
        document.addEventListener('mousemove', (e) => { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; });
        document.addEventListener('mouseover', (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('button') || e.target.closest('a') || e.target.closest('.product-card')) cursor.classList.add('hover');
            else cursor.classList.remove('hover');
        });
    }

    // Scroll
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if(document.getElementById('scrollProgress')) document.getElementById('scrollProgress').style.width = scrolled + "%";
        if(window.scrollY > 50) document.getElementById('navbar')?.classList.add('scrolled');
        else document.getElementById('navbar')?.classList.remove('scrolled');
    });

    // Event Bindings
    document.getElementById('themeToggle')?.addEventListener('click', () => applyTheme(state.theme === 'light' ? 'dark' : 'light'));
    document.getElementById('cartBtn')?.addEventListener('click', () => { document.getElementById('cartSidebar').classList.add('active'); document.getElementById('overlay').classList.add('active'); });
    document.getElementById('searchBtn')?.addEventListener('click', () => { document.getElementById('searchModal').classList.add('active'); document.getElementById('overlay').classList.add('active'); document.getElementById('searchInput')?.focus(); });
    document.getElementById('overlay')?.addEventListener('click', closeModals);
    document.querySelectorAll('.close-btn').forEach(btn => btn.addEventListener('click', closeModals));

    // Bottom Nav
    document.getElementById('bnavSearchBtn')?.addEventListener('click', () => { document.getElementById('searchModal').classList.add('active'); document.getElementById('overlay').classList.add('active'); document.getElementById('searchInput')?.focus(); });
    document.getElementById('bnavCartBtn')?.addEventListener('click', () => { document.getElementById('cartSidebar').classList.add('active'); document.getElementById('overlay').classList.add('active'); });
    document.getElementById('bnavWishlistBtn')?.addEventListener('click', () => showToast(`You have ${state.wishlist.length} items in your wishlist`, 'fa-heart'));

    // Search Input
    document.getElementById('searchInput')?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const container = document.getElementById('searchResults');
        if(query.length < 2) { container.innerHTML = ''; return; }
        const res = products.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
        container.innerHTML = res.length ? res.map(p => `
            <div style="display:flex; gap:1rem; align-items:center; margin-bottom:1rem; cursor:pointer;" onclick="window.location.href='product.html?id=${p.id}'">
                <div style="width:50px; height:50px; border-radius:8px; overflow:hidden;"><img src="${p.image}" style="width:100%; height:100%; object-fit:cover;"></div>
                <div><div style="font-weight:500;">${p.name}</div><div style="color:var(--text-muted); font-size:0.8rem;">${formatPrice(p.price)}</div></div>
            </div>`).join('') : '<p class="text-muted">No products found.</p>';
    });

    // Checkout
    document.getElementById('checkoutBtn')?.addEventListener('click', function() {
        if(state.cart.length === 0) return showToast('Cart is empty', 'fa-circle-exclamation');
        this.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';
        setTimeout(() => { state.cart = []; saveState(); renderCart(); closeModals(); showToast('Order placed!', 'fa-gift'); this.innerHTML = 'Proceed to Checkout'; }, 2000);
    });
});

window.createRipple = (event) => {
    const btn = event.currentTarget;
    const circle = document.createElement('span');
    const d = Math.max(btn.clientWidth, btn.clientHeight);
    circle.style.width = circle.style.height = `${d}px`;
    circle.style.left = `${event.clientX - btn.getBoundingClientRect().left - d/2}px`;
    circle.style.top = `${event.clientY - btn.getBoundingClientRect().top - d/2}px`;
    circle.classList.add('ripple');
    btn.querySelector('.ripple')?.remove();
    btn.appendChild(circle);
};
