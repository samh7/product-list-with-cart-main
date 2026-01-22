const cart = document.querySelector(".main-container .cart")

const list = [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 122, 12, 12, 12, 12, 21,]

list.forEach(_ => {
  const cartItem = document.createElement("DIV")
  cartItem.innerHTML = createCartItem("Classic Tiramisu", "6.50", "4")
  cartItem.classList.add("cart-contents")

  cart.querySelector(".cart-items").appendChild(cartItem)
});



const removeItemsFromCart = document.querySelectorAll(".cart-contents .remove-item-from-cart")
const addToCartButtons = document.querySelectorAll(".add-to-cart")


removeItemsFromCart.forEach((item) => {

  item.addEventListener("click", () => {

    const cartItem = item.parentElement.parentElement.parentElement
    cartItem.parentElement.removeChild(cartItem)

  })

})

addToCartButtons.forEach((item) => {
  item.addEventListener("click", () => {
    const productContainer = item.parentElement.parentElement.parentElement.parentElement
    const productDescriptionConrainer = productContainer.querySelector(".description-container")
    const category = productDescriptionConrainer.querySelector(".category").innerHTML;
    const name = productDescriptionConrainer.querySelector(".name").innerHTML;
    const unitPrice = productDescriptionConrainer.querySelector(".price").innerText.split("$").join("")
    const cartItem = document.createElement("DIV")
    const currentCartContents = cart.querySelector(".cart-items .cart-item-price")
    let hasName = false;

    const cartItems = cart.querySelectorAll(".cart-contents")
    let matchedCartItem = null

    cartItems.forEach(cartItem => {
      const itemName = cartItem.querySelector(".name").innerText
      if (itemName === name) {
        matchedCartItem = cartItem
      }
    })

    if (matchedCartItem) {
      const qtyEl = matchedCartItem.querySelector(".item-selected-count")
      const totalEl = matchedCartItem.querySelector(".item-selected-total-price")

      let quantity = Number(qtyEl.innerText)
      quantity += 1

      qtyEl.innerText = quantity
      totalEl.innerText = (quantity * Number(unitPrice)).toFixed(2)
    } else {
      cartItem.innerHTML = createCartItem(name, unitPrice, "1")
      cartItem.classList.add("cart-contents")
      cart.querySelector(".cart-items").appendChild(cartItem)
    }



  })
})


function createCartItem(name, unitPrice, quantity) {
  let total = Number(unitPrice) * Number(quantity)
  return `
       <span class="name text-bold">${name}</span>
        <div class="cart-item-price">
          <div class="cart-item-price-left">
            <div class="items-selected-container">
              <span>
                <span class="item-selected-count">${quantity}</span>
                <span>X </span>
              </span>
              <span>
                <span>@</span>
                <span class="item-selected-unit-price">${unitPrice}</span>
              </span>
              <span>
                <span>$</span>
                <span class="item-selected-total-price">${total}</span>
              </span>
            </div>
          </div>
          <div class="cart-item-price-right">
            <img class="remove-item-from-cart" src="assets/images/icon-remove-item.svg" alt="">
          </div>
        </div>
      <hr/>
      `
}