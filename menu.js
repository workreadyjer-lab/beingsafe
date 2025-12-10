//corinnes code 
document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.menu-item');

  menuItems.forEach(item => {
    const plusBtn = item.querySelector('.plus-btn') || item.querySelector('.quantity-controls .plus-btn');
    const minusBtn = item.querySelector('.minus-btn') || item.querySelector('.quantity-controls .minus-btn');
    const qtyInput = item.querySelector('.quantity');
    const addBtn = item.querySelector('.add-to-cart-btn');

    const name = item.dataset.name;
    const price = parseFloat(item.dataset.price || 0);
    const image = item.dataset.image || '';

    const getQty = () => {
      const v = parseInt(qtyInput.value, 10);
      return (isNaN(v) || v < 0) ? 0 : v;
    };

    if (plusBtn) {
      plusBtn.addEventListener('click', () => {
        qtyInput.value = getQty() + 1;
      });
    }

    if (minusBtn) {
      minusBtn.addEventListener('click', () => {
        const q = getQty();
        if (q > 0) qtyInput.value = q - 1;
      });
    }

    if (qtyInput) {
      qtyInput.addEventListener('input', () => {
        if (qtyInput.value === '') return;
        let v = parseInt(qtyInput.value, 10);
        if (isNaN(v) || v < 0) v = 0;
        qtyInput.value = v;
      });
    }

    if (addBtn) {
      addBtn.addEventListener('click', () => {
        const q = getQty();
        if (q === 0) {
          return;
        }
        addToCart(name, price, image, q);
        qtyInput.value = 0;

        const prev = addBtn.textContent;
        addBtn.textContent = '✓ Added';
        addBtn.disabled = true;
        setTimeout(() => {
          addBtn.textContent = prev;
          addBtn.disabled = false;
        }, 900);
      });
    }
  });
});
// corinnes code 