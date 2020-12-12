<template>
<div class = "cart-block">

    <div class="cart-block-title">
        <div class = "cart-block-name">
            <span>Товар</span>
        </div>
        <div class = "cart-block-itemprice">
            <span>
                Цена за 1 шт
            </span>
        </div>
        <div class = "cart-block-amount">
            <span>
                Количество
            </span>
        </div>
        <div class = "cart-block-commonprice">
            <span>
                Общая стоимость
            </span>
        </div>
    </div>

    <div class="cart-block-item" v-for = "item in cart" :key = "item.id">

        <div class = "cart-block-name">
            <div class = "cart-block-pic">
                <img :src="require('../assets/pics/bouquets/' + item.img + '/1.jpg')" alt="" class = "cart-block-img">
            </div>
            <span>Товар</span>
        </div>
        <div class = "cart-block-itemprice">
            <span>
                Цена за 1 шт
            </span>
        </div>
        <div class = "cart-block-amount">
            <div class = "cart-block-amount-text">
                Количество
            </div>
            <div class = "cart-block-calc">
                <span class = "cart-block-minus">-</span>
                <span class = "cart-block-amount">1</span>
                <span class = "cart-block-plus">+</span>
            </div>
        </div>
        <div class = "cart-block-commonprice">
            <span>
                Общая стоимость
            </span>
        </div>
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
        }
    }
}
</script>

<style>

.cart-block-title {
    display: flex;
    outline: 1px solid red;
}
.cart-block-item {
    display: flex;
}
.cart-block-name {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 52%;
    outline: 1px solid red;
}

.cart-block-pic {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100px;
    height: 100px;
    margin-right: 20px;
    outline: 1px solid red;
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
    outline: 1px solid red;
    text-align: center;
}

.cart-block-amount {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 16%;
    outline: 1px solid red;
    text-align: center;
    user-select: none;
}

.cart-block-commonprice {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 16%;
    outline: 1px solid red;
    text-align: center;
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

</style>