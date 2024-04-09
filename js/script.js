const URL = 'https://api.noroff.dev/api/v1/rainy-days';
let products = [];
let cartArray = [];

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
            product.quantity = 1;
            productContainer.innerHTML +=
                `
                <div class="product" data-product-id="${product.id}">
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <a href="product/index.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.title}">
                </a>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart-button" data-product-id="${product.id}">Add to Cart</button>
                </div>
                `;
        });
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    
    const productsContainer = document.querySelector('.products');
    const cartCount = document.querySelector(".cart-count");
    
    productsContainer.addEventListener('click', (event) => {
        const addToCartButton = event.target.closest('.add-to-cart-button');
        if (addToCartButton) {
            const productId = addToCartButton.dataset.productId;
            const selectedProduct = products.find(product => product.id === productId);
            cartArray.push(selectedProduct);
            updateCartCounter(cartArray.length);
            localStorage.setItem('cart', JSON.stringify(cartArray));
            
         
            cartCount.classList.add('cart-count-added');
            setTimeout(() => {
                cartCount.classList.remove('cart-count-added');
            }, 1000); 
        }
    });
});

function updateCartCounter(count) {
    const cartCounter = document.querySelector(".cart-count");
    cartCounter.innerHTML = `<a href="basket/cart/index.html">CART(${count})</a>`;

    cartCounter.textContent = `CART(${count})`;
}
