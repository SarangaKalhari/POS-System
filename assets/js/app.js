console.log("hello !")

let arrayList = JSON.parse(localStorage.getItem("cart")) || [];

// Called when BUY NOW is clicked
function getItem(button) {
    let container = button.closest(".item-box");

    let title = container.getElementsByClassName("item-title")[0].textContent;
    let price = container.getElementsByClassName("price")[0].textContent;

    const data = { title, price };

    arrayList.push(data);
    localStorage.setItem("cart", JSON.stringify(arrayList));

    console.log("Added to cart:", data);
    alert(`${title} added to cart!`);
}



// Show cart (only on cart.html)
window.onload = function () {
    if (window.location.pathname.includes("cart.html")) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const list = document.getElementById("cart-items");
        const totalContainer = document.getElementById("total-price");

        let total = 0;

        if (cart.length === 0) {
            list.innerHTML = "<li>Your cart is empty.</li>";
            totalContainer.textContent = "Total: $0.00";
        } else {
            cart.forEach(item => {
                const li = document.createElement("li");
                li.textContent = `${item.title} - ${item.price}`;
                list.appendChild(li);

                // Extract number from price string like "$70.00"
                let numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, ""));
                total += numericPrice;
            });

            totalContainer.textContent = `Total: $${total.toFixed(2)}`;
        }
    }
};