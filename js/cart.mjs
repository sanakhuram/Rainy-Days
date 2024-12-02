document.addEventListener("DOMContentLoaded", () => {
    const cartList = document.querySelector(".cart-list");
    const totalContainer = document.querySelector(".total");
    const loadingIndicator = document.querySelector(".loading");
    const checkoutButton = document.querySelector(".checkout-button");

    let cartArray = [];
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
        cartArray = JSON.parse(storedCart);
        showCart(cartArray);
    }

    function showCart(cartItems) {
        cartList.innerHTML = "";
        let total = 0;

        loadingIndicator.classList.add("show");

        cartItems.forEach(function (cartElement) {
            cartList.innerHTML += `
                <div class="cart-item">
                    <h4>${cartElement.title}</h4>
                    <img src="${cartElement.image}" alt="${cartElement.title}">
                    <div class="quantity-buttons">
                        <button class="remove-button" data-product="${cartElement.id}">Remove</button>
                        <button class="decrement-button" data-product="${cartElement.id}">-</button>
                        <span>${cartElement.quantity}</span>
                        <button class="increment-button" data-product="${cartElement.id}">+</button>
                    </div>
                </div>
            `;
            total += parseFloat(cartElement.price) * cartElement.quantity;
        });

        totalContainer.innerHTML = `Total: $${total.toFixed(2)}`;
        loadingIndicator.classList.remove("show");
    }

    function adjustCartItemQuantity(productId, change) {
        const cartItem = cartArray.find((item) => item.id === productId);

        if (cartItem) {
            cartItem.quantity += change;
            if (cartItem.quantity <= 0) {
                cartArray = cartArray.filter((item) => item.id !== productId);
            }
            localStorage.setItem("cart", JSON.stringify(cartArray));
            showCart(cartArray);
        }
    }

    function removeCartItem(productId) {
        cartArray = cartArray.filter((item) => item.id !== productId);
        localStorage.setItem("cart", JSON.stringify(cartArray));
        showCart(cartArray);
    }

    document.addEventListener("click", (event) => {
        const targetClassList = event.target.classList;
        const productId = event.target.dataset.product;

        if (targetClassList.contains("increment-button")) {
            adjustCartItemQuantity(productId, 1);
        } else if (targetClassList.contains("decrement-button")) {
            adjustCartItemQuantity(productId, -1);
        } else if (targetClassList.contains("remove-button")) {
            removeCartItem(productId);
        } else if (event.target === checkoutButton) {
            alert("Your order is being processed.");
            localStorage.removeItem("cart");
            showCart([]);
        }
    });
});
