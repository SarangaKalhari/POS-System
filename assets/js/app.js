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

    
}


// let arrayList = JSON.parse(localStorage.getItem("cart")) || [];

// // Called when BUY NOW is clicked
// function getItem(button) {
//     let container = button.closest(".item-box");

//     let title = container.getElementsByClassName("item-title")[0].textContent;
//     let price = container.getElementsByClassName("price")[0].textContent;

//     const data = { title, price };

//     arrayList.push(data);
//     localStorage.setItem("cart", JSON.stringify(arrayList));

//     console.log("Added to cart:", data);
//     alert(`${title} added to cart!`);
// }



// // Show cart (only on cart.html)
// window.onload = function () {
//     if (window.location.pathname.includes("cart.html")) {
//         const cart = JSON.parse(localStorage.getItem("cart")) || [];
        
//         // const isSelected=document.getElementById("cart-select") ;
//         const list = document.getElementById("cart-items");
//         const totalContainer = document.getElementById("total-price");

//         // let total = 0;

//         if (cart.length === 0 ) {
//             list.innerHTML = "<li>Your cart is empty.</li>";
//             totalContainer.textContent = "Total: $0.00";
//         } else {
//             cart.forEach(item => {
//                 const li = document.createElement("li");

//                 const checkbox=document.createElement("input");
//                 checkbox.type="checkbox";
//                 checkbox.className = "cart-check";
//                 checkbox.dataset.price = item.price;

//                 checkbox.addEventListener("change",calculateSelectedTotal);

//                 li.appendChild(checkbox);

//                 const text = document.createTextNode(`${item.title} - ${item.price}`);
//                 li.appendChild(text);

                
//                 list.appendChild(li);

//                 // Extract number from price string like "$70.00"
                
//             });

//             // totalContainer.textContent = `Total: $${total.toFixed(2)}`;
//         }
//     }
// };

// function calculateSelectedTotal() {
//     const checkboxes= document.querySelectorAll(".cart-check");
//     let total = 0;

//     checkboxes.forEach(cb => {
//         if(cb.checked){
//             let numericPrice = parseFloat(cb.dataset.price.replace(/[^0-9.]/g, ""));
//             total += numericPrice;
//         }
//     });
//     document.getElementById("total-price").textContent = `Total: $${total.toFixed(2)}`;
// }

