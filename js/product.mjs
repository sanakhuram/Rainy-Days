import { URL } from "./constants.mjs";

const url = document.location;
const search = url.search;
const params = new URLSearchParams(search);

async function fetchSingleProduct(id) {
    if (!id) throw new Error("Product ID is undefined");
    const productUrl = `${URL}/${id}`;
  
    try {
        const response = await fetch(productUrl);
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

async function renderSingleProduct() {
    try {
        const id = params.get('id');
        const singleData = await fetchSingleProduct(id);
        const productDetails = document.getElementById("product-details");

        if (!singleData) {
            productDetails.innerHTML = '<p>Product not found.</p>';
            return;
        }

        productDetails.innerHTML = `
            <div class="product-image">
                <img src="${singleData.image}" alt="${singleData.title}" loading="lazy">
            </div>
            <div class="product-info">
                <h2>${singleData.title}</h2>
                <p>${singleData.description}</p>
                <p><strong>Gender:</strong> ${singleData.gender}</p>
                <p><strong>Available Sizes:</strong> ${singleData.sizes.join(', ')}</p>
                <p><strong>Base Color:</strong> ${singleData.baseColor}</p>
                <p><strong>Price:</strong> $${singleData.price.toFixed(2)}</p>
                <p><strong style=color:red;>Discounted Price:</strong> $${singleData.discountedPrice.toFixed(2)}</p>
                <button class="add-to-cart-button" data-product-id="${singleData.id}" data-title="${singleData.title}" data-image="${singleData.image}" data-price="${singleData.price.toFixed(2)}">Add to Cart</button>
            </div>
        `;

        const addToCartButton = document.querySelector('.add-to-cart-button');
        addToCartButton.addEventListener('click', addToCartClicked);
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderSingleProduct();
});

function addToCartClicked(event) {
    const { target: button } = event;
    const { productId, title, image, price } = button.dataset;
    addToCart(productId, title, image, price);
    updateCartCount();
}

function addToCart(productId, title, image, price) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ id: productId, title, image, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
}

function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    const cartDropdown = document.querySelector('.cart-dropdown .dropdown-content');

    if (!cartCountElement || !cartDropdown) return;

    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    cartDropdown.innerHTML = '';

    cartItems.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <div>
                <img src="${item.image}" alt="${item.title}" style="width: 70px; border-radius: 0 10px 10px 0;">
            </div>
            <div class="item-info">
                <p style="font-size: 14px;">${item.title}</p>
                <p style="font-size: 12px;">Quantity: ${item.quantity}</p>
            </div>
        `;
        cartDropdown.appendChild(cartItemDiv);
        
        totalPrice += item.price * item.quantity; 
    });

    cartCountElement.textContent = `CART(${cartItems.reduce((total, item) => total + item.quantity, 0)})`;

    const totalDiv = document.createElement('div');
    totalDiv.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    cartDropdown.appendChild(totalDiv);
}

document.addEventListener('DOMContentLoaded', updateCartCount);
