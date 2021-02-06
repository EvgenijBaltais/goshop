 <template>
    <div class = "catalog-dashboard">
        <div :class="[`filters-section`, `one-option-section`, `opened-list`, categories.length ? `has-inside-content` : '']">
            <div class = "filters-section__wrapper" @click = listVisibility>
                <a class = "filters-section__title">Категория</a>
                <img :src="bottom_pic" alt="" class = "bottom_pic">
            </div>
            <ul class = "filter-items-list" v-if = categories.length>
                <li class = "filter-item" v-for = "item in categories" :key = "item.id">
                    <router-link 
                        :to = "{path: `/catalog/${item.url_name}/`}"
                        :class = "['filter-link', item.url_name == page_url ? 'category-link-choosen':'']"
                        :data-category = item.id
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

                console.log(colors)
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
    }
}
</script>