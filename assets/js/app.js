console.log("hello !")

// localStorage.clear();


function increaseQty(btn) {
    let qtySpan = btn.parentElement.querySelector(".qty");
    let qty = parseInt(qtySpan.innerText);
    qtySpan.innerText = qty + 1;
}

function decreaseQty(btn) {
    let qtySpan = btn.parentElement.querySelector(".qty");
    let qty = parseInt(qtySpan.innerText);

    if (qty > 1) {
        qtySpan.innerText = qty - 1;
    }
}

function changeQty(index, amount) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].qty += amount;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateOrderPanel();
}


function addToCart(btn) {

    const card = btn.closest(".card");

    const name = card.querySelector(".item-name").innerText;
    const price = parseFloat(card.querySelector(".price").innerText);
    const qty = parseInt(card.querySelector(".qty").innerText);
const image = card.querySelector("img").src;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.qty += qty;
    } else {
        cart.push({
            name: name,
            price: price,
            qty: qty,
            image: image
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    console.log(cart);

    updateOrderPanel();
}

function updateOrderPanel() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const orderContainer = document.getElementById("orderItems");
    const totalElement = document.getElementById("total");

    orderContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.qty;
        total += itemTotal;

        orderContainer.innerHTML += `
            <div class="d-flex justify-content-between align-items-start border-bottom py-2">

                <!-- LEFT SIDE -->
                <div class="d-flex align-items-center gap-2">

                    <img src="${item.image}" 
                         width="60" 
                         height="60"
                         style="object-fit: cover; border-radius: 5px;">

                    <div>
                        <div>${item.name}</div>

                        <div class="d-flex align-items-center gap-2 mt-1">
                            <button class="btn btn-sm btn-outline-secondary"
                                onclick="changeQty(${index}, -1)">−</button>

                            <span>${item.qty}</span>

                            <button class="btn btn-sm btn-outline-secondary"
                                onclick="changeQty(${index}, 1)">+</button>
                        </div>
                    </div>

                </div>

                <!-- RIGHT SIDE -->
                <div class="text-end">

                    <button class="btn btn-sm btn btn-outline-danger mb-1"
                        onclick="removeItem(${index})">
                        ❌ 
                    </button>

                    <div>
                        Rs ${itemTotal.toFixed(2)}
                    </div>

                </div>

            </div>
        `;
    });

    totalElement.innerText = total.toFixed(2);
}


function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateOrderPanel();
}


window.onload = function () {
    updateOrderPanel();
}



