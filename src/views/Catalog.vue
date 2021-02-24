<template>
<div class = "catalog-wrapper">
    <Dashboard_menu/>
    <div class = "catalog">
        <div class="catalog-filters">
            <p class = "filters-title">Уточнить условия поиска:</p>
            <form action="" class = "filters-form">
                <div class="form_radio">
                    <input id="radio-1" type="radio" name="filter-default" value="1" checked>
                    <label for="radio-1">По умолчанию</label>
                </div>
                <div class="form_radio">
                    <input id="radio-2" type="radio" name="filter-default" value="2">
                    <label for="radio-2">По цене (от 100 до 100 000)</label>
                </div>
                <div class="form_radio">
                    <input id="radio-3" type="radio" name="filter-default" value="3">
                    <label for="radio-3">По цене (от 100 000 до 100)</label>
                </div>
                <div class="form_radio">
                    <input id="radio-4" type="radio" name="filter-default" value="4">
                    <label for="radio-4">По алфавиту</label>
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
        listVisibility(){

            let parent = this.getParent(event.target, 'filters-section')

            if (!parent.classList.contains('has-inside-content')) return false

            if (parent.classList.contains('opened-list')){
                parent.classList.remove('opened-list')
                return false
            }
            
            parent.classList.add('opened-list')

            return false;
        },
        getFilter: function() {

            if (!document.getElementById('choosen-filters')) return false

            let copiedElement = ''

            if (!event.target.classList.contains('filter-link-choosen')) {
                event.target.classList.add('filter-link-choosen')
                copiedElement = document.createElement('a')

                for (let i = 0; i < event.target.classList.length; i++) {
                    copiedElement.classList.add(event.target.classList[i])
                }

                for (let key in event.target.dataset) {
                    copiedElement.setAttribute('data-' + key.toLowerCase(), event.target.dataset[key])
                }

                copiedElement.innerText = event.target.innerText

                copiedElement.addEventListener('click', this.clearSelectedItem)

                document.getElementById('choosen-filters').insertAdjacentElement('beforeend', copiedElement)
                return false
            }

            let selectedItems = document.getElementById('choosen-filters').childNodes

            for (let i = 0; i < selectedItems.length; i++) {
                if (selectedItems[i].innerText != event.target.innerText) continue

                selectedItems[i].remove()
                break
            }
            event.target.classList.remove('filter-link-choosen')
        },
        clearAll: function(){
            document.getElementById('choosen-filters').innerHTML = ''

            document.querySelectorAll('.filter-link').forEach(element => {
                element.classList.remove('filter-link-choosen')
            })

            this.products = this.productsFullList
        },
        clearSelectedItem: function(event){
            document.querySelectorAll('.filter-link').forEach(element => {
                if (element.innerText == event.target.innerText) {
                    element.classList.remove('filter-link-choosen')
                    return false
                }
            })
            event.target.remove()
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