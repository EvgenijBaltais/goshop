<template>
		<div class = "top-stripe">
			<div class = "main-basket">
				<p class = "main-basket__text">
                    <a href="" class = "main-basket__link">
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
    font-size: 16px;
    line-height: 20px;
    padding-right: 7px;
    margin-right: 10px;
    border-right: 1px solid #576167;
    color: #576167;
}

.main-basket__text {
    position: relative;
}

.main-basket__link {
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