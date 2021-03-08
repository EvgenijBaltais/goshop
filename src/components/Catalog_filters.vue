<template>
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
                        <label for="radio-2" class = "price-change" id = "price-min-to-max" @click = "remakeCatalog">По цене (от <span class = "min-val"></span> до <span class = "max-val"></span> рублей)</label>
                    </div>
                    <div class="form_radio">
                        <input id="radio-3" type="radio" name="filter-default" value="3">
                        <label for="radio-3" class = "price-change" id = "price-max-to-min" @click = "remakeCatalog">По цене (от <span class = "max-val"></span> до <span class = "min-val"></span> рублей)</label>
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
                                <input type="text" class = "price-range price-range-from" id = "price-range-from">
                                <span class = "bold-text">руб.</span>
                            </label>
                            <label for="price-range-to">
                                <span class = "bold-text">До:</span>
                                <input type="text" class = "price-range price-range-to" id = "price-range-to">
                                <span class = "bold-text">руб.</span>
                            </label>
                            <button type = "button" class = "get-range-query" id = "get-range-query">Подобрать</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
</template>

<script>

import noUiSlider from 'nouislider'
import 'nouislider/distribute/nouislider.css'

export default {
    data(){
        return {}
    },
    methods: {
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

            let ev = event.target,
                id = this.getParent(ev, 'form_radio').querySelector('.price-change').getAttribute('id')

            if (this.getParent(ev, 'form_radio').querySelector('input[type="radio"]').checked) return false

            new Promise((resolve) => {

                this.remakeBackground(document.querySelector('.catalog-section'))

                setTimeout(() => {
                    resolve()
                }, 250)

            }).then(() => {
                this.$store.dispatch('sort_catalog', {
                    'type': id,
                    'category': this.$route.params.category
                }).then(() => {
                    this.remakeBackground(document.querySelector('.catalog-section'))
                })
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
        clearFilters(){

            if (!document.querySelectorAll('input[name="filter-default"]').length) return false

            for (let i = 0; i < document.querySelectorAll('input[name="filter-default"]').length; i++) {
                if (i == 0) {
                    document.querySelectorAll('input[name="filter-default"]')[i].checked = true
                }
                else {
                    document.querySelectorAll('input[name="filter-default"]')[i].checked = false
                }
            }
        },
        getParent: function(el, cls){
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el;
        }
    },
    beforeMount(){

        let $this = this

        this.$store.dispatch('get_catalog_state').then(() => {

                let min = 0, max = 1,
                    from = document.getElementById('price-range-from'),
                    to = document.getElementById('price-range-to'),
                    inputs = [from, to],
                    stepsSlider = document.getElementById('range-slider')

                // Определить минимальную и максимальную цены

                for (let i = 0; i < this.$store.state.catalog_state.length; i++) {

                    let item = this.$store.state.catalog_state[i].price

                    if (max < item) max = item
                    if (min == 0) min = item
                    if (min > item) min = item
                }

                // Записать минимальную и максимальную цены в соответствующие классы

                for (let i = 0; i < document.querySelectorAll('.min-val').length; i++) {
                    document.querySelectorAll('.min-val')[i].innerText = min
                }

                for (let i = 0; i < document.querySelectorAll('.max-val').length; i++) {
                    document.querySelectorAll('.max-val')[i].innerText = max
                }

                inputs[0].dataset.numValue = min
                inputs[1].dataset.numValue = max

                // Ползунок-слайдер с минимальной и максимальной ценой

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

            stepsSlider.noUiSlider.on('start', function () {

                $this.clearFilters()
                $this.remakeBackground(document.querySelector('.catalog-section'))
            })

            stepsSlider.noUiSlider.on('end', function (values) {

                $this.$store.dispatch('sort_catalog', {
                    'type': 'slider',
                    'min': values[0],
                    'max': values[1]
                }).then(() => {
                    $this.remakeBackground(document.querySelector('.catalog-section'))
                })
            })

            // Listen to keydown events on the input field.
            inputs.forEach(function (input, handle) {
                input.addEventListener('keydown', function () {
                    if (event.keyCode == 13) stepsSlider.noUiSlider.setHandle(handle, this.value)
                })
            })

            document.querySelector('.get-range-query').addEventListener('click', function(e){
                e.preventDefault()

                $this.remakeBackground(document.querySelector('.catalog-section'))

                $this.clearFilters()

                setTimeout(() => {
                    $this.$store.dispatch('sort_catalog', {
                        'type': 'slider',
                        'min': inputs[0].value,
                        'max': inputs[1].value
                    }).then(() => {
                        $this.remakeBackground(document.querySelector('.catalog-section'))
                    })
                }, 250)
            })
        })
    }
}
</script>