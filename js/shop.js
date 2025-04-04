let addButtons = document.querySelectorAll(".add-button"); // Select all "Add" buttons

addButtons.forEach(button => {
    button.addEventListener("click", function () {
        addToCart(button); // Call addToCart function when clicked
    });
});

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || {}; // Retrieve stored items
let totalprice = parseFloat(localStorage.getItem("totalprice")) || 0; // Retrieve total price

updateCart(); // Ensure cart is loaded on page refresh

function addToCart(button) {
    let productElement = button.parentElement; // Select the div
    let itemName = productElement.dataset.name; // Product name
    let itemprice = parseFloat(productElement.dataset.price); // Get price

    if (cart[itemName]) {
        cart[itemName].quantity += 1; // If item already in the cart
    } else {
        cart[itemName] = { price: itemprice, quantity: 1 }; // Add new ones
    }

    updateCart(); // Update cart and save to localStorage
}

function updateCart() {
    let cartTable = document.getElementById('cart'); // Table body
    cartTable.innerHTML = ""; // Clear old items
    totalprice = 0; // Reset total price

    Object.keys(cart).forEach(itemName => { 
        let item = cart[itemName];
        totalprice += item.price * item.quantity; // Calculate total price
        
        let row = `<tr>
                    <td>${itemName}</td>
                    <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${itemName}', this.value)"></td>
                    <td>RS. ${item.price * item.quantity}</td>
                    <td><button onclick="removeItem('${itemName}')">Remove</button></td>
                   </tr>`;
        cartTable.innerHTML += row; // Append row to cart table
    });

    document.getElementById('totalprice').innerText = totalprice; // Update total price display

    // ** Store cart and total price in localStorage to persist after refresh **
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("totalprice", totalprice);
}

function updateQuantity(itemName, newQuantity) {
    newQuantity = parseInt(newQuantity);
    if (newQuantity > 0) {
        cart[itemName].quantity = newQuantity; // Update quantity
        updateCart(); // Refresh cart
    } else {
        removeItem(itemName); // Remove item if quantity is 0
        alert("Invalid input");
    }
}

function removeItem(itemName) {
    delete cart[itemName]; // Remove item from cart
    updateCart(); // Refresh cart
}

let btn2 = document.getElementById("b2");

// Checkout function
function checkout() {
    if (totalprice === 0) {
        alert("Your cart is empty!");
        return;
    } else {
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("totalprice", totalprice);
        window.location.href = "./checkout.html";
    }       
}

btn2.addEventListener("click", checkout);

// ** Save as Favorite **
function saveFavoriteOrder() {
    if (totalprice === 0) {
        alert("Your cart is empty! Add items before saving as favorite.");
        return;
    } else {
        localStorage.setItem("favoriteOrder", JSON.stringify(cart));
        alert("Favorite order saved successfully!");
    }   
}

document.getElementById("b1").addEventListener("click", saveFavoriteOrder);

// ** Apply Favorite Order **
function loadFavoriteOrder() {
    let favoriteOrder = localStorage.getItem("favoriteOrder");
    if (favoriteOrder) {
        cart = JSON.parse(favoriteOrder);
        updateCart();
    } else {
        alert("No favorite order found. Please save one first.");
    }
}

document.getElementById("b3").addEventListener("click", loadFavoriteOrder);
