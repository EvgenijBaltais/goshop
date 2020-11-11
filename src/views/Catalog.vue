<template>

<button class = "get-items" @click = "getMaxObjId()">Получить товары</button>

<div class = "catalog-wrapper">
    <div class = "catalog-dashboard">

        <div class="filters-section__1">
            <span class = "filters-text">Фильтры:</span>
            <a class = "clear-text">Сбросить все</a>
        </div>

        <div class="filters-section__2 has-inside-content">
            <a class = "filters-section__title">Цветы</a>
        </div>
    </div>

    <div class = "catalog">

        <Catalog_item
            v-for = 'item in items'
            :key = 'item.id'
            :items = 'item'
        />

    </div>
</div>
    <div class = "preloader-wrapper"></div>
</template>

<script>

//import axios from 'axios'
import Catalog_item from '../components/Catalog_item'
import { mapActions } from 'vuex'

export default {

    data(){
        return {
            preloader: require('../assets/icons/2.gif'),
            loading: 0
        }
    },
    components: {
        Catalog_item
    },
    computed: {
        items(){
            console.log('вызов')
            return this.$store.state.catalogItems
        }
    },
    methods: {
        ...mapActions([
            'getMoreCatalogItems'
        ]),
        onClick(){
            console.log(this.getMaxObjId())
        },
        getProducts(){
            // Удалить этот метод
            console.log(this.items)
        },
        getMaxObjId(){
            let maxObjId = 0    // Поиск наибольшего id из объекта товаров каталога в хранилище
            let products = document.querySelectorAll('.catalog__item')
            let lastProductId = products[products.length - 1].getAttribute('data-id')

            console.log(lastProductId)

            maxObjId < lastProductId ? maxObjId = lastProductId : ''
            return maxObjId
        },
        addPreloader(){

            let preloader = document.createElement('img')
                preloader.classList.add('catalog-preloader')
                preloader.setAttribute('src', this.preloader)

            //preloader.insertAdjacentElement('beforeEnd', document.querySelector('.catalog'))
            //preloader.insertBefore(document.querySelector('.catalog'))
            document.querySelector('.preloader-wrapper').append(preloader)
        },
        removePreloaders(){
            for (let i = 0; i < document.querySelectorAll('.catalog-preloader').length; i++) {
                document.querySelectorAll('.catalog-preloader')[i].remove()
            }
        },
        getMoreItems(){

            this.loading++

            let items = document.querySelectorAll('.catalog__item')

            if (this.isInViewport(items[items.length - 10])) {
                window.removeEventListener('scroll', this.getMoreItems)
                this.addPreloader()

                this.loading = 0
            }

            if (this.loading > 0) return false

            console.log(this.getMaxObjId())

            new Promise((resolve) => {
                setTimeout(() => {

                    this.getMoreCatalogItems(this.getMaxObjId())
                    resolve()
                }, 1000)
            }).then(() => {

                this.removePreloaders()
                window.addEventListener('scroll', this.getMoreItems)
            })
        },
        isInViewport(element) {
            let rect = element.getBoundingClientRect();
            let html = document.documentElement;
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || html.clientHeight) &&
                rect.right <= (window.innerWidth || html.clientWidth)
            )
        }
    },
  created() {
    window.addEventListener('scroll', this.getMoreItems)
    this.$store.dispatch('get_catalog')
  },
    unmounted(){
    window.removeEventListener('scroll', this.getMoreItems)
  }
}

</script>

<style scoped>

.catalog-wrapper {
    display: flex;
    justify-content: space-between;
}

.catalog-dashboard {
    width: 180px;
    outline: 1px solid grey;
}

.catalog {
    width: calc(100% - 200px);
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.has-inside-content {
    position: relative;
    padding-right: 30px;
    box-sizing: border-box;
}

.has-inside-content:after {
    
}

.preloader-wrapper {
    width: 100%;
    text-align: center;
    padding: 20px 0;
}

.catalog::after {
  content: "";
  flex-basis: 250px;
}

.filters-text {
    font-weight: bold;
}

.clear-text {
    text-decoration: underline;
    cursor: pointer;
}

.filters-section__1 {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
}

.filters-section__title {
    display: block;
    padding: 10px 0;
    border-top: 1px solid #CED0D2;
    font-size: 20px;
    line-height: 30px;
    cursor: pointer;
}

</style>