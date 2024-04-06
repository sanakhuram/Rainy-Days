const url = document.location;
console.log({ url });
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
                ${singleData.onSale ? `<p><strong>Discounted Price:</strong> $${singleData.discountedPrice.toFixed(2)}</p>` : ''}
            </div>
        `;
    } catch (error) {
        console.error(error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    renderSingleProduct();
});
