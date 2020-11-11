<template>
<section class = "category-section">
    <h2 class = "section-slider-title">
        <span class = "products-title">{{categories.name}}</span>
        <router-link :to = "{name: 'Catalog'}" class = 'section-slider-link'>Смотреть все</router-link>
    </h2>
    <hr class = "section-hr">
    <div class = "category-slider">

        <div class = "category-slider__arrow category-slider__left" v-on:click = "slideLeft()"></div>
        <div class = "category-slider__arrow category-slider__right" v-on:click = "slideRight()"></div>
        
        <div class = "category-slider-wrapper">
            <div :class = "['category-slider__item', {'active-item': index == 0}]"
                    v-for = "(item, index) in products"
                    :key = "item.id">
                <div class="category-slider__picwrapper">
                    <img class="category-slider__pic" :src = 'require("../assets/pics/bouquets/" + item.img + "/1.jpg")' alt="">
                </div>
                <div>
                    <p class = "category-slider__title">{{item.title}}</p>
                    <p class = "category-slider__price">{{item.price}}</p>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
export default {
    name: 'SectionCarousel',
    props: {
        categories: {
            type: Object,
            default(){}
        },
        products: {
            type: Object,
            default(){}
        }
    },
    data(){
        return {
            activeElement: 0    // Активный элемент состояния слайдера
        }
    },
    methods: {
        test: function(){
            console.log(this.props)
        },

        slideRight: function(){

            const slider = event.target.parentNode
            const sliderItems = slider.querySelectorAll('.category-slider__item')
            const sliderWrapper = slider.querySelector('.category-slider-wrapper')

            if (sliderWrapper.classList.contains('moving')) return false
            if (this.activeElement >= sliderItems.length - 4) return false

            new Promise((resolve) => {

                // Добавить класс анимации движения

                sliderWrapper.classList.add('moving')

                // Сохранить в переменную длительность анимации для удобства

                this.animationDuration = parseFloat(getComputedStyle(document.querySelector('.moving'), null).transitionDuration) * 1000

                this.activeElement++

                let scrollSize = 0

                for (let i = 0; i < this.activeElement; i++) {
                    scrollSize += sliderItems[i].offsetWidth
                    scrollSize += parseFloat(getComputedStyle(sliderItems[i], null).marginRight)
                }

                // Поменять активный класс
                slider.querySelector('.active-item').classList.remove('active-item')
                sliderItems[this.activeElement].classList.add('active-item')

                sliderWrapper.style.marginLeft = -scrollSize + 'px'

                setTimeout(() => {
                    resolve()
                }, this.animationDuration)

            }).then(() => {
                // Удаление класса анимации
                sliderWrapper.classList.remove('moving')
            })
        },
        slideLeft: function(){

            const slider = event.target.parentNode
            const sliderItems = slider.querySelectorAll('.category-slider__item')
            const sliderWrapper = slider.querySelector('.category-slider-wrapper')

            if (sliderWrapper.classList.contains('moving')) return false
            if (this.activeElement <= 0) return false

            new Promise((resolve) => {

                // Добавить класс анимации движения

                sliderWrapper.classList.add('moving')

                // Сохранить в переменную длительность анимации для удобства

                this.animationDuration = parseFloat(getComputedStyle(document.querySelector('.moving'), null).transitionDuration) * 1000

                this.activeElement--

                let scrollSize = 0

                for (let i = 0; i < this.activeElement; i++) {
                    scrollSize += sliderItems[i].offsetWidth
                    scrollSize += parseFloat(getComputedStyle(sliderItems[i], null).marginRight)
                }

                // Поменять активный класс
                slider.querySelector('.active-item').classList.remove('active-item')
                sliderItems[this.activeElement].classList.add('active-item')

                sliderWrapper.style.marginLeft = -scrollSize + 'px'

                setTimeout(() => {
                    resolve()
                }, this.animationDuration)

            }).then(() => {
                // Удаление класса анимации
                sliderWrapper.classList.remove('moving')
            })
        }
    }
}
</script>

<style scoped>

.moving {
    will-change: transform;
    transition: margin .3s;
}

.products-title {
    padding-right: 15px;
}

.category-section {
    text-align: center;
    padding: 30px 0;
}

.section-slider-title {
    display: inline-block;
    font-size: 26px;
    line-height: 26px;
    color: rgb(54, 61, 64);
    padding: 0 20px;
    background: #fff;
}

.section-slider-link {
    font-size: 14px;
    line-height: 26px;
    color: rgb(54, 61, 64);
}

.section-hr {
    display: block;
    border: 0;
    margin-top: -12px;
    height: 2px;
    color: rgb(206, 208, 210);
    background-color: rgb(206,208,210);
}

.category-slider {
    position: relative;
    padding: 30px 0;
    overflow: hidden;
}

.category-slider-wrapper {
    position: relative;
    display: flex;
    width: max-content;
    margin-left: 0;
}

.category-slider__item {
    width: 270px;
    margin-right: 10px;
}

.category-slider__picwrapper {
    height: 270px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.category-slider__pic {
    max-width: 100%;
    max-height: 100%;
    display: block;
}

.category-slider__item:last-child {
    margin-right: 0;
}

.category-slider__arrow {
    position: absolute;
    top: 142px;
    margin: auto;
    width: 45px;
    height: 45px;
    background-size: cover;
    cursor: pointer;
    z-index: 2;
}

.category-slider__left {
    left: 10px;
    background-image: url('../assets/icons/left.svg');
}

.category-slider__right {
    right: 20px;
    background-image: url('../assets/icons/right.svg');
}

.category-slider__title {
    text-align: center;
    padding: 10px 5px 5px 5px;
    color: rgb(54,61,64);
    font-size: 18px;
    line-height: 20px;
}

.category-slider__price {
    text-align: center;
    padding: 10px 5px 5px 5px;
    color: rgb(54,61,64);
    font-size: 14px;
    line-height: 16px;
}

</style>