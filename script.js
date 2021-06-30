const products = {
    '0001':{
        name: 'Adidas Satan Shoes',
        price: '666$',
        badge: 'New',
    },
    '0002':{
        name: 'Nike Jordan I',
        price: '300$',
        badge: 'none',
    },
    '0003':{
        name: 'Under Armour Curry IV',
        price: '250$',
        badge: 'New',
    },
    '0004':{
        name: 'Nike PG 5',
        price: '200$',
        badge: 'Sale',
    },
    '0005':{
        name: 'The North Face Gucci shirt',
        price: '120$',
        badge: 'New',
    },
    '0006':{
        name: 'Gucci Fake/Not jacket',
        price: '1400$',
        badge: 'none',
    },
    '0007':{
        name: 'Under Armour hustle backpack',
        price: '60$',
        badge: 'Sale',
    },
    '0008':{
        name: 'The North Face Men\'s Fine Alpine T-shirt',
        price: '50$',
        badge: 'New',
    },
    '0009':{
        name: 'Nike Lebron XIII',
        price: '200$',
        badge: 'none',
    },
    '0010':{
        name: 'Adidas Dame 6',
        price: '180$',
        badge: 'none',
    }
}
let prods;
let productsKeys = Object.keys(products);
function showElements(){
    if (document.querySelector('.wrapper')){
        return;
    }
    let wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    document.querySelector('main').append(wrapper);
    for (let i = 0; i < productsKeys.length; i++) {
        let product = document.createElement('article');
        product.classList.add('product');
        product.id = productsKeys[i];
        wrapper.append(product);
        let productName = document.createElement('h2');
        productName.classList.add('product-name');
        productName.innerText = products[productsKeys[i]].name;
        product.append(productName);
        let wish = document.createElement('input');
        wish.classList.add('wish');
        let labelForWish = document.createElement('label');
        let spanForLabel = document.createElement('span');
        labelForWish.append(spanForLabel);
        spanForLabel.innerText = 'Add to wishlist';
        spanForLabel.classList.add('wishlistLabel');
        labelForWish.append(wish)
        wish.type = 'checkbox';
        wish.innerText = 'test';
        product.append(labelForWish);
        let price = document.createElement('p');
        price.classList.add('price');
        price.innerText = products[productsKeys[i]].price;
        product.append(price);
        if (products[productsKeys[i]].badge !== 'none'){
            let badge = document.createElement('div');
            badge.classList.add('badge');
            product.append(badge);
            if (products[productsKeys[i]].badge === 'New'){
                badge.style.backgroundColor = 'orange';
                badge.innerText = products[productsKeys[i]].badge;
            } else if (products[productsKeys[i]].badge === 'Sale'){
                badge.style.backgroundColor = 'red';
                badge.innerText = products[productsKeys[i]].badge;
            }
        }
    }
    for (const check of document.querySelectorAll('.wish')){
        check.addEventListener('change',wishList);
    }
    prods = document.querySelectorAll('article');
}
let input = document.querySelector('.s-input');

function productsByInput(){
    let select = document.getElementById('showItemsSelect');
    for (let i = 0; i < prods.length; i++) {
        switch (select.value){
            case 'ID':{
                if (!prods[i].id.includes(input.value)){
                    prods[i].style.display = 'none';
                } else {
                    prods[i].style.display = 'block';
                }
            } break;
            case 'Name':{
                if (!prods[i].firstChild.innerText.includes(input.value)){
                    prods[i].style.display = 'none';
                } else {
                    prods[i].style.display = 'block';
                }
            } break;
            case 'Badge':{
                if (!prods[i].lastChild.innerText.includes(input.value)){
                    prods[i].style.display = 'none';
                } else {
                    prods[i].style.display = 'block';
                }
            }
        }

    }
}
function wishList(){
    if (this.checked){
        this.setAttribute('checked','checked');
        this.parentNode.firstChild.innerText = 'Added to wishlist';
    } else {
        this.removeAttribute('checked');
        this.parentNode.firstChild.innerText = 'Add to wishlist';
    }
}
document.querySelector('.s-btn').addEventListener('click', showElements);
input.addEventListener('keyup',productsByInput);