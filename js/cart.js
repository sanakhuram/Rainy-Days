document.addEventListener('DOMContentLoaded', () => {
    const cartList = document.querySelector('.cart-list');
    const totalContainer = document.querySelector('.total');
    
    // Retrieve cart items from local storage
    let cartArray = []; // Define cartArray here
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cartArray = JSON.parse(storedCart);
        showCart(cartArray);
    }

    function showCart(cartItems) {
        cartList.innerHTML = "";
        let total = 0;

        cartItems.forEach(function (cartElement) {
            cartList.innerHTML +=
                `
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
            total += cartElement.price * cartElement.quantity;
        });
        totalContainer.innerHTML = `Total: $${total.toFixed(2)}`;
    }

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('increment-button')) {
            const productId = event.target.dataset.product;
            const cartItem = cartArray.find(item => item.id === productId);
            if (cartItem) {
                cartItem.quantity++;
                showCart(cartArray);
                localStorage.setItem('cart', JSON.stringify(cartArray));
            }
        } else if (event.target.classList.contains('decrement-button')) {
            const productId = event.target.dataset.product;
            const cartItem = cartArray.find(item => item.id === productId);
            if (cartItem && cartItem.quantity > 1) {
                cartItem.quantity--;
                showCart(cartArray);
                localStorage.setItem('cart', JSON.stringify(cartArray));
            }
        } else if (event.target.classList.contains('remove-button')) {
            const productId = event.target.dataset.product;
            const cartItemIndex = cartArray.findIndex(item => item.id === productId);
            if (cartItemIndex !== -1) {
                cartArray.splice(cartItemIndex, 1);
                showCart(cartArray);
                localStorage.setItem('cart', JSON.stringify(cartArray));
            }
        }
    });
});
