<template>
		<div class = "delivery-stripe">
			<div>
				<span class = "delivery-stripe__white">Доставка</span>
			</div>
			<div>
				<span class = "delivery-stripe__white">Гарантия 7 дней</span>
			</div>
			<div>
				<span class = "delivery-stripe__white">Скидки клиентам</span>
			</div>
			<div>
				<span class = "delivery-stripe__white">Доставка</span>
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

    }
</style>