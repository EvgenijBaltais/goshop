<template>
		<div class = "top-stripe">
			<div class = "main-basket">
                <div class = "basket-content-wrap">
                    <div class = "basket-content">
                        <div class = "basket-item" v-for = "item in getCart" :key = "item.id" :data-id = "item.id">
                            <div class="basket-pic">
                                <img :src="require('../assets/pics/bouquets/' + item.img + '/1.jpg')" alt="" class = "basket-pic-img">
                            </div>
                            <div class="basket-title">
                                <span>{{item.title}}</span>
                            </div>
                            <div class = "basket-amount">
                                <div class = "cart-item-minus">
                                    <a class = "cart-item-minus-a" @click = "changeCart('minus')">-</a>
                                </div>
                                <div class = "cart-item-amount">
                                    <a class = "cart-item-amount-a">{{item.amount}}</a>
                                </div>
                                <div class = "cart-item-plus">
                                    <a class = "cart-item-plus-a" @click = "changeCart('plus')">+</a>
                                </div>
                            </div>
                            <div class="basket-price">
                                <span>{{item.price}} руб</span>
                            </div>
                            <a class="basket-remove" title = "Удалить" @click = removeFromCart></a>
                        </div>
                        <div class = "basket-item-final" v-if = getCart.length>
                            <div class = "basket-result-text">Итого:</div>
                            <div class = "basket-result-price">
                                <span class = "basket-final-number" id = "basket-final-number">{{basketFinalPrice}}</span> руб
                            </div>
                        </div>
                        <div class = "basket-final-tocart-w" v-if = getCart.length>
                            <router-link :to = "{name: 'Cart'}" class = "basket-final-tocart">Перейти в корзину</router-link>
                        </div>
                        <div class = "empty-basket" v-if = !getCart.length>
                            <span>Корзина пока пуста</span>
                        </div>
                    </div>
                </div>
				<p class = "main-basket__text">
                    <router-link :to = "{name: 'Cart'}" class = "main-basket__link">
					<span>Корзина товаров</span><span class = "main-basket__value">({{getCart.length}})</span>
                    </router-link>
				</p>
			</div>
			<div class = "main-phone">
				<a href="+79057777777" class = "main-phone__number">+7 (905) 777-77-77</a>
			</div>
		</div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'TopHeaderBlock',
  components: {

  },
  data(){
      return {}
  },
  methods: {
    changeCart: function(value){

        this.$store.dispatch('changeCart', {
            id: this.getParent(event.target, 'basket-item').getAttribute('data-id'),
            value: value
        })
    },
    removeFromCart: function(){
        this.$store.dispatch('removeFromCart', {
            id: this.getParent(event.target, 'basket-item').getAttribute('data-id')
        })
    },
    getParent: function(el, cls){
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }
  },
  computed: {
      ...mapGetters([
          'getCart'
      ]),
      basketFinalPrice(){
          let value = 0;
          if (this.getCart.length > 0) {
              for (let i = 0; i < this.getCart.length; i++) {
                value += this.getCart[i].price * this.getCart[i].amount
              }
          }
          return value
      }
  }
}
</script>

<style>

.top-stripe {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 20px 0 10px 0;
    box-sizing: border-box;
}

.main-basket {
    position: relative;
    font-size: 16px;
    line-height: 20px;
    padding-right: 7px;
    margin-right: 10px;
    border-right: 1px solid #576167;
    color: #576167;
}

@keyframes showBasket {
  0% {
    width: 580px;
    height: auto;
    opacity: 1;
    top: 10px;
  }
  100% {
    width: 580px;
    height: auto;
    top: 30px;
    opacity: 1;
  }
}

p.speech:after { 
    content: ' '; 
    position: absolute; 
    width: 0; 
    height: 0; 
    left: 38px; 
    top: 100px; 
    border: 15px solid; 
    border-color: #fff transparent transparent #fff; 
}

.main-basket:hover .basket-content-wrap  {
    display: block;
}
.main-basket:hover .basket-content {
    animation: showBasket .3s forwards;
}

.basket-content-wrap {
    display: none;
    width: 580px;
    position: absolute;
    top: 100%;
    right: 0;
    padding-top: 42px;
    z-index: 3;
}

