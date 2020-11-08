<template>
		<div class="main-navigation">
			<div class = "main-navigation__item">
        <router-link :to = "{name: 'Home'}" class = "main-navigation__link">Главная</router-link>
			</div>
			<div class = "main-navigation__item">
        <router-link :to = "{name: 'Catalog'}" class = "main-navigation__link">Каталог</router-link>
			</div>
			<div class = "main-navigation__item">
				<a class = "main-navigation__link">О компании</a>
			</div>
			<div class = "main-navigation__item">
        <router-link :to = "{name: 'Contacts'}" class = "main-navigation__link">Контакты</router-link>
			</div>
		</div>
		<div class="main-navigation">
			<div class = "main-navigation__item">
        <router-link :to = "{name: 'Home'}" class = "main-navigation__link">Главная</router-link>
			</div>
			<div class = "main-navigation__item">
				<router-link :to = "{name: 'Catalog'}" class = "main-navigation__link">Каталог</router-link>
			</div>
			<div class = "main-navigation__item">
				<a class = "main-navigation__link">О компании</a>
			</div>
			<div class = "main-navigation__item">
        <router-link :to = "{name: 'Contacts'}" class = "main-navigation__link">Контакты</router-link>
			</div>
            <div class = "main-navigation__item">
                <router-link :to = "{name: 'Single_product'}" class = "main-navigation__link">Test</router-link>
            </div>
		</div>

</template>

<script>



export default {
  name: 'MainNavigation',
  components: {

  },
  data(){
      return {}
  }
}
</script>

<style scoped>

    .main-navigation {
        margin-bottom: 20px;
        border-top: 1px solid #CED0D2;
        border-bottom: 1px solid #CED0D2;
        font-size: 0;
        line-height: 0;
        letter-spacing: 0;
        text-align: center;
    }

    .main-navigation__item {
        display: inline-block;
        padding: 10px 20px;
    }

    .main-navigation__link {
        font-size: 16px;
        line-height: 20px;
        letter-spacing: normal;
        cursor: pointer;
        text-decoration: none!important;
        color: #000!important;
    }

</style>