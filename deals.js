// corinnes code 

const deals = [
    { name: "Buy 2 Get 2 Free Tacos", price: 9.99, image: "imgs/tacod.png" },
    { name: "Half-Price Nachos", price: 6.99, image: "imgs/nachod.png" },
    { name: "Free Drink with Burrito", price: 4.99, image: "imgs/burritod.png" },
    { name: "2 for 1 Quesadillas", price: 8.99, image: "imgs/quesadillad.png" },
    { name: "Combo Meal Special", price: 12.99, image: "imgs/combo.png" },
    { name: "Dessert Free with Any Order", price: 0, image: "imgs/fland.png" },
];

const dealsContainer = document.getElementById("dealsContainer");

deals.forEach(deal => {
    const dealCard = document.createElement("div");
    dealCard.classList.add("deal-card");

    dealCard.innerHTML = `
        <img src="${deal.image}" alt="${deal.name}">
        <div class="deal-overlay">
            <h3>${deal.name}</h3>
            <button onclick="addToCart('${deal.name}', ${deal.price}, '', 1)">Add to Cart</button>
        </div>
    `;

    dealsContainer.appendChild(dealCard);
});

function addToCart(name, price, image, quantity) {
    alert(`Added "${name}" to the cart!`);
}

// corinnes code 