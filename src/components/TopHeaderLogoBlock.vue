<template>
    <div class = "logo-block">
        <div class = "logo-block__search">
            <div class = "logo-block__input">
                <form action="">
                    <input type="text" name = "main-search" class = "main-search" placeholder="Поиск...">
                    <button class = "main-search-btn" @click.prevent = "searchInfo"></button>
                </form>
            </div>
        </div>
        <div class="logo-block__main-logo">
            <p class = "logo-title">
                <router-link :to = "{path: '/'}" class = "logo-link">ЦВЕТЫ И БУКЕТЫ</router-link>
            </p>
            <p class = "logo-title-text">Лучшие цветы в Подмосковье</p>
        </div>
        <div class = "logo-block__top-info">
            <span>Бесплатная доставка по Красногорску от 1500 рублей!</span>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'TopHeaderLogoBlock',
  components: {

  },
  data(){
      return {}
  },
  methods: {
      searchInfo(){

          let search = event.target.parentNode.querySelector('.main-search')

            if (search.value == '') {
                return false
            }

            axios.get('//localhost:3001/clients_search', {
                params: {
                    text: search.value
                }
            }).then(response => {

                this.$store.dispatch({
                    type: 'changeSearchData',
                    items: response.data
                })
            }).then(() => {
                this.$router.push({ name: 'SearchPage'})
            })
      }
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
        border-radius: 3px;
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
        background-color: transparent;
        cursor: pointer;
    }

    .main-search                       {font-size: 15px;}
    .main-search::-moz-placeholder     {font-size: 15px;}
    .main-search:-moz-placeholder      {font-size: 15px;}
    .main-search:-ms-input-placeholder {font-size: 15px;}

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

    .logo-link {
        color: #000!important;
        text-decoration: none!important;
        font-weight: bold;
    }

    .logo-title-text {
        text-align: center;
        font-size: 14px;
        line-height: 18px;
    }
</style>