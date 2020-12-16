<template>
		<div class = "delivery-stripe">
			<div class = "delivery-block delivery-block-delivery">
				<span class = "delivery-stripe__white">Доставка</span>
			</div>
			<div class = "delivery-block delivery-block-guarantee">
				<span class = "delivery-stripe__white">Гарантия качества</span>
			</div>
			<div class = "delivery-block delivery-block-sale">
				<span class = "delivery-stripe__white">Скидки и подарки</span>
			</div>
			<div class = "delivery-block delivery-block-individual">
				<span class = "delivery-stripe__white">Индивидуальный подход</span>
			</div>
		</div>
</template>

<script>

export default {
  name: 'DeliveryInfoStripe',
  data(){
      return {}
  }
}
</script>

<style scoped>
    .delivery-stripe {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        background-image: url('../assets/peach-watercolor-bg.webp');
        background-size: cover;
        margin-bottom: 20px;
        padding: 0 40px;
    }

    .delivery-stripe__white {
        color: #fff;
        font-size: 16px;
    }

    .delivery-block {
        display: flex;
        align-items: center;
        height: 100%;
        padding-left: 40px;
        box-sizing: border-box;
        background-position: left center;
        background-repeat: no-repeat;
        background-size: 30px;
    }
    .delivery-block-delivery {
        background-image: url('../assets/icons/delivery-white.svg');
    }
    .delivery-block-guarantee {
        background-image: url('../assets/icons/guarantee-white.svg');
        padding-left: 35px;
    }
    .delivery-block-sale {
        background-image: url('../assets/icons/sale-white.svg');
        padding-left: 35px;
    }
    .delivery-block-individual {
        background-image: url('../assets/icons/man-white.svg');
        padding-left: 35px;
    }
</style>