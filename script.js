let products = {
    '0001':{
        name: 'Adidas Satan Shoes',
        price: '666',
        badge: 'New',
        wishlist: false
    },
    '0002':{
        name: 'Nike Jordan I',
        price: '300',
        badge: 'none',
        wishlist: false
    },
    '0003':{
        name: 'Under Armour Curry IV',
        price: '250',
        badge: 'New',
        wishlist: false
    },
    '0004':{
        name: 'Nike PG 5',
        price: '200',
        badge: 'Sale',
        wishlist: false
    },
    '0005':{
        name: 'The North Face Gucci shirt',
        price: '120',
        badge: 'New',
        wishlist: false
    },
    '0006':{
        name: 'Gucci Fake/Not jacket',
        price: '1400',
        badge: 'none',
        wishlist: false
    },
    '0007':{
        name: 'Under Armour hustle backpack',
        price: '60',
        badge: 'Sale',
        wishlist: false
    },
    '0008':{
        name: 'The North Face Men\'s Fine Alpine T-shirt',
        price: '50',
        badge: 'New',
        wishlist: false
    },
    '0009':{
        name: 'Nike Lebron XIII',
        price: '200',
        badge: 'none',
        wishlist: false
    },
    '0010':{
        name: 'Adidas Dame 6',
        price: '180',
        badge: 'none',
        wishlist: false
    }
}
let wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
document.querySelector('main').append(wrapper);
function showElements(obj){
    if (document.querySelector('.wrapper')){
        wrapper.innerHTML = '';
    }
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++){
        createProduct(obj[keys[i]].name,
            obj[keys[i]].price,
            obj[keys[i]].badge,
            keys[i],
            false);
    }
    for (const check of document.querySelectorAll('.wish')){
        check.addEventListener('change',wishList);
    }
}
let input = document.querySelector('.s-input');
let select = document.getElementById('showItemsSelect');

function productsByInput(obj,selectVal){
    selectVal = selectVal.toLowerCase();
    let newObj = {};
    let newProd;
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        if (selectVal === 'id'){
            if (Object[keys[i]].includes(input.value)){
                newProd = createProduct(obj.name,obj.price,obj.badge,keys[i],false);
                Object.assign(newObj,newProd);
            }
        }
        if (obj[keys[i]][selectVal].includes(input.value)){
            newProd = createProduct(obj[keys[i]].name,obj[keys[i]].price,obj[keys[i]].badge,keys[i],false);
            Object.assign(newObj,newProd);
        }
    }
    showElements(newObj);
}
function wishList(obj){
    if (this.checked){
        this.setAttribute('checked','checked');
        obj.wishlist = true;
        this.parentNode.firstChild.innerText = 'Added to wishlist';
    } else {
        this.removeAttribute('checked');
        obj.wishlist = false;
        this.parentNode.firstChild.innerText = 'Add to wishlist';
        }
}
function showWishlistProducts(obj){
    let wishlistObj = {};
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        if (obj[keys[i]].wishlist === true){
            let newProd = createProduct(obj[keys[i]].name,obj[keys[i]].price,obj[keys[i]].badge, keys[i],true);
            Object.assign(wishlistObj,newProd);
        }
    }
    showElements(wishlistObj);
}
function createProduct(name,pricing,productBadge,id,wishlisted){
    if (!name){
        alert('Enter a name of a product.');
        return;
    }
    if (!pricing){
        alert('Enter a price of a product.');
        return;
    }
    let product = document.createElement('article');
    product.classList.add('product');
    product.id = id;
    wrapper.append(product);
    let productName = document.createElement('h2');
    productName.classList.add('product-name');
    productName.innerText = name;
    product.append(productName);
    let wish = document.createElement('input');
    wish.classList.add('wish');
    let labelForWish = document.createElement('label');
    let spanForLabel = document.createElement('span');
    labelForWish.append(spanForLabel);
    spanForLabel.innerText = 'Add to wishlist';
    spanForLabel.classList.add('wishlistLabel');
    if (wishlisted===true){
        wish.setAttribute('checked','checked');
        spanForLabel.innerText = 'Added to wishlist';
    } else {
        wish.removeAttribute('checked');
        spanForLabel.innerText = 'Add to wishlist';
    }
    labelForWish.append(wish);
    wish.type = 'checkbox';
    wish.innerText = 'test';
    product.append(labelForWish);
    let price = document.createElement('p');
    price.classList.add('price');
    price.innerText = `${pricing}$`;
    product.append(price);
    let badge = document.createElement('div');
    if (productBadge !== 'none' && productBadge.length !== 0){
        badge.classList.add('badge');
        product.append(badge);
        if (productBadge === 'New'){
            badge.style.backgroundColor = 'orange';
            badge.innerText = productBadge;
        } else if (productBadge === 'Sale'){
            badge.style.backgroundColor = 'red';
            badge.innerText = productBadge;
        }
    }else {
        productBadge = 'none';
    }
    return {
        [id]:{
            name: name,
            price: pricing,
            badge: productBadge,
            wishList: wishlisted
        }
    }
}
window.onload = () => showElements(products);
document.querySelector('.s-wishlist-btn').addEventListener('click',() => showWishlistProducts(products))
input.addEventListener('keyup',() => productsByInput(products, select.value));
document.querySelector('.s-btn').addEventListener('click', (e) => {
    e.preventDefault();
    let name = document.querySelector('.name-input');
    let price = document.querySelector('.price-input');
    let priseReg = /^((?!([a-z])).)+$/i;
    if (!priseReg.test(price.value)){
        alert('Enter valid price.');
        return;
    }
    let badge = document.querySelector('.badge-input');
    let newObjId = `00${++Object.keys(products).length}`;
    let newObj = createProduct(name.value,price.value,badge.value,newObjId,false);
    Object.assign(products,newObj);
    name.value = price.value = badge.value = '';
});