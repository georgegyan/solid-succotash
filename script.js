document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Cart functionality
    const cartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.getElementById('close-cart');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Toggle cart sidebar
    cartBtn.addEventListener('click', function() {
        cartSidebar.classList.remove('translate-x-full');
        cartOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });
    
    closeCartBtn.addEventListener('click', function() {
        cartSidebar.classList.add('translate-x-full');
        cartOverlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });
    
    cartOverlay.addEventListener('click', function() {
        cartSidebar.classList.add('translate-x-full');
        cartOverlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });
    
    // Product data
    const products = [
        {
            id: 1,
            name: 'Wireless Headphones',
            price: 99.99,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            description: 'Premium wireless headphones with noise cancellation.'
        },
        {
            id: 2,
            name: 'Smart Watch',
            price: 199.99,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            description: 'Track your fitness and stay connected with this smart watch.'
        },
        {
            id: 3,
            name: 'Bluetooth Speaker',
            price: 79.99,
            image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            description: 'Portable bluetooth speaker with 20 hours of battery life.'
        },
        {
            id: 4,
            name: 'Laptop Backpack',
            price: 49.99,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            description: 'Durable backpack with laptop compartment and USB charging port.'
        },
        {
            id: 5,
            name: 'Wireless Keyboard',
            price: 59.99,
            image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            description: 'Slim wireless keyboard with quiet-touch keys.'
        },
        {
            id: 6,
            name: 'Gaming Mouse',
            price: 45.99,
            image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            description: 'High-precision gaming mouse with customizable RGB lighting.'
        },
        {
            id: 7,
            name: 'External SSD',
            price: 129.99,
            image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            description: '1TB external SSD with ultra-fast transfer speeds.'
        },
        {
            id: 8,
            name: 'E-Reader',
            price: 139.99,
            image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            description: 'Paper-like display for comfortable reading anywhere.'
        }
    ];
    
    // Render products
    const productsContainer = document.querySelector('.grid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="font-semibold text-lg mb-2">${product.name}</h3>
                <p class="text-gray-600 mb-4">${product.description}</p>
                <div class="flex justify-between items-center">
                    <span class="font-bold text-lg">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-300" data-id="${product.id}">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
    
    // Add to cart functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            
            // Check if product already in cart
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    ...product,
                    quantity: 1
                });
            }
            
            updateCart();
        }
        
        // Remove item from cart
        if (e.target.classList.contains('remove-from-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            cart = cart.filter(item => item.id !== productId);
            updateCart();
        }
        
        // Update quantity
        if (e.target.classList.contains('quantity-btn')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const isIncrease = e.target.classList.contains('increase');
            const item = cart.find(item => item.id === productId);
            
            if (item) {
                if (isIncrease) {
                    item.quantity += 1;
                } else {
                    item.quantity -= 1;
                    if (item.quantity < 1) {
                        cart = cart.filter(i => i.id !== productId);
                    }
                }
                updateCart();
            }
        }
    });
    
    // Update cart UI
    function updateCart() {
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart items
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center py-8">Your cart is empty</p>';
            cartSubtotal.textContent = '$0.00';
            return;
        }
        
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'flex border-b py-4';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded">
                <div class="ml-4 flex-1">
                    <h4 class="font-semibold">${item.name}</h4>
                    <p class="text-gray-600">$${item.price.toFixed(2)}</p>
                    <div class="flex items-center mt-2">
                        <button class="quantity-btn decrease text-gray-500 hover:text-green-500" data-id="${item.id}">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="quantity-btn increase text-gray-500 hover:text-green-500" data-id="${item.id}">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div class="flex flex-col justify-between items-end">
                    <span class="font-semibold">$${itemTotal.toFixed(2)}</span>
                    <button class="remove-from-cart text-red-500 hover:text-red-700" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        
        cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    }
    
    // Initialize cart
    updateCart();
});