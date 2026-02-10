console.log("hello !");

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


function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

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




window.onload = function () {
    localStorage.removeItem("cart"); // testing ekata
    updateOrderPanel();
}

function printBill() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    let total = 0;
    let billContent = `
        <h2 style="text-align:center;">MOS Burgers</h2>
        <hr>
    `;

    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;

        billContent += `
            <p>
                ${item.name} <br>
                ${item.qty} x Rs ${item.price} 
                <span style="float:right;">
                    Rs ${itemTotal.toFixed(2)}
                </span>
            </p>
        `;
    });

    billContent += `
        <hr>
        <h3>Total: Rs ${total.toFixed(2)}</h3>
        <p style="text-align:center;">Thank You Come Again!</p>
    `;

    // Open new window for printing
    let printWindow = window.open('', '', 'width=400,height=600');

    printWindow.document.write(`
        <html>
        <head>
            <title>Print Bill</title>
        </head>
        <body style="font-family:monospace;">
            ${billContent}
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.print();

    // Optional: Clear cart after printing
    localStorage.removeItem("cart");
    updateOrderPanel();
}

