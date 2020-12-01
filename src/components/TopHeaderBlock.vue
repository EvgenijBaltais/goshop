<template>
{{getCart}}
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
					<span>Корзина товаров</span><span class = "main-basket__value">({{getCart.length}})</span>
                    </a>
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

  },
  computed: {
      ...mapGetters([
          'getCart'
      ])
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
    width: 480px;
    height: auto;
    opacity: 1;
    top: 10px;
  }
  100% {
    width: 480px;
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
    width: 480px;
    position: absolute;
    top: 100%;
    right: 0;
    padding-top: 42px;
}

.basket-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
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

.basket-remove {
    display: block;
    background-image: url('../assets/icons/trash.svg');
    background-repeat: no-repeat;
    background-size: 18px;
}

.basket-pic {
    width: 40px;
    height: 40px;
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