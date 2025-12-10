// germaines code
document.addEventListener("DOMContentLoaded", () => {
    updateRewardsDisplay();
    loadOrderHistory();
});

function getRewardsData() {
    const data = localStorage.getItem('rewardsData');
    return data ? JSON.parse(data) : { points: 0, totalOrders: 0, orderHistory: [] };
}

function saveRewardsData(data) {
    localStorage.setItem('rewardsData', JSON.stringify(data));
}

function updateRewardsDisplay() {
    const rewards = getRewardsData();
    const currentPoints = rewards.points % 100; 
    const completedRewards = Math.floor(rewards.points / 100);
    
    document.getElementById('currentPoints').textContent = rewards.points;
    document.getElementById('progressText').textContent = `${currentPoints}/100`;
    document.getElementById('pointsNeeded').textContent = 100 - currentPoints;
    
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = `${currentPoints}%`;
    
    const redeemBtn = document.getElementById('redeemBtn');
    if (rewards.points >= 100) {
        redeemBtn.disabled = false;
        redeemBtn.textContent = `Redeem 100 Points for Free Item (${Math.floor(rewards.points / 100)} available)`;
    } else {
        redeemBtn.disabled = true;
        redeemBtn.textContent = 'Redeem 100 Points for Free Item';
    }
}

function addOrderPoints(orderTotal = 0) {
    const rewards = getRewardsData();
    const pointsEarned = 20;
    
    rewards.points += pointsEarned;
    rewards.totalOrders += 1;
    rewards.orderHistory.unshift({
        date: new Date().toLocaleDateString(),
        points: pointsEarned,
        total: orderTotal
    });
    
    if (rewards.orderHistory.length > 10) {
        rewards.orderHistory = rewards.orderHistory.slice(0, 10);
    }
    
    saveRewardsData(rewards);
    updateRewardsDisplay();
    loadOrderHistory();
    
    alert(`🎉 You earned ${pointsEarned} points! Total: ${rewards.points} points`);
}

function redeemReward() {
    const rewards = getRewardsData();
    
    if (rewards.points >= 100) {
        rewards.points -= 100;
        saveRewardsData(rewards);
        updateRewardsDisplay();
        
        alert('🎉 Congratulations! You redeemed 100 points for a free item! Show this to staff to claim your reward.');
    }
}

function loadOrderHistory() {
    const rewards = getRewardsData();
    const historyContainer = document.getElementById('orderHistory');
    
    if (rewards.orderHistory.length === 0) {
        historyContainer.innerHTML = '<p style="text-align: center; color: #6c757d;">No orders yet. Start ordering to earn points!</p>';
        return;
    }
    
    historyContainer.innerHTML = rewards.orderHistory.map(order => `
        <div class="order-item">
            <div>
                <strong>${order.date}</strong>
                ${order.total ? `- $${order.total.toFixed(2)}` : ''}
            </div>
            <div class="points-earned">+${order.points} points</div>
        </div>
    `).join('');
}

function testAddPoints() {
    addOrderPoints(25.99);
}

window.addOrderPoints = addOrderPoints;