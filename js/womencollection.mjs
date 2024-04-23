 
 import { URL } from "./constants.mjs";
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

const displayWomenProducts = async () => {
    try {
        showLoadingIndicator();
        products = await fetchProducts(URL);
        const productContainer = document.querySelector('.products');

        products.forEach(product => {
            if (product.gender.toLowerCase() === 'female') {
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

function showLoadingIndicator() {
    const loadingIndicator = document.querySelector('.loading');
    loadingIndicator.classList.add('show');
}
function hideLoadingIndicator() {
    const loadingIndicator = document.querySelector('.loading');
    loadingIndicator.classList.remove('show');
}

document.addEventListener('DOMContentLoaded', () => {
    displayWomenProducts();
});

