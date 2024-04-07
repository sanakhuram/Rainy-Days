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

const displayMenProducts = async () => {
    try {
        products = await fetchProducts(URL);
        const productContainer = document.querySelector('.products');

        products.forEach(product => {
            if (product.gender.toLowerCase() === 'male') { // Filter only men's products
                product.quantity = 1;
                productContainer.innerHTML +=
                    `
                    <div class="product" data-product-id="${product.id}">
                        <h2>${product.title}</h2>
                        <p>${product.description}</p>
                        <a href="/product/index.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.title}">
                    </a>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                    </div>
                    `;
            }
        });
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayMenProducts();
});

function updateCartCounter(count) {
    const cartCounter = document.querySelector(".cart-count");
    cartCounter.innerHTML = `<a href="basket/cart/index.html">CART(${count})</a>`;

    cartCounter.textContent = `CART(${count})`;
}
