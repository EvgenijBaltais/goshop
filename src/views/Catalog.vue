<template>
<div>
    <button class = "get-items" @click = "getMaxObjId()">Получить товары</button>

    <div class = "catalog">

        <Catalog_item
            v-for = 'item in items'
            :key = 'item.id'
            v-bind:items = 'item'
        />
    </div>
    <div class = "preloader-wrapper"></div>
</div>
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
  }
}

</script>

<style scoped>

.catalog {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.preloader-wrapper {
    width: 100%;
    text-align: center;
    padding: 20px 0;
}

.catalog-preloader {

}

.catalog::after {
  content: "";
  flex-basis: 250px;
}
</style>