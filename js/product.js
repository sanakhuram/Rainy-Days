
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
                <button class="add-to-cart-button" data-product-id="${singleData.id}">Add to Cart</button>
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
    const button = event.target;
    const productId = button.dataset.productId;
    addToCart(productId)
    updateCartCount();
}
function addToCart(productId) {

    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItemIndex = cartItems.findIndex(item => item.id === productId);
    if (existingItemIndex !== -1) {

        cartItems[existingItemIndex].quantity++;
    } else {

        cartItems.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
}


function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    let currentCount = parseInt(cartCountElement.textContent.match(/\d+/)[0]);
    currentCount++;
    cartCountElement.textContent = `CART(${currentCount})`;
}
