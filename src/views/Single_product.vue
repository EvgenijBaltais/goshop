<template>
<div class = "single-product">
    <div class = "product-carousel">
        <div class="product-slider">
            <div class="product-slider__mainview">
                <img :src = "require('../assets/pics/products/' + [images.length ? images[0].id : 1] + '.jpg')" alt="" :class = "['product-slider__bimg']">
            </div>
            <div class="product-slider__navigation">
                <div class = "product-slider__wrapper">
                    <div 
                        v-for = "(item, index) in images"
                        :key = "item.id"
                        @click = "moveCarousel()"
                        :class = "['product-slider__simg', {'product-slider__active-img': index == 0}]"
                        :style = "{backgroundImage: `url(${require('../assets/pics/products/' + item.id + '.jpg')})`}">
                    </div>
                </div>
                <div class = "prod-arrow-left" @click = "moveCarouselLeft()"></div>
                <div class = "prod-arrow-right" @click = "moveCarouselRight()"></div>
            </div>
        </div>
    </div>
    <div class = "product-description">
        <div class = "product-title">
            <div class="product-description__title">
                <span class = "product-description__span bold-text">{{product.title}}</span>
            </div>
            <div class="product-description__price">
                <span class="product-description__span">{{product.price}} р</span>
            </div>
        </div>
        <div class = "product-text">
            <p class = "product-text__p">{{product.description}}</p>
        </div>
        <div class="product-contains" v-on:click = "openContainer()">
            <div class="product-contains__title">
                <span>Состав букета</span>
                <img src="../assets/icons/to-bottom.svg" alt="" class = "to-bottom-arrow">
            </div>
            <div class="product-contains__inside">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis consequuntur numquam fuga! Dolorum sapiente necessitatibus, dicta totam eaque sit laborum quasi quas, deserunt natus saepe fugiat. Molestiae praesentium accusantium eius?
            </div>
        </div>
        
        <datepicker-lite 
          :id-attr="datepickerSetting.id"
          :name-attr="datepickerSetting.name"
          :class-attr="datepickerSetting.class"
          :value-attr="datepickerSetting.value"
          :year-minus="datepickerSetting.yearMinus"
          :from="datepickerSetting.fromDate"
          :to="datepickerSetting.toDate"
          :disabled-date="datepickerSetting.disabledDate"
          :locale="datepickerSetting.locale"
          @value-changed="datepickerSetting.changeEvent"
        />
        
        <div @click = "addToCart()">
            <button class="item-order">Оформить заказ</button>
        </div>
    </div>
</div>
</template>

<script>
import DatepickerLite from 'vue3-datepicker-lite';
import axios from 'axios'

export default {
    name: 'Single_product',
    components: { DatepickerLite },
    data(){
        return {
            product: {},
            images: [],
            datepickerSetting: {
              id: "birthday",
              name: "birthday",
              class: "myDateInput",
              value: "2020/10/01",
              yearMinus: 0,
              fromDate: "2010/02/10",
              toDate: "2030/12/10",
              disabledDate: [
                "2020/10/02",
                "2020/10/03",
                "2020/10/04",
                "2020/10/05",
                "2020/10/06",
              ],
              locale: {
                weekday: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                todayBtn: "Today",
                clearBtn: "Clear",
                closeBtn: "Close",
              },
              changeEvent: (value) => {
                console.log(value + " selected!");
              }
            }
        }
    },
    methods: {
        openContainer: function(){
            if (!(event.target.classList.contains('product-contains') || this.getParent(event.target, 'product-contains'))) {
            return false
            }

            let productContains = document.querySelector('.product-contains')
                productContains.classList.contains('product-contains-opened') ? 
                productContains.classList.remove('product-contains-opened') : 
                productContains.classList.add('product-contains-opened')
        },
        moveCarousel: function(){

            if (event.target.classList.contains('product-slider__active-img')) {
                return false
            }

            let parent = this.getParent(event.target, 'product-slider__wrapper'),
                width = event.target.offsetWidth + parseFloat(getComputedStyle(event.target, null).marginRight.replace("px", "")),
                elementIndex = 0,
                path = ''

                // Поменять активный элемент

                parent.querySelector('.product-slider__active-img').classList.remove('product-slider__active-img')
                event.target.classList.add('product-slider__active-img')

                // Определить номер активного элемента

                for (let i = 0; i < parent.querySelectorAll('.product-slider__simg').length; i++) {
                    if (parent.querySelectorAll('.product-slider__simg')[i].classList.contains('product-slider__active-img')) {
                        elementIndex = i
                        break
                    }
                }

                path = require('../assets/pics/products/' + this.images[elementIndex].id + '.jpg')
                document.querySelector('.product-slider__bimg').setAttribute('src', path)

                if (elementIndex < 1) return false

                // Проиграть анимацию

                parent.style.marginLeft = -(elementIndex - 1) * width + 'px'
        },
        moveCarouselLeft(){

            let parent = document.querySelector('.product-slider__wrapper'),
                items = document.querySelectorAll('.product-slider__simg'),
                elementIndex = 0,
                width = 0,
                path = ''

            // Если карусель в начальной позиции то return false

            if (items[0].classList.contains('product-slider__active-img')) {
                return false
            }

            // Определить номер активного элемента

            for (let i = 0; i < items.length; i++) {
                if (items[i].classList.contains('product-slider__active-img')) {
                    elementIndex = i
                    break
                }
            }

            items[elementIndex].classList.remove('product-slider__active-img')
            elementIndex -= 1
            items[elementIndex].classList.add('product-slider__active-img')

            path = require('../assets/pics/products/' + this.images[elementIndex].id + '.jpg')
            document.querySelector('.product-slider__bimg').setAttribute('src', path)


            if (elementIndex == 0) return false

            width = items[elementIndex].offsetWidth + parseFloat(getComputedStyle(items[elementIndex], null).marginRight.replace("px", ""))
            parent.style.marginLeft = -(elementIndex - 1) * width + 'px'
        },
        moveCarouselRight(){
            let parent = document.querySelector('.product-slider__wrapper'),
                items = document.querySelectorAll('.product-slider__simg'),
                elementIndex = 0,
                width = 0,
                path = ''

            // Если карусель в начальной позиции то return false

            if (items[items.length - 1].classList.contains('product-slider__active-img')) {
                return false
            }

            // Определить номер активного элемента

            for (let i = 0; i < items.length; i++) {
                if (items[i].classList.contains('product-slider__active-img')) {
                    elementIndex = i
                    break
                }
            }

            items[elementIndex].classList.remove('product-slider__active-img')
            elementIndex += 1
            items[elementIndex].classList.add('product-slider__active-img')

            path = require('../assets/pics/products/' + this.images[elementIndex].id + '.jpg')
            document.querySelector('.product-slider__bimg').setAttribute('src', path)

            if (elementIndex == items[items.length - 1]) return false

            width = items[elementIndex].offsetWidth + parseFloat(getComputedStyle(items[elementIndex], null).marginRight.replace("px", ""))
            parent.style.marginLeft = -(elementIndex - 1) * width + 'px'
        },
        addToCart() {
            this.$store.dispatch({
                type: 'addToCart',
                id: this.product_id,
                amount: 1
            })
        },
        getParent: function(el, cls){
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el;
        },
        getClickedElementIndex: function(arr) {
            for (let i = 0; i < arr.length; i++) {
                if (event.target == arr[i]) return i;
            }
        }
    },
    computed: {
        product_id(){
            return this.$route.params.id
        }
    },
    mounted(){

            // Инфа о товаре

            axios
            .get('//localhost:3000/products/id', {
                method: 'GET',
                params: {
                    'id': this.$route.params.id
                }
            }).then(response => {
                this.product = response.data[0]
            })

            // Картинки

            axios.get('//localhost:3000/images/id', {
                method: 'GET',
                params: {
                    'id': this.$route.params.id
                }
            }).then(response => {
                this.images = response.data
            })
    }
}
</script>

