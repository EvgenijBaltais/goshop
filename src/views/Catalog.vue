<template>
<div class = "catalog-wrapper">
    <Dashboard_menu/>
    <div class = "catalog">
        <div class="catalog-filters">
            <p class = "filters-title">
                Уточнить условия поиска:
            </p>
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
    created() {
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
    mounted() {

        this.$store.dispatch('get_catalog_state')
        // https://www.jonportella.com/you-are-using-browser-events-wrong/ - потом проверить, надо передать не анонимную функцию, а именованную. Иначе событие не удаляется
    },
    unmounted(){
        window.removeEventListener('scroll', this.getMoreItems)
  }
}
</script>

<style>

.catalog-filters {
    border-radius: 5px;
    background: #D8D8D8;
    margin: 0 auto 20px auto;
    padding: 20px;
    box-sizing: border-box;
}

.filters-title {
    font-size: 18px;
    line-height: 24px;
    color: #000;
    font-weight: bold;
}

/* Фильтры */

.filters-form {
    padding-top: 20px;
}

.filter-label {
    display: block;
    padding: 5px 0;
    cursor: pointer;
}

.filter-span {
    font-size: 18px;
    line-height: 24px;
}

.form_radio {
	margin-bottom: 10px;
}
.form_radio input[type=radio] {
	display: none;
}
.form_radio label {
	display: inline-block;
	cursor: pointer;
	position: relative;
	padding-left: 25px;
	margin-right: 0;
	line-height: 18px;
	user-select: none;
}
.form_radio label:before {
	content: "";
	display: block;
    border-radius: 50%;
    border: 1px solid #94CBE0;
    box-sizing: border-box;
	width: 18px;
	height: 18px;
	position: absolute;
	left: 0;
	bottom: 1px;
	background: #fff;
}

/* Checked */
.form_radio input[type=radio]:checked + label:after {
	content: "";
	display: block;
    border-radius: 50%;
    border: 1px solid #94CBE0;
    box-sizing: border-box;
	width: 12px;
	height: 12px;
	position: absolute;
    top: 2px;
	left: 3px;
	background: #94CBE0;
}

/* Фильтры, конец */

</style>