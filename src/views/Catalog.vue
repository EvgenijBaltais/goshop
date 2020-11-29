<template>
<div class = "catalog-wrapper">
    <div class = "catalog-dashboard">

        <div :class="[`filters-section`, `one-option-section`, categories.length ? `has-inside-content` : '']">
            <div class = "filters-section__wrapper" @click = listVisibility>
                <a class = "filters-section__title">Категория</a>
                <img :src="bottom_pic" alt="" class = "bottom_pic">
            </div>
            <ul class = "filter-items-list" v-if = categories.length>
                <li class = "filter-item" v-for = "item in categories" :key = "item.id">
                    <router-link 
                        :to = "{path: `/catalog/${item.id}`}"
                        :class = "['filter-link']"
                        :data-category = item.id
                        @click.prevent = "getFilter()"
                    >
                        {{item.name}}
                    </router-link>
                </li>
            </ul>
        </div>

        <div :class="[`filters-section`, occasions.length ? `has-inside-content` : '']">
            <div class = "filters-section__wrapper" @click = listVisibility>
                <a class = "filters-section__title">Повод</a>
                <img :src="bottom_pic" alt="" class = "bottom_pic">
            </div>
            <ul class = "filter-items-list" v-if = occasions.length>
                <li class = "filter-item" v-for = "item in occasions" :key = "item.id">
                    <router-link
                        :to = "{path: `/catalog/${item.id}`}"
                        :class = "['filter-link']"
                        :data-occasiontype = item.id
                        @click.prevent = "getFilter()"
                        >
                            {{item.name}}
                        </router-link>
                </li>
            </ul>
        </div>

        <div class="filters-title-section">
            <div class = "filters-title-wrapper">
                <span class = "filters-text">Фильтры:</span>
                <a class = "clear-text"
                    @click.prevent = clearAll
                >
                    Сбросить все
                </a>
            </div>
            <div class = "choosen-filters" id = "choosen-filters"></div>
        </div>
        <div :class="[`filters-section`, flowers.length ? `has-inside-content` : '']">
            <div class = "filters-section__wrapper" @click = listVisibility>
                <a class = "filters-section__title">Выбрать цветы</a>
                <img :src="bottom_pic" alt="" class = "bottom_pic">
            </div>
            <ul :class = "['filter-items-list', 'opened-list']" v-if = flowers.length>
                <li class = "filter-item" v-for = "item in flowers" :key = "item.id">
                    <router-link
                        :to = "{path: `/catalog/${item.id}`}" 
                        :class = "['filter-link']"
                        :data-flowertype = item.id
                        @click.prevent = "getFilter();getFilteredProducts(e)"
                    >
                            {{item.name}}
                    </router-link>
                </li>
            </ul>
        </div>
        <div :class="[`filters-section`, `several-options-section`, colors.length ? `has-inside-content` : '']">
            <div class = "filters-section__wrapper" @click = listVisibility>
                <a class = "filters-section__title">Выбор по цвету</a>
                <img :src="bottom_pic" alt="" class = "bottom_pic">
            </div>
            <ul class = "filter-items-list" v-if = colors.length>
                <li class = "filter-item" v-for = "item in colors" :key = "item.id">
                    <router-link
                        :to = "{path: `/catalog/${item.id}`}"
                        :class = "['filter-link']"
                        :data-color = item.id
                        @click.prevent = "getFilter();getFilteredProducts(e)"
                        >
                            {{item.value}}
                        </router-link>
                </li>
            </ul>
        </div>
    </div>

    <div class = "catalog">

        <Catalog_item
            v-for = 'item in products.slice(0, visibleProduct)'
            :key = 'item.id'
            :items = 'item'
        />

        <div class = "preloader-wrapper"></div>
    </div>
</div>
</template>

<script>

