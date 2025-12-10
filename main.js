//corinnes code
function updateCartCount() {
    if (typeof loadCart === 'function') {
        const cart = loadCart();
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        const cartBtn = document.querySelector('.cart-btn');
        if (cartBtn) {
            cartBtn.textContent = `🛒 Cart (${itemCount})`;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateCartCount(); 
    
    const deliveryBtn = document.querySelector('.delivery-btn');
    const deliveryOverlay = document.getElementById('deliveryOverlay');
    const deliveryForm = document.getElementById('delivery-form'); 
    if (deliveryBtn && deliveryOverlay) {
       
        deliveryBtn.addEventListener('click', () => deliveryOverlay.style.display = 'flex');
        deliveryOverlay.addEventListener('click', e => { if (e.target === deliveryOverlay) deliveryOverlay.style.display = 'none'; });
    }

    if (deliveryForm) {
        deliveryForm.addEventListener('submit', function(event) {
            event.preventDefault();

            if (!deliveryForm.checkValidity()) {
                deliveryForm.reportValidity(); 
                return;
            }

            alert('Delivery details saved! Proceeding to menu...');
            deliveryOverlay.style.display = 'none';
            window.location.href = 'menu.html';
        });
    }

    const pickupBtn = document.querySelector('.pickup-btn');
    const pickupOverlay = document.getElementById('pickupOverlay');
    const pickupForm = document.getElementById('pickup-form'); 

    if (pickupBtn && pickupOverlay) {
        pickupBtn.addEventListener('click', () => pickupOverlay.style.display = 'flex');
        pickupOverlay.addEventListener('click', e => { if (e.target === pickupOverlay) pickupOverlay.style.display = 'none'; });
    }

    if (pickupForm) {
        pickupForm.addEventListener('submit', function(event) {
            event.preventDefault();

            if (!pickupForm.checkValidity()) {
                pickupForm.reportValidity();
                return;
            }

            alert('Pick Up details saved! Proceeding to menu...');
            pickupOverlay.style.display = 'none';
            window.location.href = 'menu.html';
        });
    }

    const cartBtn = document.querySelector('.cart-btn');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCart = document.querySelector('.close-cart');
    const checkoutBtn = document.querySelector('.checkout-btn');

    if (cartBtn && cartOverlay && typeof refreshAllCarts === 'function') {
      cartBtn.addEventListener('click', () => {
        refreshAllCarts(); 
        cartOverlay.style.display = 'flex';
      });
    }
    if (closeCart) closeCart.addEventListener('click', () => cartOverlay.style.display = 'none');
    if (cartOverlay) cartOverlay.addEventListener('click', e => { if (e.target === cartOverlay) cartOverlay.style.display = 'none'; });
    if (checkoutBtn) checkoutBtn.addEventListener('click', () => window.location.href = 'cart.html');

    const dealBtn = document.getElementById('dealButton');
    if (dealBtn && typeof addToCart === 'function') {
      dealBtn.addEventListener('click', () => {
        addToCart('Weekly Taco Deal (Buy 2 Get 2 Free)', 9.99, '', 1);
        alert('Weekly deal added to cart!');
        updateCartCount(); 
      });
    }
    
    const signInIcon = document.getElementById("signInIcon");
    const signinOverlay = document.getElementById("signinOverlay");
    const signOutBtn = document.getElementById("signOutBtn");
    const userProfile = document.getElementById("userProfile");
    const closeSignin = document.querySelector('.close-signin');

    if (signInIcon) {
        signInIcon.addEventListener("click", () => {
            signinOverlay.style.display = "flex";
        });
    }

    if (closeSignin) {
        closeSignin.addEventListener("click", () => {
            signinOverlay.style.display = "none";
        });
    }
    signinOverlay.addEventListener('click', e => { if (e.target === signinOverlay) signinOverlay.style.display = 'none'; });


    document.querySelector(".signin-continue").addEventListener("click", () => {
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        
        if (!emailInput.checkValidity() || !passwordInput.checkValidity()) {
            
            if (!emailInput.checkValidity()) emailInput.reportValidity();
            else passwordInput.reportValidity();
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        localStorage.setItem("userLoggedIn", "true");
        localStorage.setItem("userEmail", email);

        alert(`Logged in as ${email}!`);
        location.reload();
    });

    const facultyLink = document.getElementById('facultyLink');
    const facultyOverlay = document.getElementById('facultyOverlay');
    const facultyLoginBtn = document.getElementById('facultyLoginBtn');

    if (facultyLink) {
        facultyLink.addEventListener('click', () => {
            signinOverlay.style.display = 'none';
            facultyOverlay.style.display = 'flex';
        });
    }

    if (facultyOverlay) {
        facultyOverlay.addEventListener('click', (e) => {
            if (e.target === facultyOverlay) {
                facultyOverlay.style.display = 'none';
            }
        });
    }

    if (facultyLoginBtn) {
        facultyLoginBtn.addEventListener('click', () => {
            const usernameInput = document.getElementById('faculty-username');
            const passwordInput = document.getElementById('faculty-password');
            
            if (!usernameInput.checkValidity() || !passwordInput.checkValidity()) {
                if (!usernameInput.checkValidity()) usernameInput.reportValidity();
                else passwordInput.reportValidity();
                return;
            }

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (username === 'admin' && password === 'manager123') {
                alert('Manager login successful. Redirecting...');
                window.location.href = 'manager.html';
            } else {
                alert('Invalid manager credentials. Please try again.');
            }
        });
    }

    if (signOutBtn) {
        signOutBtn.addEventListener("click", () => {
            localStorage.removeItem("userLoggedIn");
            localStorage.removeItem("userEmail");
            location.reload();
        });
    }

    const isLoggedIn = localStorage.getItem("userLoggedIn");

    if (isLoggedIn) {
        if (signInIcon) signInIcon.style.display = "none";
        if (userProfile) userProfile.style.display = "flex";
    }
});

//corinnes code