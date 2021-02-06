<template>
<section class = "category-section">
    <h2 class = "section-slider-title">
        <span class = "products-title">{{categories.name}}</span>
        <router-link :to = "{name: 'Catalog'}" class = 'section-slider-link'>Смотреть все</router-link>
    </h2>
    <hr class = "section-hr">
    <div class = "category-slider">
        <div class = "category-slider__arrow category-slider__left" @click = "slideLeft()"></div>
        <div class = "category-slider__arrow category-slider__right" @click = "slideRight()"></div>     
        <div class = "category-slider-wrapper">
            <div :class = "['category-slider__item', {'active-item': index == 0}]"
                    v-for = "(item, index) in products"
                    :key = "item.id"
                    :data-id = item.id
            >
                <div class="category-slider__picwrapper">
                    <router-link :to = "{path: `/catalog/${item.category_url}/${item.id}`}" class = "category-slider__link">
                        <img class="category-slider__pic" :src = 'require("../assets/pics/bouquets/" + item.img + "/1.jpg")' alt="">
                    </router-link>
                </div>
                <div>
                    <div class="product-nav">
                        <div class = "item-add-remove">
                            <div class = "decrease-value" @click = decreaseValue>−</div>
                            <div class = "item-value-block">
                                <input type="text" class = "item-value" value = "1" readonly = "readonly">
                            </div>
                            <div class = "increase-value" @click = increaseValue>+</div>
                            <div class = "item-order-options">
                                <div :class = "['product-button', 'product-favorite', {'product-favorite-active': favoriteItems.includes(item.id)}]" @click = "checkActive" data-info = "В избранное">
                                    <div class = "product-button-inset">
                                        <div class = "product-button-anim-first"></div>
                                        <div class = "product-button-anim-second"></div>
                                    </div>
                                </div>
                                <div class = "product-button product-loupe" @click = "showGallery" data-info = "Смотреть фото">
                                    <div class = "product-button-inset">
                                        <div class = "product-button-anim-first"></div>
                                        <div class = "product-button-anim-second"></div>
                                    </div>
                                </div>
                                <router-link :to = "{path: `/catalog/${item.category_url}/${item.id}`}" class = "product-button product-watch" data-info = "Подробнее">
                                    <div class = "product-button-inset">
                                        <div class = "product-button-anim-first"></div>
                                        <div class = "product-button-anim-second"></div>
                                    </div>
                                </router-link>
                                <div class = "product-button product-order" data-info = "Заказать!" @click = addToCart>
                                    <div class = "product-button-inset">
                                        <div class = "product-button-anim-first"></div>
                                        <div class = "product-button-anim-second"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <router-link :to = "{path: `/catalog/${item.category_url}/${item.id}`}" class = "category-slider__title">{{item.title}}</router-link>
                    <p class = "category-slider__price">{{item.price}} руб.</p>
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
        }
    },
    data(){
        return {
            activeElement: 0    // Активный элемент состояния слайдера
        }
    },
    methods: {
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
        },
        increaseValue: function(){
            let parent = this.getParent(event.target, 'item-add-remove'),
                value = parseInt(parent.querySelector('.item-value').value)
                value < 100 ? parent.querySelector('.item-value').value = value + 1 : ''
        },
        decreaseValue: function(){
            let parent = this.getParent(event.target, 'item-add-remove'),
                value = parseInt(parent.querySelector('.item-value').value)
                value < 1 ? '' : parent.querySelector('.item-value').value = value - 1
        },
        checkActive(){

            let parent = this.getParent(event.target, 'product-button')
            
                parent.classList.contains('product-favorite-active') ?
                parent.classList.remove('product-favorite-active') :
                parent.classList.add('product-favorite-active')

                this.addToFavorite(event.target)
        },
        addToFavorite(el){

            for (let i = 0; i < this.products.length; i++) {

                if (this.products[i].id == this.getParent(el, 'category-slider__item').getAttribute('data-id')) {

                    // Найти в массиве товаров по id нужный объект с данными по элементу и отправить в state с избранным
                    this.$store.dispatch({
                        type: 'changeFavorite',
                        product: this.products[i]
                    })
                    break
                }
            }
        },
        addToCart() {

            let parent = this.getParent(event.target, 'category-slider__item'),
                id = parent.getAttribute('data-id'),
                amount = parseInt(parent.querySelector('.item-value').value)

            if (amount <= 0) return false

            new Promise((resolve) => {
                this.$store.dispatch({
                    type: 'addToCart',
                    id: id,
                    amount: amount
                })
                resolve()
            }).then(() => {

                let wrapper, success

                    new Promise(resolve => {

                        if (document.querySelectorAll('.cart-status-wrap').length == 0) {
                            wrapper = `<div class = "cart-status-wrap"></div>`
                            document.getElementById('app').insertAdjacentHTML('afterbegin', wrapper)
                        }

                        success = `<div class = "wrap-success">
                                        <div>${parent.querySelector('.category-slider__title').innerText + " в корзине!"}</div>
                                    </div>`

                        document.querySelector('.cart-status-wrap').insertAdjacentHTML('afterbegin', success)
                        document.querySelector('.cart-status-wrap')
                            .querySelector('.wrap-success')
                            .querySelector('div')
                            .classList.add('cart-success')

                        resolve()
                    }).then(() => {
                        setTimeout(() => {
                            let wrapper = document.querySelector('.cart-status-wrap'),
                                lastSuccess = wrapper.querySelectorAll('.cart-success')[wrapper.querySelectorAll('.cart-success').length - 1]
                                lastSuccess.parentNode.removeChild(lastSuccess);

                                if (wrapper.querySelectorAll('.cart-success').length == 0) wrapper.parentNode.removeChild(wrapper);
                        }, 2000)
                    })
            })
        },
        showGallery: function(){

            let product_id = this.getParent(event.target, 'category-slider__item').getAttribute('data-id')

            if (!product_id) return false

                // Всплывающий блок с галереей
                let overlay = document.createElement('div')
                    overlay.classList.add('overlay')
                let closeGallery = this.closeGallery
                    overlay.addEventListener('click', function(e){
                        if (e.target.classList.contains('gallery') || e.target.classList.contains('gallery-img')) return false
                        closeGallery()
                    })

                // Галерея
                let gallery = document.createElement('div')
                    gallery.classList.add('gallery')

                // Закрытие
                let close = document.createElement('div')
                    close.classList.add('gallery-close')
                
                // Картинка

                let pic = document.createElement('img')
                    pic.classList.add('gallery-img')

                    try{
                        pic.src = `${require('../assets/pics/bouquets/' + product_id + '/1.jpg')}`
                    }
                    catch(e){
                        pic.src = `${require('../assets/icons/no-image.png')}`
                        gallery.style.background = "#fff"
                        gallery.style.display = "flex"
                        gallery.style.alignItems = "center"
                        gallery.style.padding = '100px 0'
                    }
     
                overlay.appendChild(gallery)
                gallery.appendChild(pic)
                gallery.appendChild(close)
                document.body.appendChild(overlay)

            this.body_lock()
        },
        closeGallery: function(){
            document.querySelector('.overlay').remove()
            this.body_unlock()
        },
        getParent: function(el, cls){
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el;
        },
        body_lock: function() {
            let body = document.querySelector('body')
            if (!body.classList.contains('scroll-locked')) {
                let bodyScrollTop = (typeof window.pageYOffset !== 'undefined') ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                body.classList.add('scroll-locked');
                body.style.top = "-" + bodyScrollTop + "px"
                body.setAttribute("data-popup-scrolltop", bodyScrollTop)
            }
        },
        body_unlock: function() {

            let body = document.querySelector('body')

            if (body.classList.contains('scroll-locked')) {
                let bodyScrollTop = body.getAttribute("data-popup-scrolltop");
                body.classList.remove('scroll-locked');
                body.style.top = ""
                body.removeAttribute("data-popup-scrolltop")
                window.scrollTo(0, bodyScrollTop)
            }
        }
    },
    computed: {
        favoriteItems(){

            let arr = []

            for (let i = 0; i < this.$store.state.favorite.length; i++) {
                arr.push(this.$store.state.favorite[i].id)
            }
            return arr
        },
        products(){

            let categoryContent = []
            
            if (!this.$store.state.products.data) return []

            for (let i = 0; i < this.$store.state.products.data.length; i++) {

                if (this.$store.state.products.data[i].category == this.categories.id)
                categoryContent.push(this.$store.state.products.data[i])
            }

            return categoryContent
        }
    },
    mounted(){

    }
}
</script>

