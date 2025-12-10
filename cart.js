/* corinnes code but revised chris's code
*/

const TAX_RATE = 0.08;

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('cart')) || [];
  } catch (e) {
    console.error('Failed to parse cart', e);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function findIndex(cart, name) {
  return cart.findIndex(i => i.name === name);
}

function addToCart(name, price, image = '', qty = 1) {
  if (!name || !price || typeof qty !== 'number' || qty <= 0) return;
  const cart = loadCart();
  const idx = findIndex(cart, name);
  if (idx > -1) {
    cart[idx].quantity += qty;
  } else {
    cart.push({ name, price: Number(price), image: image || '', quantity: qty });
  }
  saveCart(cart);
  refreshAllCarts();
}

function setItemQuantity(name, quantity) {
  let cart = loadCart();
  const idx = findIndex(cart, name);
  if (idx === -1) return;
  if (quantity <= 0) {
    cart.splice(idx, 1);
  } else {
    cart[idx].quantity = quantity;
  }
  saveCart(cart);
  refreshAllCarts();
}

function removeCartItemByName(name) {
  let cart = loadCart();
  cart = cart.filter(i => i.name !== name);
  saveCart(cart);
  refreshAllCarts();
}

function computeTotals(cart = null) {
  cart = cart || loadCart();
  const subtotal = cart.reduce((s, it) => s + (Number(it.price) * Number(it.quantity || 0)), 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  return { subtotal, tax, total };
}

function renderModalCart() {
  const container = document.querySelector('.cart-items');
  if (!container) return;
  const cart = loadCart();
  const cartItemsList = document.getElementById('cart-items-list');
  if (cartItemsList) cartItemsList.innerHTML = '';
  if (cart.length === 0) {
    if (cartItemsList) cartItemsList.innerHTML = '<p>Your cart is currently empty</p>';
  } else {

  }

  const totals = computeTotals(cart);
  const subEl = document.getElementById('cart-subtotal');
  const taxEl = document.getElementById('cart-tax');
  const totEl = document.getElementById('cart-total');
  const tipInput = document.getElementById('tip-amount');
  let tip = 0;
  if (tipInput) {
    tip = parseFloat(tipInput.value) || 0;
    if (tip < 0) tip = 0; 
  }
  const finalTotal = totals.total + tip;

  if (subEl) subEl.textContent = '$' + totals.subtotal.toFixed(2);
  if (taxEl) taxEl.textContent = '$' + totals.tax.toFixed(2);
  if (totEl) totEl.textContent = '$' + finalTotal.toFixed(2);

  attachCartHandlers(chrisContainer); 
}

function renderFullCart() {
  const cart = loadCart();

  const chrisContainer = document.getElementById('cart-items-list');
  if (chrisContainer) {
    chrisContainer.innerHTML = '';
    if (cart.length === 0) {
      chrisContainer.innerHTML = '<p>Your cart is currently empty</p>';
    } else {
      cart.forEach((item, idx) => {
        const itemTotal = (Number(item.price) * Number(item.quantity)).toFixed(2);
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <img src="${escapeHtml(item.image || '')}" alt="${escapeHtml(item.name)}" class="cart-item-image" style="max-width:64px;max-height:64px;">
          <div class="cart-item-details">
            <h4>${escapeHtml(item.name)}</h4>
            <p>Price: $${Number(item.price).toFixed(2)}</p>
            <p>Quantity: <span class="full-qty" data-name="${escapeHtml(item.name)}">${item.quantity}</span></p>
            <p><strong>Total: $${itemTotal}</strong></p>
          </div>
          <button class="remove-item-btn" data-index="${idx}" data-name="${escapeHtml(item.name)}">Remove</button>
        `;
        chrisContainer.appendChild(div);
      });
    }
  }



  const totals = computeTotals(cart);
  const ids = ['cart-subtotal', 'cart-tax', 'cart-total', 'full-subtotal', 'full-tax', 'full-total'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (id.includes('subtotal')) el.textContent = '$' + totals.subtotal.toFixed(2);
    if (id.includes('tax')) el.textContent = '$' + totals.tax.toFixed(2);
    if (id.includes('total')) {
        const tipInput = document.getElementById('tip-amount');
        let tip = 0;
        if (tipInput) {
          tip = parseFloat(tipInput.value) || 0;
          if (tip < 0) tip = 0; 
        }
        el.textContent = '$' + (totals.total + tip).toFixed(2);
    }
  });

  if (chrisContainer) {
    chrisContainer.querySelectorAll('.remove-item-btn').forEach(btn => {
      btn.onclick = () => {
        const name = btn.dataset.name;
        removeCartItemByName(name);
      };
    });
  }


}

function attachCartHandlers(container) {
  if (!container) return;

 
}

function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function refreshAllCarts() {
  try {
    renderFullCart(); 
  } catch (e) {
    console.error('refreshAllCarts error', e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  refreshAllCarts();
});

function showPaymentModal() {
  const modal = document.getElementById('payment-modal');
  if (modal) {
    modal.style.display = 'block';
  }
}

function closePaymentModal() {
  const modal = document.getElementById('payment-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function selectPayment(method) {
  closePaymentModal();

  if (method === 'credit-card') {
    const cardModal = document.getElementById('card-payment-modal');
    if (cardModal) {
      cardModal.style.display = 'block';
    }
  } else {
    processOtherPayment(method);
  }
}

function closeCardModal() {
  const modal = document.getElementById('card-payment-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

/**
 * @returns {boolean}
 */
function validateCardForm() {
    const form = document.getElementById('card-form');
    if (!form.checkValidity()) {
        form.reportValidity(); 
        return false;
    }
    
    const expiryInput = document.getElementById('card-expiry');
    const expiryValue = expiryInput.value.trim(); 
    const parts = expiryValue.split('/');
    
    if (parts.length === 2) {
        const month = parseInt(parts[0], 10);
        const year = parseInt('20' + parts[1], 10);
        
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1; 

        if (year < currentYear) {
            alert('Expiry date is in the past.');
            expiryInput.focus();
            return false;
        }

        if (year === currentYear && month < currentMonth) {
            alert('Expiry date is in the past.');
            expiryInput.focus();
            return false;
        }
    }
    
    if (loadCart().length === 0) {
        alert('Your cart is empty. Please add items before paying.');
        return false;
    }

    return true;
}

function processPayment(event) {
  event.preventDefault(); 

  if (!validateCardForm()) {
      return; 
  }

  closeCardModal();
  showReceipt('Credit Card');
}

function processOtherPayment(method) {
  if (loadCart().length === 0) {
      alert('Your cart is empty. Please add items before choosing a payment method.');
      return;
  }
  
  const methodNames = {
    'paypal': 'PayPal',
    'apple-pay': 'Apple Pay',
    'google-pay': 'Google Pay',
    'cash': 'Cash on Delivery'
  };

  showReceipt(methodNames[method] || method);
}

function showReceipt(paymentMethod) {
  const cart = loadCart();
  const totals = computeTotals(cart);
  const tip = parseFloat(document.getElementById('tip-amount').value) || 0;
  const finalTotal = totals.total + tip;

  const orderNumber = Math.floor(Math.random() * 900000) + 100000;
  const now = new Date();

  document.getElementById('receipt-order-number').textContent = orderNumber;
  document.getElementById('receipt-date').textContent = now.toLocaleDateString();
  document.getElementById('receipt-time').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.getElementById('receipt-payment-method').textContent = paymentMethod;

  const itemsContainer = document.getElementById('receipt-items');
  itemsContainer.innerHTML = cart.map(item => `
    <div class="receipt-item">
      <span>${item.quantity}x ${item.name}</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
    </div>
  `).join('');

  document.getElementById('receipt-subtotal').textContent = '$' + totals.subtotal.toFixed(2);
  document.getElementById('receipt-tax').textContent = '$' + totals.tax.toFixed(2);
  document.getElementById('receipt-tip').textContent = '$' + tip.toFixed(2);
  document.getElementById('receipt-total').textContent = '$' + finalTotal.toFixed(2);

  const completionTime = new Date(now.getTime() + (30 * 60000)); 
  const completionTimeStr = completionTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  document.getElementById('receipt-completion').textContent =
    completionTimeStr + ' (' + '30-45 minutes)';

  const receiptModal = document.getElementById('receipt-modal');
  if (receiptModal) {
    receiptModal.style.display = 'block';
  }

  if (typeof window.addOrderPoints === 'function') {
    window.addOrderPoints(finalTotal);
  }

  setTimeout(() => {
    localStorage.removeItem('cart');
    const tipInput = document.getElementById('tip-amount');
    if (tipInput) tipInput.value = '';
    refreshAllCarts(); 
  }, 1000);
}

function closeReceiptModal() {
  const modal = document.getElementById('receipt-modal');
  if (modal) {
    modal.style.display = 'none';
  }
  window.location.href = 'main.html';
}

window.onclick = function(event) {
  const paymentModal = document.getElementById('payment-modal');
  const cardModal = document.getElementById('card-payment-modal');
  const receiptModal = document.getElementById('receipt-modal');

  if (event.target === paymentModal) {
    closePaymentModal();
  }
  if (event.target === cardModal) {
    closeCardModal();
  }
  if (event.target === receiptModal) {
    
  }
}

// corinne and revised chris's code end