<template>
		<div class = "top-stripe">
			<div class = "main-basket">
                <div class = "basket-content-wrap">
                    <div class = "basket-content">
                        <div class="basket-pic"></div>
                        <div class="basket-title">
                            <span>egerrhr r hrth rh rh rth trhr </span>
                        </div>
                        <div class="basket-price">
                            <span>500 000 руб</span>
                        </div>
                        <a class="basket-remove" title = "Удалить"></a>
                    </div>
                </div>
				<p class = "main-basket__text">
                    <a href="" class = "main-basket__link" @click.prevent>
					<span>Корзина товаров</span><span class = "main-basket__value">(3)</span>
                    </a>
				</p>
			</div>
			<div class = "main-phone">
				<a href="+79057777777" class = "main-phone__number">+7 (905) 777-77-77</a>
			</div>
		</div>
</template>

<script>
export default {
  name: 'TopHeaderBlock',
  components: {

  },
  data(){
      return {}
  },
  methods: {

  }
}
</script>

<style scoped>

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
    width: 400px;
    height: auto;
    opacity: 1;
    top: 3px;
  }
  100% {
    width: 400px;
    height: auto;
    top: 20px;
    opacity: 1;
  }
}

.main-basket:hover .basket-content-wrap  {
    display: block;
}
.main-basket:hover .basket-content {
    animation: showBasket .3s forwards;
}

.basket-content-wrap {
    display: block;
    width: 400px;
    position: absolute;
    top: 100%;
    right: 0;
    padding-top: 20px;
}

.basket-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    left: 0;
    right: 0;
    top: 5px;
    margin: auto;
    width: 100%;
    padding: 20px;
    background: #fff;
    -webkit-box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.3);
    -moz-box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.3);
    box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.3);
}

.basket-remove {
    display: block;
    background-image: url('../assets/icons/trash.svg');
    background-repeat: no-repeat;
    background-size: 18px;
}

.basket-pic {
    width: 30px;
    height: 30px;
}

.basket-title {
    font-size: 16px;
    line-height: 24px;
    padding-left: 5px;
}

.basket-price {
    font-size: 16px;
    line-height: 24px;
    font-weight: bold;
    padding-left: 5px;
}

.basket-remove {
    width: 20px;
    height: 20px;
    cursor: pointer;
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

</style>