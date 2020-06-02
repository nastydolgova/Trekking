let PRODUCTS_NAMES = [
  "T-shirt",
  "Pants FORCLAZ",
  "backpack",
  "Pr4",
  "Pr5",
  "pr6",
];
let PRICES = [5, 30, 60, 5, 5, 5];
let IDS = [0, 1, 2, 3, 4, 5];
let IMG = [
  "/img/Livello_2.png",
  "/img/Livello_3.png",
  "/img/Livello_4.png",
  "/img/Livello_2.png",
  "/img/Livello_2.png",
  "/img/Livello_2.png",
];

let catalog = {
  items: [],
  container: ".men-items",
  cart: null,
  construct(cart) {
    this.cart = cart;
    this._init();
  },
  _init() {
    this._handleData();
    this.render();
    this._handleEvents();
  },
  _handleEvents() {
    document.querySelector(this.container).addEventListener("click", (evt) => {
      if (evt.target.name === "buy-btn") {
        this.cart.addProduct(evt.target);
      }
    });
  },
  _handleData() {
    for (let i = 0; i < IDS.length; i++) {
      this.items.push(this._createNewProduct(i));
    }
  },
  _createNewProduct(index) {
    return {
      product_name: PRODUCTS_NAMES[index],
      price: PRICES[index],
      id_product: IDS[index],
      product_img: IMG[index],
    };
  },
  render() {
    let str = "";
    this.items.forEach((item) => {
      str += `
            <div class="products-item">
            <form class="products-item-up">
                <select class="select-size" name="select">
                    <option selected>size</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                </select>
            <button class="product-item-btn" name="buy-btn"
            data-name="${item.product_name}"
            data-price="${item.price}"
            data-id="${item.id_product}">Add card</button>
            </form>
            <img src="${item.product_img}" alt="#" class="products-item-img">
            <div class="products-item-down">
                <a href="" class="item-name">${item.product_name}</a>
                <p class="item-price">${item.price}.00€</p>
            </div>
        </div>
            `;
    });
    document.querySelector(this.container).innerHTML = str;
  },
};

let cart = {
  items: [],
  total: 0,
  sum: 0,
  container: ".cart-block",
  quantityBlock: document.querySelector("#quantity"),
  priceBlock: document.querySelector("#price"),
  construct() {
    this._init();
  },
  _init() {
    this._handleEvents();
  },
  _handleEvents() {
    document.querySelector(this.container).addEventListener("click", (evt) => {
      if (evt.target.name === "del-btn") {
        this.deleteProduct(evt.target);
      }
    });
  },
  addProduct(product) {
    let id = product.dataset["id"];
    let find = this.items.find((product) => product.id_product === id);
    if (find) {
      find.quantity++;
    } else {
      let prod = this._createNewProduct(product);
      this.items.push(prod);
    }

    this._checkTotalAndSum();
    this.render();
  },
  _createNewProduct(prod) {
    return {
      product_name: prod.dataset["name"],
      price: prod.dataset["price"],
      id_product: prod.dataset["id"],
      quantity: 1,
    };
  },
  deleteProduct(product) {
    let id = product.dataset["id"];
    let find = this.items.find((product) => product.id_product === id);
    if (find.quantity > 1) {
      find.quantity--;
    } else {
      this.items.splice(this.items.indexOf(find), 1);
    }

    this._checkTotalAndSum();
    this.render();
  },

  _checkTotalAndSum() {
    let qua = 0;
    let pr = 0;
    this.items.forEach((item) => {
      qua += item.quantity;
      pr += item.price * item.quantity;
    });
    this.total = qua;
    this.sum = pr;
  },
  render() {
    let itemsBlock = document
      .querySelector(this.container)
      .querySelector(".cart-items");
    let str = "";
    this.items.forEach((item) => {
      str += `<div class="cart-item" data-id="${item.id_product}">
                        <span class="cart-item-name">${item.product_name}</span>
                        <span class="cart-item-quantity">${item.quantity}</span>
                       <span class="cart-item-price">${item.price},00€</span>
                        <button name="del-btn" class="cart-item-btn" data-id="${item.id_product}">Х</button>
                </div>`;
    });
    itemsBlock.innerHTML = str;
    this.quantityBlock.innerText = this.total;
    this.priceBlock.innerText = this.sum;
  },
};

catalog.construct(cart);
cart.construct();
