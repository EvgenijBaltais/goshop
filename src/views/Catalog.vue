<template>
<div class = "catalog-wrapper">
    <Dashboard_menu/>
    <div class = "catalog">
        <div class="catalog-filters">
            <div class = "show-vars-w">
                <span class = "filters-title">Уточнить условия поиска:</span>
                <a class = "show-filter-variants" @click.prevent = "showFilterVariants">Показать</a>
            </div>
            <div class = "filters-form-w" id = "filters-form-w">
                <form action="" class = "filters-form" id = "filters-form">
                    <div class="form_radio">
                        <input id="radio-1" type="radio" name="filter-default" value="1" checked>
                        <label for="radio-1" class = "price-change" id = "price-default" @click = "remakeCatalog">По умолчанию</label>
                    </div>
                    <div class="form_radio">
                        <input id="radio-2" type="radio" name="filter-default" value="2">
                        <label for="radio-2" class = "price-change" id = "price-min-to-max" @click = "remakeCatalog">По цене (от 100 до 100 000)</label>
                    </div>
                    <div class="form_radio">
                        <input id="radio-3" type="radio" name="filter-default" value="3">
                        <label for="radio-3" class = "price-change" id = "price-max-to-min" @click = "remakeCatalog">По цене (от 100 000 до 100)</label>
                    </div>
                    <div class="form_radio">
                        <input id="radio-4" type="radio" name="filter-default" value="4">
                        <label for="radio-4" class = "price-change" id = "price-alfabet" @click = "remakeCatalog">По алфавиту</label>
                    </div>
                    <div class="range-wrapper">
                        <p class = "filters-title">Выбрать по цене:</p>
                        <div id = "range-slider" class = "range-slider"></div>
                        <div class="range-slide-prices">
                            <label for="price-range-from">
                                <span class = "bold-text">От:</span>
                                <input type="text" class = "price-range-from" id = "price-range-from">
                                <span class = "bold-text">руб.</span>
                            </label>
                            <label for="price-range-to">
                                <span class = "bold-text">До:</span>
                                <input type="text" class = "price-range-to" id = "price-range-to">
                                <span class = "bold-text">руб.</span>
                            </label>
                            <button type = "button" class = "get-range-query" id = "get-range-query">Подобрать</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class = "catalog-section">
            <!-- v-for = 'item in products.slice(0, visibleProduct)' -->
            <Catalog_item
                v-for = 'item in products'
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
import noUiSlider from 'nouislider'
import 'nouislider/distribute/nouislider.css'

export default {
    data(){
        return {
            preloader: require('../assets/icons/2.gif'),
            bottom_pic: require('../assets/icons/to-bottom-pic.svg'),
            loading: 0,
            visibleProduct: this.$store.state.visibleProducts,
            productsFullList: []
        }
    },
    components: {
        Catalog_item, Dashboard_menu
    },
    computed: {
        products(){
            return this.$store.state.catalog_state
        }
    },
    methods: {
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
           getFilteredProducts(){

            let newItems = [],
                filters = document.getElementById('choosen-filters').querySelectorAll('.filter-link-choosen')

            // категории фильтров

            let colors = [],
                flowers = []

            for (let i = 0; i < filters.length; i++) {

                if (filters[i].getAttribute('data-flowertype')) {
                    flowers.push(filters[i].getAttribute('data-flowertype'))
                }
                if (filters[i].getAttribute('data-color')) {
                    colors.push(filters[i].getAttribute('data-color'))
                }
            }

            this.productsFullList.forEach(element => {

                for (let i = 0; i < filters.length; i++) {
                    if (filters[i].getAttribute('data-color')) {
                        for (let k = 0; k < colors.length; k++) {
                            if (element.color == colors[k]) {
                                let exists = newItems.some(function(el){
                                    return el.id == element.id
                                })
                                if (!exists) newItems.push(element) 
                            }
                        }
                    }

                    if (filters[i].getAttribute('data-flowertype')) {
                        for (let k = 0; k < flowers.length; k++) {
                            if (element.flowers_category == flowers[k]) {
                                let exists = newItems.some(function(el){
                                    return el.id == element.id
                                })
                                if (!exists) newItems.push(element) 
                            }
                        }
                    }
                }
            })
        },
        showFilterVariants(){

            let parent = this.getParent(event.target, 'catalog-filters')

            if (parent.classList.contains('opened-item')) {

                document.getElementById('filters-form-w').style.height = 0

                parent.classList.remove('opened-item')
                event.target.innerText = "Показать"
            }
            else {
                document.getElementById('filters-form-w').style.height = document.getElementById('filters-form').clientHeight + 'px'
                parent.classList.add('opened-item')
                event.target.innerText = "Скрыть"
            }
        },
        remakeCatalog(){

            new Promise((resolve) => {

                this.remakeBackground(document.querySelector('.catalog-section'))

                this.$store.dispatch('sort_catalog', {
                    'type': event.target.getAttribute('id')
                }).then(() => {
                    resolve()
                })

            }).then(() => {
                this.remakeBackground(document.querySelector('.catalog-section'))
            })
        },
        remakeBackground(catalogBlock){

            if (catalogBlock.querySelectorAll('.remaking-loading').length) {
                for (let i = 0; i < catalogBlock.querySelectorAll('.remaking-loading').length; i++) {
                    catalogBlock.querySelectorAll('.remaking-loading')[i].remove()
                }
                return false
            }
            catalogBlock.insertAdjacentHTML('beforeend', '<div class = "remaking-loading"></div>')
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
    beforeMount(){
        this.$store.dispatch('get_catalog_state').then(() => {

                let min = 0, max = 1,
                    from = document.getElementById('price-range-from'),
                    to = document.getElementById('price-range-to'),
                    inputs = [from, to],
                    stepsSlider = document.getElementById('range-slider')

                this.$store.state.catalog_state

                for (let i = 0; i < this.$store.state.catalog_state.length; i++) {

                    let item = this.$store.state.catalog_state[i].price

                    if (max < item) max = item
                    if (min == 0) min = item
                    if (min > item) min = item
                }

                noUiSlider.create(stepsSlider, {
                    start: [min, max],
                    animate: true,
                    tooltips: [true, true],
                    format: {
                        to: function ( value ) {
                            return Math.round(value)
                        },
                        from: function ( value ) {
                            return Math.round(value)
                        }
                    },
                    connect: true,
                    range: {
                        'min': min,
                        'max': max
                    }
                })

            stepsSlider.noUiSlider.on('update', function (values, handle) {
                inputs[handle].value = values[handle];
            })

            // Listen to keydown events on the input field.
            inputs.forEach(function (input, handle) {
                input.addEventListener('keydown', function () {
                    stepsSlider.noUiSlider.setHandle(handle, this.value)
                })
            })

            document.querySelector('.get-range-query').addEventListener('click', function(e){
                e.preventDefault()
                inputs.forEach(function (input, handle) {
                    stepsSlider.noUiSlider.setHandle(handle, input.value)
                })
            })
        })
    },
    mounted() {

        // https://www.jonportella.com/you-are-using-browser-events-wrong/ - потом проверить, надо передать не анонимную функцию, а именованную. Иначе событие не удаляется
    },
    unmounted(){
        window.removeEventListener('scroll', this.getMoreItems)
  }
}
</script>