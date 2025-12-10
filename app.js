// Chris code//

document.getElementById('customer-form').addEventListener('submit', function(event){
    event.preventDefault();
const customerName = document.getElementById('customer-name').value;
localStorage.setItem('customerName', customerName);
window.location.href = 'login.html';
});
// Chris code ^ //