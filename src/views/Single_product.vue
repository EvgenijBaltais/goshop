<template>
<div class = "single-product">
    <div class = "product-carousel">
        <div class="product-slider">
            <div class="product-slider__mainview">
                <img :src = "require('../assets/pics/bouquets/' + [product.img ? product.img : 1] + '/1.jpg')" alt="" class = "product-slider__bimg">
            </div>
            <div class="product-slider__navigation">
                <div @click = "changeSliderPic" :class = "['product-slider__simg', 'product-slider__active-img']" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/1.jpg')})`}" data-category = "2" data-item = "1"></div>
                <div @click = "changeSliderPic" :class = "['product-slider__simg']" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/2.jpg')})`}" data-category = "2" data-item = "1"></div>
                <div @click = "changeSliderPic" :class = "['product-slider__simg']" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/3.jpg')})`}" data-category = "2" data-item = "3"></div>
                <div @click = "changeSliderPic" :class = "['product-slider__simg']" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/1.jpg')})`}" data-category = "2" data-item = "2"></div>
                <div @click = "changeSliderPic" :class = "['product-slider__simg']" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/2.jpg')})`}" data-category = "2" data-item = "1"></div>
                <div @click = "changeSliderPic" :class = "['product-slider__simg']" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/3.jpg')})`}" data-category = "2" data-item = "3"></div>
                <div @click = "changeSliderPic" :class = "['product-slider__simg']" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/1.jpg')})`}" data-category = "2" data-item = "1"></div>
                <div @click = "changeSliderPic" :class = "['product-slider__simg']" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/2.jpg')})`}" data-category = "2" data-item = "2"></div>
                <div @click = "changeSliderPic" :class = "['product-slider__simg']" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/3.jpg')})`}" data-category = "2" data-item = "3"></div>
                <div @click = "changeSliderPic" :class = "['product-slider__simg']" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/1.jpg')})`}" data-category = "2" data-item = "1"></div>
                <div @click = "changeSliderPic" :class = "['product-slider__simg']" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/2.jpg')})`}" data-category = "2" data-item = "2"></div>
                <div @click = "changeSliderPic" :class = "['product-slider__simg']" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/3.jpg')})`}" data-category = "2" data-item = "3"></div>
                <div @click = "changeSliderPic" :class = "['product-slider__simg']" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/3.jpg')})`}" data-category = "2" data-item = "3"></div>
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
        
        <div>
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

        changeSliderPic: function(){
            console.log(event.target)

            if (event.target.classList.contains('product-slider__active-img')) {
                return false
            }

            event.target.parentNode.children.forEach(el => {
                el.classList.remove('product-slider__active-img')
            });

            // Замена большой картинки

            if (document.querySelector('.product-slider__bimg')) {

                let category = event.target.getAttribute('data-category'),
                    item = event.target.getAttribute('data-item')

                console.log(event.target.getAttribute('data-category'))
                console.log(event.target.getAttribute('data-item'))

                this.mainPic = require(`../assets/pics/bouquets/${category}/${item}.jpg`)
            }

            event.target.classList.add('product-slider__active-img')
        },
        getParent: function(el, cls){
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el;
        }
    },
    mounted(){

            axios
            .get('//localhost:3000/products/id', {
                method: 'GET',
                params: {
                    'id': this.$route.params.id
                }
            }).then(response => {
                this.product = response.data[0]
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
    padding: 0 30px 30px 30px;
    box-sizing: border-box;
}

.product-slider__bimg {
    display: block;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
}

.product-slider__simg {
    flex-basis: 100px;
    width: 100px;
    height: 100px;
    margin-bottom: 5px;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    cursor: pointer;
}

.product-slider__active-img {
    outline: 1px solid rgb(139,191,211);
}

.product-slider__navigation {
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.product-slider__navigation:after{
    flex-basis: 100px;
    content: "";
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