<style>

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
    padding: 30px 0 0 0;
    overflow: hidden;
}

.category-slider-wrapper {
    position: relative;
    display: flex;
    width: max-content;
    margin-left: 0;
}

.category-slider__item {
    width: 260px;
    margin-right: 23px;
}

.category-slider__picwrapper {
    height: 270px;
    padding-bottom: 20px;
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
    display: block;
    text-align: center;
    padding: 10px 5px 5px 5px;
    color: rgb(54,61,64);
    font-size: 18px;
    line-height: 20px;
}

.category-slider__price {
    text-align: center;
    font-weight: bold;
    padding: 10px 5px 5px 5px;
    color: rgb(54,61,64);
    font-size: 18px;
    line-height: 20px;
}

.category-slider__link {
    display: flex;
    align-items: center;
    height: 100%;
}

.product-nav {
    margin: 5px 0;
}

.item-add-remove {
    width: 220px;
    margin: 0 auto;
    display: flex;
}

.item-value-block {
    width: 34px;
    height: 30px;
    user-select: none;
}

.item-value-block .item-value {
    display: block;
    margin: 0% auto;
    text-align: center;
    font-size: 20px;
    line-height: 30px;
    font-family: Arial, Helvetica, sans-serif;
    width: 34px;
    height: 30px;
    outline: 0;
    border: 0;
    user-select: none;
    color: #000!important;
}