.basket-content {
    position: absolute;
    left: 0;
    right: 0;
    top: 10px;
    margin: auto;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    background: #fff;
    -webkit-box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.3);
    -moz-box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.3);
    box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.3);
}

.basket-content:before { 
    content: ' '; 
    position: absolute; 
    width: 0; 
    height: 0; 
    right: 38px; 
    top: -20px; 
    border: 7px solid; 
    border: 10px solid transparent;
    border-bottom: 10px solid #E1E1E1;
}


.basket-content:after { 
    content: ' '; 
    position: absolute; 
    width: 0; 
    height: 0; 
    right: 39px; 
    top: -18px; 
    border: 7px solid; 
    border: 9px solid transparent;
    border-bottom: 9px solid #fff;
}

.basket-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border-top: 1px solid #ccc;
    padding-top: 10px;
}

.basket-item:first-child {
    border-top: 0;
    padding-top: 0;
}

.basket-item:last-child {
    margin-bottom: 0;
}

.basket-remove {
    display: block;
    background-image: url('../assets/icons/trash.svg');
    background-repeat: no-repeat;
    background-size: 18px;
    background-position: center;
}

.basket-pic {
    width: 40px;
    height: 40px;
    background-size: contain;
    background-repeat: no-repeat;
}

.basket-pic-img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    max-height: 100%;
}

.basket-title {
    width: 280px;
    font-size: 16px;
    line-height: 24px;
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
    text-align: center;
}

.basket-price {
    width: 100px;
    padding: 0 10px;
    font-size: 16px;
    line-height: 24px;
    font-weight: bold;
    box-sizing: border-box;
    text-align: center;
}

.basket-remove {
    width: 20px;
    height: 20px;
    cursor: pointer;
    padding: 0;
}

.main-basket__text {
    position: relative;
}

.main-basket__link {
    position: relative;
    padding-left: 26px;
    background-image: url('../assets/icons/cart.svg');
    background-repeat: no-repeat;
    background-size: 18px;
    box-sizing: border-box;
    color: #000!important;
    text-decoration: none!important;
}

.main-basket__value {
    padding: 0 3px;
    box-sizing: border-box;
    font-size: 16px;
    line-height: 20px;
    font-weight: bold;
    color: green;
}

.main-phone__number {
    padding-left: 28px;
    box-sizing: border-box;
    font-size: 24px;
    line-height: 24px;
    font-weight: bold;
    color: #000;
    text-decoration: none;
    color: #576167;
    background-image: url('../assets/icons/phone.svg');
    background-repeat: no-repeat;
    background-size: 20px;
    background-position: left center;
}

.basket-item-final {
    display: flex;
    align-items: center;
    padding-top: 10px;
    border-top: 1px solid #ccc;
    padding-top: 10px;
}

.basket-final-tocart-w {
    text-align: center;
    padding: 30px 0 10px 0;
}

.basket-final-tocart {
    text-align: center;
    padding: 10px 20px;
    color: #fff!important;
    font-size: 18px;
    line-height: 20px;
    text-decoration: none!important;
    background-color: #6cb8d5;
    transition: background-color .3s;
}

.basket-final-tocart:hover {
    transition: background-color .3s;
    background-color: rgb(77,166,24);
}

.basket-result-text {
    width: 405px;
    font-weight: bold;
}

.basket-result-price {
    width: 100px;
    text-align: center;
    padding-left: 5px;
    font-weight: bold;
}

.basket-final-number {
    font-size: 16px;
    line-height: 24px;
    font-weight: bold;
}

.basket-amount {
    width: 80px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 10px;
}

.cart-item-minus {
    text-align: center;
}
.cart-item-amount {
    text-align: center;
}
.cart-item-plus {
    text-align: center;
}
.cart-item-minus-a {
    padding: 0 5px;
    font-size: 30px;
    line-height: 30px;
    text-decoration: none!important;
    color: #000;
    cursor: pointer;
    user-select: none;
}
.cart-item-plus-a {
    padding: 0 5px;
    font-size: 30px;
    line-height: 30px;
    text-decoration: none!important;
    color: #000;
    cursor: pointer;
    user-select: none;
}

.cart-item-amount-a {
    padding: 0 5px;
    font-size: 20px;
    line-height: 20px;
    text-decoration: none!important;
    color: #000;
    user-select: none;
}

.empty-basket {
    text-align: center;
}

</style>