<template>
<div>
<button class = "get-items" @click = "addPreloader()">Получить товары</button>
<div class = "catalog">


<Catalog_item
    v-for = 'item in items'
    :key = 'item.id'
    v-bind:items = 'item'
/>


</div>

</div>

</template>

<script>

//import axios from 'axios'
import Catalog_item from '../components/Catalog_item'

export default {

    data(){
        return {}
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

        getProducts(){
            // Удалить этот метод
            console.log(this.items)
        },
        getMaxObjId(){
            let maxObjId = 0    // Поиск наибольшего id из объекта товаров каталога в хранилище
            for (let k in this.items) {
                maxObjId < this.items[k].id ? maxObjId = this.items[k].id : ''
            }
            return maxObjId
        },
        addPreloader(){

            let preloader = document.createElement('img')
                preloader.classList.add('catalog-preloader')
                preloader.setAttribute('src', '/assets/icons/2.gif')

            //preloader.insertAdjacentElement('beforeEnd', document.querySelector('.catalog'))
            //preloader.insertBefore(document.querySelector('.catalog'))
            document.querySelector('.catalog').append(preloader)
        },

        getMoreCatalogItems(){

            let items = document.querySelectorAll('.catalog__item')

            if (this.isInViewport(document.querySelectorAll('.catalog__item')[items.length - 10])) {
                window.removeEventListener('scroll', this.getMoreCatalogItems)
                this.addPreloader()
            }

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
    window.addEventListener('scroll', this.getMoreCatalogItems)

    this.$store.dispatch('get_catalog')
  }
}

</script>

<style scoped>

.catalog {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.catalog::after {
  content: "";
  flex-basis: 250px;
}


</style>