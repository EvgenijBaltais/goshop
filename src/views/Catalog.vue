<template>

<button class = "get-items" @click = "getMaxObjId()">Получить товары</button>
<div class = "catalog-wrapper">
    <div class = "catalog-dashboard">
        <div class="filters-title-section">
            <div class = "filters-title-wrapper">
                <span class = "filters-text">Фильтры:</span>
                <a class = "clear-text">Сбросить все</a>
            </div>
            <div class = "choosen-filters" id = "choosen-filters"></div>
        </div>
        <div :class="[`filters-section`, flowers.length ? `has-inside-content` : '']">
            <div class = "filters-section__wrapper" v-on:click = listVisibility>
                <a class = "filters-section__title">Выбрать цветы</a>
                <img :src="bottom_pic" alt="" class = "bottom_pic">
            </div>
            <ul class = "filter-items-list" v-if = flowers.length>
                <li class = "filter-item" v-for = "item in flowers" :key = "item.id">
                    <router-link :to = "{path: `/catalog/${item.id}`}" class = "filter-link">{{item.name}}</router-link>
                </li>
            </ul>
        </div>
        <div :class="[`filters-section`, categories.length ? `has-inside-content` : '']">
            <div class = "filters-section__wrapper" v-on:click = listVisibility>
                <a class = "filters-section__title">Категория</a>
                <img :src="bottom_pic" alt="" class = "bottom_pic">
            </div>
            <ul class = "filter-items-list" v-if = categories.length>
                <li class = "filter-item" v-for = "item in categories" :key = "item.id">
                    <router-link :to = "{path: `/catalog/${item.id}`}" class = "filter-link">{{item.name}}</router-link>
                </li>
            </ul>
        </div>
        <div :class="[`filters-section`, colors.length ? `has-inside-content` : '']">
            <div class = "filters-section__wrapper" v-on:click = listVisibility>
                <a class = "filters-section__title">Выбор по цвету</a>
                <img :src="bottom_pic" alt="" class = "bottom_pic">
            </div>
            <ul class = "filter-items-list" v-if = colors.length>
                <li class = "filter-item" v-for = "item in colors" :key = "item.id">
                    <router-link :to = "{path: `/catalog/${item.id}`}" class = "filter-link">{{item.value}}</router-link>
                </li>
            </ul>
        </div>
        <div class="filters-section has-inside-content">
            <div class = "filters-section__wrapper">
                <a class = "filters-section__title">Повод</a>
                <img :src="bottom_pic" alt="" class = "bottom_pic">
            </div>
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
            bottom_pic: require('../assets/icons/to-bottom-pic.svg'),
            loading: 0,
            id: 111
        }
    },
    components: {
        Catalog_item
    },
    computed: {
        items(){
            console.log('вызов')
            return this.$store.state.catalogItems
        },
        categories(){
            return this.$store.state.categories
        },
        flowers(){
            return this.$store.state.flowers
        },
        colors(){

            let items = this.$store.state.colors

                for (let item in items) {
                    if (!items[item].value) continue
                    items[item].value = items[item].value[0].toUpperCase() + items[item].value.slice(1)
                }

            return items
        }
    },
    methods: {
        ...mapActions([
            'getMoreCatalogItems',
            'getFlowersTypes'
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
        },
        listVisibility(){

            let parent = this.getParent(event.target, 'filters-section')

            if (!parent.classList.contains('has-inside-content')) return false

            if (parent.querySelector('.filter-items-list').classList.contains('opened-list')){
                parent.querySelector('.filter-items-list').classList.remove('opened-list')
                return false
            }
            
            parent.querySelector('.filter-items-list').classList.add('opened-list')

            return false;
        },
        getParent: function(el, cls){
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el;
        }
    },
    created() {
        window.addEventListener('scroll', this.getMoreItems)
        this.$store.dispatch('get_catalog')
        this.$store.dispatch('get_flowers_types')
        this.$store.dispatch('get_categories_data')
        this.$store.dispatch('get_all_colors')
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
    box-sizing: border-box;
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

.opened-list {
    display: block!important;
}

.filter-item {
    list-style-type: none;
}

.filter-link {
    display: block;
    font-size: 16px;
    line-height: 24px;
    padding: 5px 10px;
    user-select: none;
    color: #000;
}


</style>