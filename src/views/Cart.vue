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

    <div class="cart-block-item">

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


</div>
</template>

<script>
export default {

    name: 'Cart',
    data(){
        return {}
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
    width: 52%;
    outline: 1px solid red;
}

.cart-block-itemprice {
    width: 16%;
    outline: 1px solid red;
    text-align: center;
}

.cart-block-amount {
    width: 16%;
    outline: 1px solid red;
    text-align: center;
}

.cart-block-commonprice {
    width: 16%;
    outline: 1px solid red;
    text-align: center;
}

</style>