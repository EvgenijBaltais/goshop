 <template>
    <div class = "catalog-dashboard">
        <div :class="[`filters-section`, `one-option-section`, `opened-list`, categories.length ? `has-inside-content` : '']">
            <div class = "filters-section__wrapper" @click = listVisibility>
                <a class = "filters-section__title">Разделы:</a>
                <img :src="bottom_pic" alt="" class = "bottom_pic">
            </div>
            <div class = "dashboard-items-w">
                <ul class = "filter-items-list" v-if = categories.length>
                    <li class = "filter-item" v-for = "item in categories" :key = "item.id">
                        <router-link 
                            :to = "{name: 'Category_page', params: {category: `${item.url_name}`}}"
                            :class = "['filter-link', item.url_name == page_url ? 'category-link-choosen':'']"
                        >
                            {{item.name}}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if = 'this.$route.name == "Catalog"'>
            <div class="filters-title-section">
                <div class = "filters-title-wrapper">
                    <span class = "filters-text">Уточнить:</span>
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
                <div class = "dashboard-items-w">
                    <ul :class = "['filter-items-list', 'opened-list']" v-if = flowers.length>
                        <li class = "filter-item" v-for = "item in flowers" :key = "item.id">
                            <router-link
                                :to = "{path: `/catalog/${item.id}`}" 
                                :class = "['filter-link']"
                                :data-flowertype = item.id
                                @click.prevent = "getFilter(e);getFilteredProducts(e)"
                            >
                                    {{item.name}}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div :class="[`filters-section`, `several-options-section`, colors.length ? `has-inside-content` : '']">
                <div class = "filters-section__wrapper" @click = listVisibility>
                    <a class = "filters-section__title">Выбор по цвету</a>
                    <img :src="bottom_pic" alt="" class = "bottom_pic">
                </div>
                <div class = "dashboard-items-w">
                    <ul class = "filter-items-list" v-if = colors.length>
                        <li class = "filter-item" v-for = "item in colors" :key = "item.id">
                            <router-link
                                :to = "{path: `/catalog/${item.id}`}"
                                :class = "['filter-link']"
                                :data-color = item.id
                                @click.prevent = "getFilter(e);getFilteredProducts(e)"
                                >
                                    {{item.value}}
                                </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div :class="[`filters-section`, occasions.length ? `has-inside-content` : '']">
                <div class = "filters-section__wrapper" @click = listVisibility>
                    <a class = "filters-section__title">Повод</a>
                    <img :src="bottom_pic" alt="" class = "bottom_pic">
                </div>
                <div class = "dashboard-items-w">
                    <ul class = "filter-items-list" v-if = occasions.length>
                        <li class = "filter-item" v-for = "item in occasions" :key = "item.id">
                            <router-link
                                :to = "{path: `/catalog/${item.id}`}"
                                :class = "['filter-link']"
                                :data-occasiontype = item.id
                                @click.prevent = "getFilter(e);getFilteredProducts(e)"
                                >
                                    {{item.name}}
                                </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

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
    computed: {
        categories(){
            return this.$store.state.categories
        },
        flowers(){
            return this.$store.state.flowers
        },
        occasions(){
            return this.$store.state.occasions
        },
        page_url(){
            return this.$route.params.category
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
           getFilteredProducts(){

            let filters = document.getElementById('choosen-filters').querySelectorAll('.filter-link-choosen')

            // При добавлении фильтров в левой колонке сбрасываем фильтры в каталоге

            this.clearCatalogFilters()

            // категории фильтров

            let color = [],
                flowers_category = [],
                occasion = [],
                clear = 0

            for (let i = 0; i < filters.length; i++) {

                if (filters[i].getAttribute('data-flowertype')) {
                    flowers_category.push(filters[i].getAttribute('data-flowertype'))
                }
                if (filters[i].getAttribute('data-color')) {
                    color.push(filters[i].getAttribute('data-color'))
                }
                if (filters[i].getAttribute('data-occasiontype')) {
                    occasion.push(filters[i].getAttribute('data-occasiontype'))
                }
            }

                // Если все фильтры удаляются, то обнуляется каталог товаров

                if (color.length == 0 && flowers_category.length == 0 && occasion.length == 0) {
                    clear = 1
                }

            this.remakeBackground(document.querySelector('.catalog-section'))

            setTimeout(() => {
                this.$store.dispatch('add_filters', {
                    'color': color,
                    'flowers_category': flowers_category,
                    'occasion': occasion
                }).then(() => {

                    this.$store.dispatch('apply_filters', {
                        'clear': clear
                    }).then(() => {
                        this.remakeBackground(document.querySelector('.catalog-section'))
                    })
                })
            }, 250)
        },
        listVisibility(){

            let parent = this.getParent(event.target, 'filters-section')

            if (!parent.classList.contains('has-inside-content')) return false

            if (parent.classList.contains('opened-list')){

                parent.querySelector('.dashboard-items-w').style.height = 0

                parent.classList.remove('opened-list')
                return false
            }
            
            parent.classList.add('opened-list')

            parent.querySelector('.dashboard-items-w').style.height = parent.querySelector('.filter-items-list').clientHeight + 'px'

            return false;
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
            return false
        },
        clearAll: function(){
            document.getElementById('choosen-filters').innerHTML = ''

            document.querySelectorAll('.filter-link').forEach(element => {
                element.classList.remove('filter-link-choosen')
            })

            this.products = this.productsFullList
        },
        clearCatalogFilters(){

            // Обновить фильтры по алфавиту, цене и ползунки

            if (!document.querySelectorAll('input[name="filter-default"]').length) return false

            for (let i = 0; i < document.querySelectorAll('input[name="filter-default"]').length; i++) {
                if (i == 0) {
                    document.querySelectorAll('input[name="filter-default"]')[i].checked = true
                }
                else {
                    document.querySelectorAll('input[name="filter-default"]')[i].checked = false
                }
            }

            if (!document.querySelectorAll('.price-range').length) return false

            for (let i = 0; i < document.querySelectorAll('.price-range').length; i++) {
                document.querySelectorAll('.price-range')[i].value = document.querySelectorAll('.price-range')[i].dataset.numValue
            }

            document.querySelectorAll('.price-range').forEach(function (input, handle) {
                document.getElementById('range-slider').noUiSlider.setHandle(handle, input.value)
            })
        },
        clearSelectedItem: function(event){

            new Promise((resolve) => {
                document.querySelectorAll('.filter-link').forEach(element => {
                    if (element.innerText == event.target.innerText) {
                        element.classList.remove('filter-link-choosen')
                        return false
                    }
                })
                event.target.remove()
                resolve()
            }).then(() => {
                this.getFilteredProducts()
            })
        },
        getParent: function(el, cls){
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el;
        }
    }
}
</script>