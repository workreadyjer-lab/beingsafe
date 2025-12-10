
//chris code //
document.addEventListener('DOMContentLoaded', function() {
    loadMenuItems();
    
    
    const addForm = document.getElementById('add-item-form');
    if (addForm) {
        addForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addMenuItem();
        });
    }
    
   
    const editForm = document.getElementById('edit-item-form');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveEditedItem();
        });
    }
    
   
    const modal = document.getElementById('edit-modal');
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
   
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});


function initializeMenuItems() {
    if (!localStorage.getItem('menuItems')) {
        const defaultItems = [
            // Breakfast
            {
                id: 1,
                name: 'Chilaquiles',
                price: 8.99,
                image: 'imgs/breakfast/chilaquile.jpg',
                category: 'breakfast'
            },
            {
                id: 2,
                name: 'Huevos a la Mexicana',
                price: 7.99,
                image: 'imgs/breakfast/huevos a la mexicana.png',
                category: 'breakfast'
            },
            {
                id: 3,
                name: 'Molletes',
                price: 6.99,
                image: 'imgs/breakfast/mexican molletes.png',
                category: 'breakfast'
            },
            {
                id: 4,
                name: 'Tamales',
                price: 5.99,
                image: 'imgs/breakfast/tamales.png',
                category: 'breakfast'
            },
            {
                id: 5,
                name: 'Enfrijoladas',
                price: 7.99,
                image: 'imgs/breakfast/enfrijoladas de queso.png',
                category: 'breakfast'
            },
            // Lunch
            {
                id: 6,
                name: 'Tacos',
                price: 9.99,
                image: 'imgs/tacos.png',
                category: 'lunch'
            },
            {
                id: 7,
                name: 'Chiles Rellenos',
                price: 10.99,
                image: 'imgs/chiles-rellenos.png',
                category: 'lunch'
            },
            {
                id: 8,
                name: 'Pozole Rojo',
                price: 11.99,
                image: 'imgs/posole rojo.png',
                category: 'lunch'
            },
            {
                id: 9,
                name: 'Tostadas',
                price: 8.99,
                image: 'imgs/tostadas.png',
                category: 'lunch'
            },
            {
                id: 10,
                name: 'Beef Enchiladas',
                price: 12.99,
                image: 'imgs/beef enchiladas.png',
                category: 'lunch'
            },
            // Dinner
            {
                id: 11,
                name: 'Chicken Flautas',
                price: 10.99,
                image: 'imgs/chicken flautas.png',
                category: 'dinner'
            },
            {
                id: 12,
                name: 'Frijoles Charros',
                price: 7.99,
                image: 'imgs/frijoles charros.png',
                category: 'dinner'
            },
            {
                id: 13,
                name: 'Caldo de Albóndigas',
                price: 9.99,
                image: 'imgs/Caldo de Albóndigas.png',
                category: 'dinner'
            },
            {
                id: 14,
                name: 'Caldillo de Carne',
                price: 9.99,
                image: 'imgs/Caldillo de Carne Molida.png',
                category: 'dinner'
            },
            {
                id: 15,
                name: 'Rajas con Papas',
                price: 8.99,
                image: 'imgs/Grilled Rajas con Papas.png',
                category: 'dinner'
            },
            // Dessert
            {
                id: 16,
                name: 'Tres Leches Cake',
                price: 6.99,
                image: 'imgs/tres leches cake.png',
                category: 'dessert'
            },
            {
                id: 17,
                name: 'Flan',
                price: 5.99,
                image: 'imgs/flan.png',
                category: 'dessert'
            },
            {
                id: 18,
                name: 'Churros',
                price: 4.99,
                image: 'imgs/churros.png',
                category: 'dessert'
            },
            {
                id: 19,
                name: 'Arroz con Leche',
                price: 4.99,
                image: 'imgs/arroz con leche.png',
                category: 'dessert'
            },
            {
                id: 20,
                name: 'Buñuelos',
                price: 5.99,
                image: 'imgs/Buñuelos.png',
                category: 'dessert'
            }
        ];
        localStorage.setItem('menuItems', JSON.stringify(defaultItems));
    }
}


