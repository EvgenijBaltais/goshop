<template>

		<div class = "logo-block">
			<div class = "logo-block__search">
				<div class = "logo-block__input">
					<input type="text" name = "main-search" class = "main-search">
					<button class = "main-search-btn"></button>
				</div>
			</div>
			<div class="logo-block__main-logo">
				<p class = "logo-title">ЦВЕТЫ И БУКЕТЫ</p>
				<p class = "logo-title-text">Лучшие цветы в Подмосковье</p>
			</div>
			<div class = "logo-block__top-info">
				<span>Бесплатная доставка по Красногорску от 1500 рублей!</span>
			</div>
		</div>
</template>

<script>


export default {
  name: 'TopHeaderLogoBlock',
  components: {

  },
  data(){
      return {}
  }
}
</script>

<style scoped>

    .logo-block {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 0 20px 0;
    }

    .logo-block__search {
        width: 30%;
    }
    .logo-block__input {
        position: relative;
        width: 240px;
        height: 42px;
        border: 1px solid #CED0D2;
        border-radius: 3px;
    }

    .main-search {
        width: 240px;
        height: 42px;
        box-sizing: border-box;
        padding: 10px 30px 10px 10px;
        font-size: 18px;
        line-height: 18px;
        border: 0!important;
        outline: 0!important;
    }

    .main-search-btn {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 40px;
        background-image: url('../assets/icons/search.svg');
        background-repeat: no-repeat;
        background-size: 16px;
        background-position: center;
        border: 0!important;
        outline: 0!important;
        background-color: #fff;
        cursor: pointer;
    }
    
    .logo-block__main-logo {

        width: 40%;
    }

    .logo-block__top-info {
        width: 30%;
    }

    .logo-title {
        text-align: center;
        font-size: 40px;
        line-height: 50px;
    }

    .logo-title-text {
        text-align: center;
        font-size: 14px;
        line-height: 18px;
    }
</style>