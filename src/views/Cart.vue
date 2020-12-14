<template>
    <div class = "cart-block">
        <div class="cart-block-title" v-if = "cart.length">
            <div class = "cart-block-name">
                <span>Товар</span>
            </div>
            <div class = "cart-block-itemprice">
                <span>Цена за 1 шт</span>
            </div>
            <div class = "cart-block-amount">
                <span>Количество</span>
            </div>
            <div class = "cart-block-commonprice">
                <span>Общая стоимость</span>
            </div>
            <div class = "cart-block-remove"></div>
        </div>
        <div class="cart-block-item" v-for = "item in cart" :key = "item.id" :data-id = "item.id">
            <div class = "cart-block-name">
                <div class = "cart-block-pic">
                    <img :src="require('../assets/pics/bouquets/' + item.img + '/1.jpg')" alt="" class = "cart-block-img">
                </div>
                <span>{{item.title}}</span>
            </div>
            <div class = "cart-block-itemprice">
                <span>
                    {{item.price}} руб.
                </span>
            </div>
            <div class = "cart-block-amount">
                <div class = "cart-block-amount-text">
                    <span>Количество</span>
                </div>
                <div class = "cart-block-calc">
                    <a class = "cart-block-minus" @click = 'changeCart("minus")'>-</a>
                    <a class = "cart-block-value">{{item.amount}}</a>
                    <a class = "cart-block-plus" @click = 'changeCart("plus")'>+</a>
                </div>
            </div>
            <div class = "cart-block-commonprice">
                <span>{{item.amount * item.price}} руб.</span>
            </div>
            <div class = "cart-block-remove">
                <a @click.prevent = "removeFromCart" class = "cart-remove-basket" alt = "Удалить товар" title = "Удалить товар"></a>
            </div>
        </div>
        <div class="cart-block-summ-b" v-if = "cart.length">
            <div class = "cart-block-summ-result">
                <p class = "bold-text">Общая стоимость: <span class = "final-price">{{commonCartValue}} руб.</span></p>
            </div>
        </div>
        <div v-if = '!cart.length' class = "empty-basket-info">
            <p class = "">В корзине пока пусто!</p>
            <p class = "">Перейти в <router-link :to = "{path: 'catalog'}">Каталог</router-link></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Cart',
    data(){
        return {}
    },
    computed: {
        cart(){
            return this.$store.state.cart
        },
        commonCartValue(){
            let value = 0

            for (let i = 0; i < this.cart.length; i++) {
                value += this.cart[i].amount * this.cart[i].price
                console.log(this.cart[i].amount + ' ' + this.cart[i].price)
            }
            return value
        }
    },
    methods: {
        changeCart: function(value){

            this.$store.dispatch('changeCart', {
                id: this.getParent(event.target, 'cart-block-item').getAttribute('data-id'),
                value: value
            })
        },
        removeFromCart: function(){
            this.$store.dispatch('removeFromCart', {
                id: this.getParent(event.target, 'cart-block-item').getAttribute('data-id')
            })
        },
        getParent: function(el, cls){
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el;
        },
    }
}
</script>

<style>

.cart-block-title {
    display: flex;
    padding: 20px 0;
}
.cart-block-item {
    display: flex;
    border-top: 1px solid #CED0D2;
}
.cart-block-name {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 47%;
}

.cart-block-pic {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100px;
    height: 100px;
    margin-right: 20px;
}

.cart-block-img {
    max-width: 100%;
    max-height: 100%;
}

.cart-block-itemprice {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 16%;
    text-align: center;
}

.cart-block-amount {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 16%;
    text-align: center;
    user-select: none;
}

.cart-block-commonprice {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 16%;
    text-align: center;
    user-select: none;
}
.cart-block-remove {
    width: 5%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.cart-block-summ-result {
    text-align: right;
}

.cart-remove-basket {
    width: 25px;
    height: 25px;
    background-image: url('../assets/icons/trash.svg');
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;
}

.cart-block-summ-b {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.cart-block-amount-text {
    width: calc(100% - 60px);
}

.cart-block-calc {
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.cart-block-minus {
    font-size: 30px;
    line-height: 30px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
}
.cart-block-plus {
    font-size: 30px;
    line-height: 30px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
}

.final-price {
    color: #6cb8d5;
    font-size: 24px;
    line-height: 30px;
}

.empty-basket-info {
    padding: 20px 0;
    text-align: center;
}

</style>