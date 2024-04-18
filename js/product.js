const url = document.location;
const search = url.search;
const params = new URLSearchParams(search);

async function fetchSingleProduct(id) {
    if (!id) throw new Error("Product ID is undefined");
    const productUrl = `https://api.noroff.dev/api/v1/rainy-days/${id}`;
  
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
        productDetails.innerHTML = `
            <div class="product-image">
                <img src="${singleData.image}" alt="${singleData.title}">
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

function addToCart(product) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ 
            id: product.id, 
            title: product.title, 
            image: product.image, 
            price: product.price, 
            quantity: 1 
        });
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartCount();
}
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let currentCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = `CART(${currentCount})`;

    const dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.innerHTML = '';

    cartItems.forEach(item => {
        const cartItemDiv = document.createElement('div');

        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.title;
        image.style.width = '70px'
        image.style.borderRadius='0 10px'
        cartItemDiv.appendChild(image);
        const textNode = document.createTextNode(`${item.title} - Quantity: ${item.quantity}`);
        cartItemDiv.appendChild(textNode);

        dropdownContent.appendChild(cartItemDiv);
    });

    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalDiv = document.createElement('div');
    totalDiv.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    dropdownContent.appendChild(totalDiv);
}


