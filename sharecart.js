//corinnes code 

function loadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price, quantity) {
    let cart = loadCart();

    const existing = cart.find(i => i.name === name);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: quantity
        });
    }

    saveCart(cart);
}

function getTotals() {
    let cart = loadCart();
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let tax = subtotal * 0.07;
    let total = subtotal + tax;
    return { subtotal, tax, total };
}

function renderCart(containerSel, subSel, taxSel, totalSel) {
    let container = document.querySelector(containerSel);
    if (!container) return;

    let cart = loadCart();
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is currently empty</p>";
        return;
    }

    cart.forEach(item => {
        let row = document.createElement("div");
        row.classList.add("cart-row");
        row.innerHTML = `
            <div class="cart-name">${item.name}</div>
            <div class="cart-controls">
                <button class="minus" data-name="${item.name}">-</button>
                <span>${item.quantity}</span>
                <button class="plus" data-name="${item.name}">+</button>
            </div>
            <div class="cart-price">$${(item.price * item.quantity).toFixed(2)}</div>
        `;
        container.appendChild(row);
    });

    // totals
    if (subSel) document.querySelector(subSel).textContent = "$" + getTotals().subtotal.toFixed(2);
    if (taxSel) document.querySelector(taxSel).textContent = "$" + getTotals().tax.toFixed(2);
    if (totalSel) document.querySelector(totalSel).textContent = "$" + getTotals().total.toFixed(2);

    enableCartRowButtons();
}

function enableCartRowButtons() {
    document.querySelectorAll(".plus").forEach(btn => {
        btn.onclick = () => {
            let cart = loadCart();
            const item = cart.find(i => i.name === btn.dataset.name);
            item.quantity++;
            saveCart(cart);
            refreshAllCarts();
        };
    });

    document.querySelectorAll(".minus").forEach(btn => {
        btn.onclick = () => {
            let cart = loadCart();
            const item = cart.find(i => i.name === btn.dataset.name);
            item.quantity--;

            if (item.quantity <= 0) {
                cart = cart.filter(i => i.name !== item.name);
            }

            saveCart(cart);
            refreshAllCarts();
        };
    });
}

function refreshAllCarts() {
    renderCart(".cart-items", "#cart-subtotal", "#cart-tax", "#cart-total");

    renderCart(".full-cart-items", "#full-subtotal", "#full-tax", "#full-total");
}

//corinnes code 