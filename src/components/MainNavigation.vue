<template>
    <div :class="['main-navigation']">
        <div class = "main-navigation__item">
            <router-link :to = "{name: 'Home'}" class = "main-navigation__link">Главная</router-link>
        </div>
        <div class = "main-navigation__item">
            <router-link :to = "{name: 'Catalog'}" class = "main-navigation__link">Каталог товаров</router-link>
        </div>
        <div class = "main-navigation__item">
            <router-link :to = "{name: 'Category_page', params: {category: 'flowers'}}" class = "main-navigation__link">Выбрать цветы</router-link>
        </div>
        <div class = "main-navigation__item">
            <router-link :to = "{path: '/myfavorite'}" class = "main-navigation__link">Избранное</router-link>
        </div>
        <div class = "main-navigation__item">
            <router-link :to = "{name: 'Contacts'}" class = "main-navigation__link">Контакты</router-link>
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

<style>

    .main-navigation {
        border-top: 1px solid #CED0D2;
        border-bottom: 1px solid #CED0D2;
        font-size: 0;
        line-height: 0;
        letter-spacing: 0;
        text-align: center;
    }

    .main-navigation__item {
        display: inline-block;
        padding: 15px;
    }

    .main-navigation__link {
        padding: 2px;
        font-size: 18px;
        line-height: 22px;
        letter-spacing: normal;
        cursor: pointer;
        text-decoration: none;
        color: #000!important;
        user-select: none;
    }

    .main-navigation__link.router-link-exact-active {
        border-bottom: 2px solid #000;
    }

</style>