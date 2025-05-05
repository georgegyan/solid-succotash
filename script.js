document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Cart functionality
    const cartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.getElementById('close-cart');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const deliveryFee = document.getElementById('delivery-fee');
    const cartTotal = document.getElementById('cart-total');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const DELIVERY_FEE = 2.99;
    
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
    
    // Food menu data
    const menuItems = [
        {
            id: 1,
            name: 'Margherita Pizza',
            price: 75.00,
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            description: 'Classic pizza with tomato sauce, mozzarella, and basil',
            category: 'pizza'
        },
        {
            id: 2,
            name: 'Pepperoni Pizza',
            price: 14.99,
            image: 'https://images.unsplash.com/photo-1620374645498-af6bd681a0bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            description: 'Pizza with tomato sauce, mozzarella, and pepperoni',
            category: 'pizza'
        },
        {
            id: 3,
            name: 'Chicken Burger',
            price: 9.99,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            description: 'Juicy chicken patty with lettuce, tomato, and special sauce',
            category: 'burger'
        },
        {
            id: 4,
            name: 'Beef Burger',
            price: 10.99,
            image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            description: '100% beef patty with cheese, onion, and pickles',
            category: 'burger'
        },
        {
            id: 5,
            name: 'Caesar Salad',
            price: 8.99,
            image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            description: 'Romaine lettuce, croutons, parmesan with Caesar dressing',
            category: 'salad'
        },
        {
            id: 6,
            name: 'Greek Salad',
            price: 9.49,
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            description: 'Tomatoes, cucumber, olives, feta cheese with olive oil',
            category: 'salad'
        },
        {
            id: 7,
            name: 'Spaghetti Carbonara',
            price: 13.99,
            image: 'https://images.unsplash.com/photo-1589227365533-cee630bd59bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            description: 'Pasta with eggs, cheese, pancetta, and black pepper',
            category: 'pasta'
        },
        {
            id: 8,
            name: 'Chicken Alfredo',
            price: 14.99,
            image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            description: 'Fettuccine pasta with creamy Alfredo sauce and chicken',
            category: 'pasta'
        },
        {
            id: 9,
            name: 'Chocolate Brownie',
            price: 5.99,
            image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            description: 'Warm chocolate brownie with vanilla ice cream',
            category: 'dessert'
        },
        {
            id: 10,
            name: 'Cheesecake',
            price: 6.49,
            image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            description: 'New York style cheesecake with berry sauce',
            category: 'dessert'
        },
        {
            id: 11,
            name: 'Coca-Cola',
            price: 2.49,
            image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            description: 'Regular or diet, 500ml bottle',
            category: 'drink'
        },
        {
            id: 12,
            name: 'Lemonade',
            price: 3.99,
            image: 'https://images.unsplash.com/photo-1508253730651-e5ace80a7025?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            description: 'Freshly squeezed lemonade with mint',
            category: 'drink'
        }
    ];
    
    // Render menu items
    const menuContainer = document.querySelector('#menu .grid');
    
    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1 animate-fadeInUp';
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-semibold text-lg">${item.name}</h3>
                    <span class="font-bold text-orange-500">₵${item.price.toFixed(2)}</span>
                </div>
                <p class="text-gray-600 text-sm mb-4">${item.description}</p>
                <button class="add-to-cart w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition duration-300" data-id="${item.id}">
                    Add to Cart
                </button>
            </div>
        `;
        menuContainer.appendChild(menuItem);
    });
    
    // Add to cart functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            const menuItem = menuItems.find(item => item.id === itemId);
            
            // Check if item already in cart
            const existingItem = cart.find(item => item.id === itemId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    ...menuItem,
                    quantity: 1
                });
            }
            
            updateCart();
            
            // Add animation to cart button
            cartBtn.classList.add('animate-bounce');
            setTimeout(() => {
                cartBtn.classList.remove('animate-bounce');
            }, 1000);
        }
        
        // Remove item from cart
        if (e.target.classList.contains('remove-from-cart')) {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            cart = cart.filter(item => item.id !== itemId);
            updateCart();
        }
        
        // Update quantity
        if (e.target.classList.contains('quantity-btn')) {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            const isIncrease = e.target.classList.contains('increase');
            const item = cart.find(item => item.id === itemId);
            
            if (item) {
                if (isIncrease) {
                    item.quantity += 1;
                } else {
                    item.quantity -= 1;
                    if (item.quantity < 1) {
                        cart = cart.filter(i => i.id !== itemId);
                    }
                }
                updateCart();
            }
        }
    });

    function formatCedis(amount) {
        return '₵' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    
    // Then use it like this:
    cartTotal.textContent = formatCedis(total);
    
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
            cartTotal.textContent = '$' + DELIVERY_FEE.toFixed(2);
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
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg">
                <div class="ml-3 flex-1">
                    <h4 class="font-semibold">${item.name}</h4>
                    <p class="text-gray-600 text-sm">₵${item.price.toFixed(2)}</p>
                    <div class="flex items-center mt-1">
                        <button class="quantity-btn decrease text-gray-500 hover:text-orange-500" data-id="${item.id}">
                            <i class="fas fa-minus text-xs"></i>
                        </button>
                        <span class="mx-2 text-sm">${item.quantity}</span>
                        <button class="quantity-btn increase text-gray-500 hover:text-orange-500" data-id="${item.id}">
                            <i class="fas fa-plus text-xs"></i>
                        </button>
                    </div>
                </div>
                <div class="flex flex-col justify-between items-end">
                    <span class="font-semibold text-sm">₵${itemTotal.toFixed(2)}</span>
                    <button class="remove-from-cart text-red-500 hover:text-red-700 text-sm" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        
        const total = subtotal + DELIVERY_FEE;
        cartSubtotal.textContent = `₵${subtotal.toFixed(2)}`;
        deliveryFee.textContent = `₵${DELIVERY_FEE.toFixed(2)}`;
        cartTotal.textContent = `₵${total.toFixed(2)}`;
    }
    
    // Initialize cart
    updateCart();
});