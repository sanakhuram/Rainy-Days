import { URL } from './constants.mjs';
import { fetchData, showLoadingIndicator, hideLoadingIndicator, updateCartCount } from './utils.mjs';

let products = [];

const displayProducts = async () => {
    try {
        showLoadingIndicator();

        const data = await fetchData(URL);
        products = data;
        renderProducts(products);

        hideLoadingIndicator();
    } catch (error) {
        console.error(error);
        hideLoadingIndicator();
    }
}

const renderProducts = (productsToRender) => {
    const productContainer = document.querySelector('.products');
    productContainer.innerHTML = "";

    productsToRender.forEach(product => {
        productContainer.innerHTML += `
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
}

const filteredProducts = (gender) => {
    console.log("Filter Value:", gender);
    const filtered = products.filter(product => {
        return gender === "all" || product.gender.toLowerCase() === gender;
    });
    console.log("Filtered Products:", filtered.length);
    renderProducts(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
    showLoadingIndicator();
    displayProducts();  

    updateCartCount();
    
    const filterButtons = document.querySelectorAll(".filter-button");
    
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            const filterValue = this.dataset.filter;
            filteredProducts(filterValue);

            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
        });
    });
});
