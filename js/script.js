const URL = 'https://api.noroff.dev/api/v1/rainy-days';


let products = []; // Declare products array globally
let cartArray = []; // Declare cartArray globally

const fetchProducts = async (url) => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.error(error);
    }
}

const displayProducts = async () => {
    try {
        products = await fetchProducts(URL);
        const productContainer = document.querySelector('.products');

        products.forEach(product => {
            product.quantity = 1; // Initialize quantity property
            productContainer.innerHTML +=
                `
                <div class="product">
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <img src="${product.image}" alt="${product.title}">
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="product-button" data-product="${product.id}">Add to Cart</button>
                </div>
                `;
        });
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('product-button')) {
            const productId = event.target.dataset.product;
            const selectedProduct = products.find(product => product.id === productId);
            cartArray.push(selectedProduct); 
            showCart(cartArray); 
            updateCartCounter(cartArray.length);
        } else if (event.target.classList.contains('add-button')) {
            const productId = event.target.dataset.product;
            const cartItem = cartArray.find(item => item.id === productId);
            if (cartItem) {
                cartItem.quantity++;
                showCart(cartArray);
            }
        } else if (event.target.classList.contains('subtract-button')) {
            const productId = event.target.dataset.product;
            const cartItem = cartArray.find(item => item.id === productId);
            if (cartItem && cartItem.quantity > 1) {
                cartItem.quantity--;
                showCart(cartArray);
            }
        }
    });
});

function showCart(cartItems) {
    const cart = document.querySelector(".cart");
    const cartList = document.querySelector(".cart-list");
    const totalContainer = document.querySelector(".total");
    
    cart.style.display = "block";
    cartList.innerHTML = "";
    let total = 0;
    
    cartItems.forEach(function (cartElement) {
        cartList.innerHTML +=
            `
            <div class="cart-item">
                <h4>${cartElement.title}</h4>
                <img src="${cartElement.image}" alt="${cartElement.title}">
                <div>
                    <button class="subtract-button" data-product="${cartElement.id}">-</button>
                    <span>${cartElement.quantity}</span>
                    <button class="add-button" data-product="${cartElement.id}">+</button>
                </div>
            </div>
            `;
        total += cartElement.price * cartElement.quantity; // Update total based on quantity
    });
    totalContainer.innerHTML = `Total: $${total.toFixed(2)}`;
}

function updateCartCounter(count) {
    const cartCounter = document.querySelector(".cart-count");
    cartCounter.textContent = `CART(${count})`;
}

