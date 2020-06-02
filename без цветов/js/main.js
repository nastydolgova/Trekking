'use strict';

let checkbox=document.querySelectorAll('.products-checkbox');
let productsSex=document.querySelectorAll('.products-sex');
let seeAllSex=document.querySelector('.products-filters-btn');
let openCart=document.querySelector('.open-cart');
let cartBl=document.querySelector('.cart-block');


for(let i=0; i<checkbox.length; i++){
    checkbox[i].addEventListener('click', function(){
        productsSex[i].classList.toggle('hidden');
    })
}

seeAllSex.addEventListener('click', function(){
    for(let i=0; i<productsSex.length; i++){
        if (productsSex[i].classList.contains('hidden')){
            productsSex[i].classList.remove('hidden');
            checkbox[i].checked = true;
        };
    }
})

openCart.addEventListener('click', function(){
   cartBl.classList.toggle('hidden');
})