<style>

.bold-text {
    font-weight: bold;
}

.single-product {
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
}

.product-carousel {
    width: calc(50% - 30px);
}

.product-slider__mainview {
    display: flex;
    align-items: center;
    width: 100%;
    height: 500px;
    padding: 0;
    box-sizing: border-box;
}

.product-slider__bimg {
    display: block;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
}

.product-slider__simg {
    flex-basis: 100px;
    border: 2px solid transparent;
    box-sizing: border-box;
    width: 97px;
    height: 97px;
    margin-right: 10px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    cursor: pointer;
}

.product-slider__active-img {
    box-sizing: border-box;
    border: 3px solid rgb(139,191,211);
}

.product-slider__wrapper {
    display: flex;
    transition: margin .3s;
}

.product-slider__navigation {
    position: relative;
    padding: 20px 0;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: hidden;
}

.product-slider__navigation:after{
    flex-basis: 100px;
    content: "";
}

.product-slider__navigation:hover .prod-arrow-left {
    display: block;
}
.product-slider__navigation:hover .prod-arrow-right {
    display: block;
}

.prod-arrow-left {
    display: none;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 0;
    left: 5px;
    bottom: 0;
    margin: auto;
    background-repeat: no-repeat;
    background-image: url('../assets/icons/left.svg');
    background-color: rgba(255,255,255,.5);
    border-radius: 50%;
    cursor: pointer;
}

.prod-arrow-right {
    display: none;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 0;
    right: 5px;
    bottom: 0;
    margin: auto;
    background-repeat: no-repeat;
    background-image: url('../assets/icons/right.svg');
    background-color: rgba(255,255,255,.5);
    border-radius: 50%;
    cursor: pointer;
}

.product-description {
    width: 50%;
}

.product-title {
    padding-top: 5px;
    display: flex;
    justify-content: space-between;
}

.product-description__title {
    padding-right: 20px;
    box-sizing: border-box;
}

.product-description__span {
    font-size: 24px;
    line-height: 30px;
}

.product-text__p {
    padding: 10px 0 20px 0;
    font-size: 16px;
    line-height: 20px;
}

.product-contains {
    margin: 10px 0;
    border-top: 1px solid #E4E4E4;
    border-bottom: 1px solid #E4E4E4;
    padding: 10px;
}

.product-contains__title {
    display: flex;
    position: relative;
    padding-right: 30px;
    box-sizing: border-box;
    font-size: 18px;
    line-height: 30px;
    cursor: pointer;
    user-select: none;
}

.product-contains-opened .product-contains__title {
    font-weight: bold;
}

.to-bottom-arrow {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    display: block;
    width: 14px;
    transition: transform .3s;
}

.product-contains-opened .to-bottom-arrow {
    transform: rotate(180deg);
    transition: transform .3s;
}

.product-contains__inside {
    padding-top: 10px;
    box-sizing: border-box;
    display: none;
}

.product-contains-opened .product-contains__inside {
    display: block;
}

.item-order {
    display: block;
    margin: 20px 0;
    border-radius: 3px;
    width: 100%;
    height: 90px;
    font-size: 20px;
    line-height: 90px;
    color: #292B2C;
    font-weight: bold;
    cursor: pointer;
    border: 0;
    outline: 0;
    background: #AFD7BB;
    transition: background-color .2s;
}

.item-order:hover {
    background: #BCE4C8;
    transition: background-color .2s;
}

</style>