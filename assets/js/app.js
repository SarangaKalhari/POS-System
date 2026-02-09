console.log("hello !")

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

function addToCart(btn) {

    const card = btn.closest(".card");

    const name = document.getElementById("item-name");
    const price = parseFloat(document.getElementById("item-price"));
    const qty = parseInt(document.getElementById("item-qty"));
    const image = document.getElementById("item-image");

        console.log(name, price, qty, image)

    


    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item already exists
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
    
}