.decrease-value {
    width: 20px;
    height: 30px;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 30px;
    line-height: 32px;
    cursor: pointer;
    user-select: none;
}

.increase-value {
    width: 20px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 30px;
    line-height: 30px;
    cursor: pointer;
    user-select: none;
}

.item-order-options {
    width: 132px;
    display: flex;
    margin-left: auto;
    justify-content: space-between;
}

.watch-item {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #94cbe0;
    background-image: url('../assets/icons//eye.svg');
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
}

.order-item {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #94cbe0;
    background-image: url('../assets/icons/cart-white.svg');
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
}

.product-button-inset {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 60px;
    background-color: #94CBE0;
    -webkit-transition: .3s ease;
    -moz-transition: .3s ease;
    -o-transition: .3s ease;
    transition: .3s ease;
}

.product-button-inset:hover {
    bottom: -30px;
    background: #6FA6BB;
    transition: background-color .3s;
    transition: bottom .3s;
}

.product-button-anim-first {
    width: 30px;
    height: 30px;
    font-size: 15px;
    line-height: 30px;
}

.product-button-anim-second {
    width: 30px;
    height: 30px;
    font-size: 15px;
}

.product-buttons-container {
    position: relative;
    width: 200px;
    margin: auto;
    display: flex;
    justify-content: space-between;
}

.product-button {
    display: block;
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
}

/* Кнопки в карточке продуктов */

.products-amount {
    color: #fff;
    line-height: 30px;
}

.product-plus {
    font-size: 16px;
    line-height: 30px;
}

.product-watch {
    display: block;
    text-decoration: none;
}

.product-order {
    display: block;
    text-decoration: none;
}

.product-watch .product-button-anim-first {
    background-image: url('../assets/icons/eye.svg');
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: center;
}

.product-watch .product-button-anim-second {
    background-image: url('../assets/icons/eye.svg');
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: center;
}

.product-order .product-button-anim-first {
    background-image: url('../assets/icons/cart-white.svg');
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: center;
}

.product-order .product-button-anim-second {
    background-image: url('../assets/icons/cart-white.svg');
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: center;
}

.product-favorite .product-button-anim-first {
    background-image: url('../assets/icons/heart.svg');
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: center;
}

.product-favorite .product-button-anim-second {
    background-image: url('../assets/icons/heart.svg');
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: center;
}

.product-favorite-active .product-button-anim-first {
    background-image: url('../assets/icons/heart-red.svg');
}

.product-favorite-active .product-button-anim-second {
    background-image: url('../assets/icons/heart-red.svg');
}

.product-loupe .product-button-anim-first {
    background-image: url('../assets/icons/loupe-white.svg');
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: center;
}

.product-loupe .product-button-anim-second {
    background-image: url('../assets/icons/loupe-white.svg');
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: center;
}

/* Кнопки в карточке продуктов */

</style>