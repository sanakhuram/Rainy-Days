import { URL } from "./constants.mjs";
import { fetchData, showLoadingIndicator, hideLoadingIndicator, updateCartCount } from './utils.mjs';

let products = [];

const displayMenProducts = async () => {
    try {
        showLoadingIndicator();

        products = await fetchData(URL);
        const productContainer = document.querySelector('.products');

        products.forEach(product => {
            if (product.gender.toLowerCase() === 'male') {
                product.quantity = 1;
                productContainer.innerHTML +=
                    `
                    <div class="product" data-product-id="${product.id}">
                        <h2>${product.title}</h2>
                        <p>${product.description}</p>
                        <a href="../product/index.html?id=${product.id}">
                            <img src="${product.image}" alt="${product.title}">
                        </a>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                    </div>
                    `;
            }
        });

        hideLoadingIndicator();
    } catch (error) {
        console.error(error);
        hideLoadingIndicator();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showLoadingIndicator();
    setTimeout(displayMenProducts, 1000);
});

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});