//import axios from 'axios'
import Catalog_item from '../components/Catalog_item'
import { mapActions } from 'vuex'
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
        Catalog_item
    },
    computed: {
        productss(){

            let items = this.$store.state.products.data

            if (items != undefined) items = items.slice(0, this.visibleProduct)

            return items
        },
        categories(){
            return this.$store.state.categories
        },
        flowers(){
            return this.$store.state.flowers
        },
        occasions(){
            return this.$store.state.occasions
        },
        colors(){

            let colors = this.$store.state.colors,
                new_colors = ''

            if (colors.length > 0) {
                new_colors = colors.filter(function(key){
                    if (key.value != undefined && key.value != '') return key
                })
            }
            return new_colors
        }
    },
    methods: {
        ...mapActions([
            'get_flowers_types'             //////////  (?????????????????)
        ]),
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
                                    console.log(exists)
                                    if (!exists) newItems.push(element) 
                                }
                            }
                        }

                        //console.log(element.flowers_category)
                        
                        if (filters[i].getAttribute('data-flowertype')) {
                            for (let k = 0; k < flowers.length; k++) {
                                if (element.flowers_category == flowers[k]) {
                                    let exists = newItems.some(function(el){
                                        return el.id == element.id
                                    })
                                    console.log(exists)
                                    if (!exists) newItems.push(element) 
                                }
                            }
                        }
                    }
                })
                console.log(newItems)

            //console.log(newItems)



            //category

            // Перебор всех категорий

            //for (let i = 0 ; i < )

           // console.log(filterCategories)

            //console.log(colors + 'colors')
            //console.log(flowers + ' flowers')
/*
            for (let i = 0; i < filters.length; i++) {

                newItems = this.productsFullList.filter(function(number){

                    if (filters[i].getAttribute('data-category') == number.category ||
                        filters[i].getAttribute('data-flowertype') == number.flowers_category ||
                        filters[i].getAttribute('data-color') == number.color ||
                        filters[i].getAttribute('data-occasiontype') == number.occasion
                    ) {
                        return number
                    }
                })
            }
*/
            //console.log(newItems)

            //this.products = newItems
        },
        getMoreItems(){

            console.log(11111)

            let allProducts = this.$store.state.products.data

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

        axios.get('//localhost:3000/catalog_products')
            .then(response => {
                this.products = response.data
                this.productsFullList = response.data
            })
        // https://www.jonportella.com/you-are-using-browser-events-wrong/ - потом проверить, надо передать не анонимную функцию, а именованную. Иначе событие не удаляется

        //window.addEventListener('scroll', this.getMoreItems)
    },
    unmounted(){
        //window.removeEventListener('scroll', this.getMoreItems)
  }
}

</script>

<style>

.catalog-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}

.catalog-dashboard {
    width: 180px;
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
    box-sizing: border-box;
}

.preloader-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
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

.filters-title-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 14px 0;
}

.filters-section {
    border-top: 1px solid #CED0D2;
    cursor: pointer;
}
.filters-section__wrapper {
    padding-right: 30px;
    display: flex;
    justify-content: space-between;
    padding: 14px 0;
}

.filters-section__title {
    display: block;
    font-size: 18px;
    line-height: 24px;
    user-select: none;
    cursor: pointer;
}

.bottom_pic {
    display: block;
    position: absolute;
    top: 18px;
    margin: auto;
    right: 0;
    width: 18px;
    cursor: pointer;
    user-select: none;
}

.filter-items-list {
    display: none;
    list-style-type: none;
}

.opened-list .filter-items-list {
    display: block!important;
}

.opened-list .bottom_pic {
    transform: rotate(180deg);
}

.filter-item {
    list-style-type: none;
}

.filter-link {
    display: block;
    margin-bottom: 3px;
    font-size: 16px;
    line-height: 24px;
    padding: 5px 10px;
    user-select: none;
    color: #000;
}

.filter-link-choosen {
    display: block;
    background: #f6f6f6;
    border-radius: 3px;
    background-image: url('../assets/icons/exit.svg');
    background-repeat: no-repeat;
    background-size: 20px;
    background-position: 96% center;
    cursor: pointer;
}

.choosen-filters .filter-link-choosen {
    background-color: #dbddde;
}

</style>