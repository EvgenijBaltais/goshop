<template>
<div class = "catalog-wrapper">

    <Dashboard_menu/>
    <div class = "catalog">
        <div class = "catalog-section">
            <Catalog_item
                v-for = 'item in products.slice(0, visibleProduct)'
                :key = 'item.id'
                :items = 'item'
            />
        </div>
        <div class = "preloader-wrapper"></div>
    </div>
</div>
</template>

<script>

import Catalog_item from '../components/Catalog_item'
import Dashboard_menu from '../components/Dashboard_menu'
import axios from 'axios'

export default {
    data(){
        return {
            preloader: require('../assets/icons/2.gif'),
            bottom_pic: require('../assets/icons/to-bottom-pic.svg'),
            loading: 0,
            visibleProduct: 12,
            products: [],
            productsFullList: []
        }
    },
    components: {
        Catalog_item, Dashboard_menu
    },
    methods: {
        getCatalogItems(){

            axios.get('//localhost:3000/catalog_products')
                .then(response => {

                    // Контент по выбранной категории

                    let array = []

                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i]['category_url'] != this.$route.params.category) continue
                        array.push(response.data[i])
                    }

                    console.log(array)

                    this.products = array
                    this.productsFullList = array

                    window.addEventListener('scroll', this.getMoreItems)
                })
                // https://www.jonportella.com/you-are-using-browser-events-wrong/ - потом проверить, надо передать не анонимную функцию, а именованную. Иначе событие не удаляется
        },
        addPreloader(){

            let preloader = document.createElement('img')
                preloader.classList.add('catalog-preloader')
                preloader.setAttribute('src', this.preloader)

            document.querySelector('.preloader-wrapper').append(preloader)
        },
        removePreloaders(){
            for (let i = 0; i < document.querySelectorAll('.catalog-preloader').length; i++) {
                document.querySelectorAll('.catalog-preloader')[i].remove()
            }
        },
        getMoreItems(){

            let allProducts = this.products

            if (this.isInViewport(document.querySelector('.preloader-wrapper'))) {
                return false
            }
            
            this.loading++

                window.removeEventListener('scroll', this.getMoreItems)
                this.addPreloader()
                this.loading = 0

            if (this.loading > 0) return false

            new Promise((resolve) => {
                setTimeout(() => {

                    this.visibleProduct < allProducts.length - 6
                    ? this.visibleProduct += 6
                    : this.visibleProduct = allProducts.length
                    resolve()
                }, 1000)
            }).then(() => {

                this.removePreloaders()

                if (this.visibleProduct != allProducts.length) {
                    window.addEventListener('scroll', this.getMoreItems)
                }
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
        },
        getParent: function(el, cls){
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el;
        }
    },
    mounted() {
        this.getCatalogItems()
    },
    watch:{
        $route (){
            this.getCatalogItems()
        }
    },
    unmounted(){
        window.removeEventListener('scroll', this.getMoreItems)
  }
}
</script>