function loadMenuItems() {
    initializeMenuItems();
    const menuItems = JSON.parse(localStorage.getItem('menuItems') || '[]');
    const container = document.getElementById('menu-items-container');
    
    if (!container) return;
    
    if (menuItems.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 20px;">No menu items yet. Add your first item above!</p>';
        return;
    }
    
    container.innerHTML = menuItems.map(item => `
        <div class="menu-item-row" data-id="${item.id}">
            <div class="item-image-thumb">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23ddd%22 width=%22100%22 height=%22100%22/%3E%3Ctext fill=%22%23999%22 x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22%3ENo Image%3C/text%3E%3C/svg%3E'">
            </div>
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>Category: ${item.category}</p>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p class="image-path">Image: ${item.image}</p>
            </div>
            <div class="item-actions">
                <button class="edit-btn" onclick="editItem(${item.id})">✏️ Edit</button>
                <button class="delete-btn" onclick="deleteItem(${item.id})">🗑️ Delete</button>
            </div>
        </div>
    `).join('');
}


function addMenuItem() {
    const name = document.getElementById('item-name').value;
    const price = parseFloat(document.getElementById('item-price').value);
    const image = document.getElementById('item-image').value;
    const category = document.getElementById('item-category').value;
    
    const menuItems = JSON.parse(localStorage.getItem('menuItems') || '[]');
    const newId = menuItems.length > 0 ? Math.max(...menuItems.map(item => item.id)) + 1 : 1;
    
    const newItem = {
        id: newId,
        name: name,
        price: price,
        image: image,
        category: category
    };
    
    menuItems.push(newItem);
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    
 
    document.getElementById('add-item-form').reset();
    
   
    loadMenuItems();
    
    alert(`✓ "${name}" has been added to the menu!`);
}


function editItem(id) {
    const menuItems = JSON.parse(localStorage.getItem('menuItems') || '[]');
    const item = menuItems.find(i => i.id === id);
    
    if (!item) return;
    
    document.getElementById('edit-item-id').value = item.id;
    document.getElementById('edit-item-name').value = item.name;
    document.getElementById('edit-item-price').value = item.price;
    document.getElementById('edit-item-image').value = item.image;
    document.getElementById('edit-item-category').value = item.category;
    
    document.getElementById('edit-modal').style.display = 'block';
}


function saveEditedItem() {
    const id = parseInt(document.getElementById('edit-item-id').value);
    const name = document.getElementById('edit-item-name').value;
    const price = parseFloat(document.getElementById('edit-item-price').value);
    const image = document.getElementById('edit-item-image').value;
    const category = document.getElementById('edit-item-category').value;
    
    const menuItems = JSON.parse(localStorage.getItem('menuItems') || '[]');
    const itemIndex = menuItems.findIndex(i => i.id === id);
    
    if (itemIndex !== -1) {
        menuItems[itemIndex] = {
            id: id,
            name: name,
            price: price,
            image: image,
            category: category
        };
        
        localStorage.setItem('menuItems', JSON.stringify(menuItems));
        document.getElementById('edit-modal').style.display = 'none';
        loadMenuItems();
        alert(`✓ "${name}" has been updated!`);
    }
}


function deleteItem(id) {
    const menuItems = JSON.parse(localStorage.getItem('menuItems') || '[]');
    const item = menuItems.find(i => i.id === id);
    
    if (!item) return;
    
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
        const updatedItems = menuItems.filter(i => i.id !== id);
        localStorage.setItem('menuItems', JSON.stringify(updatedItems));
        loadMenuItems();
        alert(`✓ "${item.name}" has been deleted from the menu.`);
    }
}
// chris code ^ //

//corinnes code
const managerLogoutBtn = document.getElementById('managerLogoutBtn');
if (managerLogoutBtn) {
    managerLogoutBtn.addEventListener('click', () => {
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('userEmail');
        window.location.href = 'main.html';
    });
}
// corinnes code ^