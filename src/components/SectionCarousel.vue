<template>

<section class = "category-section">

    <h2 class = "section-slider-title">Праздничные букеты <a href = '' class = 'section-slider-link'>Смотреть все</a></h2>
    <hr class = "section-hr">

    <div class = "category-slider">
        
        <div class = "category-slider__arrow category-slider__left" v-on:click = "slideLeft()"></div>
        <div class = "category-slider__arrow category-slider__right" v-on:click = "slideRight()"></div>

    <div class = "category-slider-wrapper">

        <div class = "category-slider__item active-item">1
            <img class="category-slider__pic" src = "" alt="">
            <div>
                <span class = "category-slider__title"></span>
                <span class = "category-slider__price"></span>
            </div>
        </div>
        <div class = "category-slider__item">2</div>
        <div class = "category-slider__item">3</div>
        <div class = "category-slider__item">4</div>
        <div class = "category-slider__item">5</div>
        <div class = "category-slider__item">6</div>
        <div class = "category-slider__item">7</div>
        <div class = "category-slider__item">8</div>
        <div class = "category-slider__item">9</div>
        <div class = "category-slider__item">10</div>

        <div class = "category-slider__item">11</div>
        <div class = "category-slider__item">12</div>
        <div class = "category-slider__item">13</div>
        <div class = "category-slider__item">14</div>
        <div class = "category-slider__item">15</div>
        <div class = "category-slider__item">16</div>
        <div class = "category-slider__item">17</div>
        <div class = "category-slider__item">18</div>
        <div class = "category-slider__item">19</div>
    </div>
    </div>

</section>

</template>

<script>
export default {
    name: 'SectionCarousel',
    data(){
        return {}
    },
    methods: {

        slideLeft: function(){

            const slider = event.target.parentNode
            const sliderWrapper = slider.querySelector('.category-slider-wrapper')

            if (sliderWrapper.classList.contains('moving')) return false

            // Добавить класс анимации движения

            sliderWrapper.classList.add('moving')

            const sliderItems = slider.querySelectorAll('.category-slider__item')
            let activeItem = slider.querySelector('.active-item')

            // Определить номер активного элемента в общем массиве

            let index = (() => {
                for (let i = 0; i <  sliderItems.length; i++) {
                    if (activeItem == sliderItems[i]) return i;
                }
            })()

            if (index >= sliderItems.length - 3) return false

            let scrollSize = 0

            for (let i = 0; i < index; i++) {
                scrollSize += sliderItems[i].offsetWidth
                scrollSize += parseFloat(getComputedStyle(sliderItems[i], null).marginRight)
            }

            new Promise((resolve) => {

                // Поменять активный класс

                activeItem.nextSibling.classList.add('active-item')
                activeItem.classList.remove('active-item')

                sliderWrapper.style.marginLeft = -scrollSize + 'px'

                resolve()
            }).then(() => {
                // Удаление класса анимации
                sliderWrapper.classList.remove('moving')
            })
        },
        slideRight: function(){
            const slider = event.target.parentNode
            const sliderWrapper = slider.querySelector('.category-slider-wrapper')

            if (sliderWrapper.classList.contains('moving')) return false
            // Добавить класс анимации движения

            sliderWrapper.classList.add('moving')

            const sliderItems = slider.querySelectorAll('.category-slider__item')
            let activeItem = slider.querySelector('.active-item')

            // Определить номер активного элемента в общем массиве

            let index = (() => {
                for (let i = 0; i < sliderItems.length; i++) {
                    if (activeItem == sliderItems[i]) return i;
                }
            })()

            if (index <= 0) return false

            let scrollSize = 0

            for (let i = 0; i < index - 2; i++) {
                scrollSize += sliderItems[i].offsetWidth
                scrollSize += parseFloat(getComputedStyle(sliderItems[i], null).marginRight)
            }

            new Promise((resolve) => {

                // Поменять активный класс

                activeItem.previousSibling.classList.add('active-item')
                activeItem.classList.remove('active-item')

                sliderWrapper.style.marginLeft = -scrollSize + 'px'

                resolve()
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
    transition: margin-left 2s;
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
    display: flex;
    width: max-content;
    margin-left: 0;
}

.category-slider__item {
    width: 270px;
    min-height: 270px;
    margin-right: 10px;
    outline: 1px solid green;
}

.category-slider__item:last-child {
    margin-right: 0;
}

.category-slider__pic {

}

.category-slider__arrow {
    position: absolute;
    top: 0;
    bottom: 0;
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
    font-size: 24px;
    line-height: 24px;
}

.category-slider__price {
    text-align: center;
    padding: 10px 5px 5px 5px;
    color: rgb(54,61,64);
    font-size: 14px;
    line-height: 16px;
}

</style>