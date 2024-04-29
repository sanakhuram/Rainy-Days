import { URL } from './constants.mjs';
import { fetchData, showLoadingIndicator, hideLoadingIndicator, updateCartCount } from './utils.mjs';

let products = [];

const displayProducts = async () => {
    try {
        showLoadingIndicator();

        const data = await fetchData(URL);
        products = data;
        const productContainer = document.querySelector('.products');

        products.forEach(product => {
            productContainer.innerHTML +=
                `
                <div class="product" data-product-id="${product.id}">
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <a href="product/index.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.title}">
                    </a>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                </div>
                `;
        });

        hideLoadingIndicator();
    } catch (error) {
        console.error(error);
        hideLoadingIndicator();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showLoadingIndicator();
    setTimeout(displayProducts, 2000);

    updateCartCount();
});

window.addEventListener('storage', (event) => {
    if (event.key === 'cart') {
        updateCartCount();
    }
});
