let cart = {};
let allItems = [];
let totalCost;

function loadData() {
  fetch('data.json')
    .then( response => response.json() )
    .then( data => {
      allItems = data;
      const container = document.querySelector('.desserts-container');
      container.innerHTML = '';
      
      data.forEach(dessert => {
        container.innerHTML += 
          `<div class="dessert" id='${dessert.name}'>
  
            <div class="image-container">
              <img src="${dessert.image.mobile}" alt="${dessert.category}" class="image">
              <div class="add-to-cart" id='${dessert.name}'>
                <button class="add-to-cart-btn" onclick='addToCart("${dessert.name}")'>
                  <img src="./assets/images/icon-add-to-cart.svg" alt="cart" class="add-to-cart-image">
                  <p>Add to Cart</p>
                </button>
              </div>
            </div>
  
            <div class="dessert-details">
              <p class="category">${dessert.category}</p>
              <p class="name">${dessert.name}</p>
              <p class="price">$${dessert.price}</p>
            </div>
  
          </div>`
      });
    })
}


function addToCart(itemName) {
  console.log('added');
  cart[itemName] = 1;
  updateButton(itemName);
  renderCart();
}

function minus(itemName) {
  cart[itemName]--;
  if ( cart[itemName] <= 0) {
    delete cart[itemName];
    updateButton(itemName);
    renderCart();
    return;
  }
  updateButton(itemName);
  // const q = document.getElementById('quantity');
  // q.innerText = cart[itemName];
  renderCart();
}

function plus(itemName) {
  cart[itemName]++;
  updateButton(itemName);
  // const q = document.getElementById('quantity');
  // q.innerText = cart[itemName];
  renderCart();
}

function renderCart() {
    if ( Object.keys(cart).length === 0 ){
      renderEmptyCart();
      return;
    }

  const cntr = document.querySelector('.cart-items');
  cntr.innerHTML = '';

   const emptyCntr = document.querySelector('.empty-cart');
   emptyCntr.innerHTML = '';

  for ( let i in cart ) {
    const count = cart[i];
    const item = allItems.find( item => item.name === i );

    calcTotal();

    cntr.innerHTML += 
        `<div class="cart-item">
            <!--Item detaisl-->
            <div class="details">
              <p id="name">${item.name}</p>
              <div class="calculation-div">
                <p class="count"><span id="count">${count}</span>x</p>
                <p class="price-in-cart">@$<span id="price">${item.price}</span></p>
                <p class="sub-price">$<span id="sub-price">${count * item.price}</span></p>
              </div>
            </div>
            <!--Clear button-->
            <div class="clear">
              <button class="clear-btn" onclick="clearItem('${item.name}')">
                <img src="./assets/images/icon-remove-item.svg" alt="remove">
              </button>
            </div>
          </div>`;
  }
  const amountDetails = document.querySelector('.amount-details');
  amountDetails.innerHTML = '';

  amountDetails.innerHTML += 
        `<div class="order-total">
            <p>Order Total</p>
            <p id="totalCost">$<span>${totalCost}</span></p>
          </div>
          <!--Carbon Neutral-->
          <div class="carbon-neutral">
            <img src="./assets/images/icon-carbon-neutral.svg" alt="tree">
            <p>This is a <span class='carb-neu-font'>carbon-neutral</span> delivery</p>
          </div>
          <!--Confirm Button-->
          <div class="confirm-order">
            <button class="confirm-order-btn" onclick="order()">
              <p>Confirm Order</p>
            </button>
          </div>`;
}

function order() {
  document.querySelector('.order-confirmed').style.display = 'flex';
  const cntr = document.querySelector('.order-details');
  cntr.innerHTML = '';

  for ( let i in cart ) {
    const count = cart[i];
    const item = allItems.find( item => item.name === i );

    calcTotal();

    cntr.innerHTML += 
        `<div class="cart-item">
            <!--Item detaisl-->
            <div class="details">
              <p id="name">${item.name}</p>
              <div class="calculation-div">
                <p class="count"><span id="count">${count}</span>x</p>
                <p class="price-in-cart">@$<span id="price">${item.price}</span></p>
                <p class="sub-price">$<span id="sub-price">${count * item.price}</span></p>
              </div>
            </div>
          </div>`;
  }
  const orderTotal = document.querySelector('.confirm-order-total');

    orderTotal.innerHTML += 
        `<div class="order-total">
            <p>Order Total</p>
            <p id="totalCost">$<span>${totalCost}</span></p>
          </div>`;
}
function startNewOrder() {
  document.querySelector('.order-confirmed').style.display = 'none';
  cart = {};
  loadData();
  renderCart();
}

function renderEmptyCart(){
 const cntr = document.querySelector('.empty-cart');
 cntr.innerHTML = 
    `<div class="empty-cart">
      <img src="./assets/images/illustration-empty-cart.svg" alt="empty" >
      <p>Your added items will appear here</p>
    </div>`;

  const cartCntr = document.querySelector('.cart-items');
  cartCntr.innerHTML = '';

  const amountCntr = document.querySelector('.amount-details');
  amountCntr.innerHTML = '';
}

function calcTotal(){
  totalCost = 0;
  for ( let i in cart ) {
    const item = allItems.find( item => item.name === i );
    totalCost += cart[i]*item.price;
  }
}

function clearItem(itemName) {
  delete cart[itemName];
  updateButton(itemName);
  renderCart();
}

function updateButton(itemName) {
  const btn = document.getElementById(itemName).querySelector('.add-to-cart');

  if ( cart[itemName] ) {
    const cntr = document.getElementById(itemName);
    const imgCntr = cntr.querySelector('.image');
    imgCntr.style.border = '2px solid hsl(14, 86%, 42%)';

    btn.innerHTML = 
    `<div class="control-btn">
        <button class="control" onclick="minus('${itemName}')">
          <img src="./assets/images/icon-decrement-quantity.svg" alt="minus">
        </button>
        <p id="quantity" class="quantity">${cart[itemName]}</p>
        <button class="control" onclick="plus('${itemName}')">
          <img src="./assets/images/icon-increment-quantity.svg" alt="plus">
        </button>
      </div>`;
  }
  else {
    const cntr = document.getElementById(itemName);
    const imgCntr = cntr.querySelector('.image');
    imgCntr.style.border = 'none';
    btn.innerHTML = 
      `<button class="add-to-cart-btn" onclick='addToCart("${itemName}")'>
        <img src="./assets/images/icon-add-to-cart.svg" alt="cart" class="add-to-cart-image">
        <p>Add to Cart</p>
      </button>`;
  }
}

loadData();
renderCart();