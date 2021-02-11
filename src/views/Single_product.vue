<template>
<div class = "single-product">
    <div class = "product-carousel">
        <div class="product-slider">
            <div class="product-slider__mainview">
                <img v-if = "images.length" :src = "require('../assets/pics/products/' + images[0].id + '.jpg')" alt="" :class = "['product-slider__bimg']">
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
        <div class = "product-amount-info">
            <p class = "product-amount-text">
                <span class = "product-amount-text-span">Количество:</span>
                <a class = "product-decrease-value" @click = "decreaseValue">−</a>
                <span class = "product-amount-text-value">1</span>
                <a class = "product-increase-value" @click = "increaseValue">+</a>
            </p>
            <p class = "product-price-text">
                <span class = "product-amount-price">Сумма заказа: </span>
                <span class = "product-amount-price-value">
                    <span class = "product-final-value"> {{product.price}}</span> руб
                </span>
            </p>
        </div>
        <div class="product-contains" v-on:click = "openContainer()">
            <div class="product-contains__title">
                <span>Состав букета:</span>
                <img src="../assets/icons/to-bottom.svg" alt="" class = "to-bottom-arrow">
            </div>
            <div class="product-contains__inside">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis consequuntur numquam fuga! Dolorum sapiente necessitatibus, dicta totam eaque sit laborum quasi quas, deserunt natus saepe fugiat. Molestiae praesentium accusantium eius?
            </div>
        </div>
        <div class = "order-datepicker-wrap">
            <div class = "datepicker-title">
                <span>Выберите дату заказа:</span>
            </div>
            <div class = "order-datepicker-insert"></div>
            <div class = "when-choose">
                <p class = "order-info-item">Вы выбрали дату: <span class = "choosen-date" id = "choosen-date"></span></p>
                <p class = "order-info-item">Выберите предпочтительное время:</p>
                <div class = "time-variants">
                    <div class = "time-item" @click = "activateTime">10:00</div>
                    <div class = "time-item" @click = "activateTime">11:00</div>
                    <div class = "time-item" @click = "activateTime">12:00</div>
                    <div class = "time-item" @click = "activateTime">13:00</div>
                    <div class = "time-item" @click = "activateTime">14:00</div>
                    <div class = "time-item" @click = "activateTime">15:00</div>
                    <div class = "time-item" @click = "activateTime">16:00</div>
                    <div class = "time-item" @click = "activateTime">17:00</div>
                    <div class = "time-item" @click = "activateTime">18:00</div>
                    <div class = "time-item" @click = "activateTime">19:00</div>
                    <div class = "time-item" @click = "activateTime">20:00</div>
                    <div class = "time-item" @click = "activateTime">21:00</div>
                    <div class = "time-item" @click = "activateTime">22:00</div>
                    <div class = "time-item" @click = "activateTime">23:00</div>
                    <div class = "time-item" @click = "activateTime">24:00</div>
                </div>
            </div>
        </div>
        <div class = "order-details">
            <div class = "order-details-form">
                <div class = "order-details-text">
                    <p>Оставьте Ваши контактные данные для уточнения деталей и подтверждения заказа.<br>
                        Мы свяжемся с Вами и уточним все нюансы.<br>
                        Для этого достаточно указать номер телефона, остальные поля по желанию:
                    </p>
                </div>
                <form action="/" class = "order-data-fields">
                    <input type="phone" class = "order-data-phone mandatory-info" placeholder = "+7 (___) ___-__-__">
                    <input type="name" class = "order-data-name" placeholder = "Ваше имя">
                    <input type="email" class = "order-data-email" placeholder = "_@_.__">
                    <input type="adress" class = "order-data-adress" placeholder = "Адрес доставки">
                    <textarea name="additional-info"  class = "order-data-additional" placeholder = "Дополнительные пожелания"></textarea>
                    <button class = "send-order" @click.prevent = "sendOrder()">Отправить заказ!</button>
                </form>
            </div>
            <div class = "item-order-w">
                <button class="item-order" @click = "getOrderForm()">Оформить заказ</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>

const pickmeup = require('pickmeup/dist/pickmeup.min.js')
import Inputmask from "inputmask"
import axios from 'axios'

export default {
    name: 'Single_product',
    components: {},
    data(){
        return {
            product: {},
            images: [],
            sendingForm: 0
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
        makeOrder: function(){

        },
        addToCart() {
            this.$store.dispatch({
                type: 'addToCart',
                id: this.product_id,
                amount: 1
            })
        },
        formatDate(date){
            var dd = date.getDate();
            if (dd < 10) dd = '0' + dd;

            var mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;

            var yy = date.getFullYear();
            if (yy < 10) yy = '0' + yy;

            return yy + '-' + mm + '-' + dd;
        },
        getOrderForm: function(){

            const offsetTop = event.target.offsetTop + 120

            if (event.target.classList.contains('item-order-active')) {
                document.querySelector('.order-details-form').removeAttribute('style')
                event.target.classList.remove('item-order-active')
                event.target.innerText = "Оформить заказ"
                return false
            }
            else {
                document.querySelector('.order-details-form').style.display = "block"
                event.target.classList.add('item-order-active')
                event.target.innerText = "Скрыть данные заказа"
            }

            scroll({
                top: offsetTop,
                behavior: "smooth"
            });
        },
        sendOrder: function(){

            if (this.sendingForm != 0) return false

            if (!document.querySelector('.order-data-phone').inputmask.isComplete()) {
                document.querySelector('.order-data-phone').style.outline = '1px solid red'
                return false
            }

            this.sendingForm = 1

            let clientData = {}

            // Телефон
            clientData.phone = document.querySelector('.order-data-phone').value

            // Дата
            document.getElementById('choosen-date').innerText.length == 10 ?
            clientData.date = this.formatDate(pickmeup('.order-datepicker-insert').get_date()) : ''

            // Время
            document.querySelector('.time-item-active') ?
            clientData.time = document.querySelector('.time-item-active').innerText : ''

            // Имя
            document.querySelector('.order-data-name').value ?
            clientData.name = document.querySelector('.order-data-name').value : ''

            // Email
            document.querySelector('.order-data-email').value
            && document.querySelector('.order-data-email').value.indexOf('@') != -1
            ? clientData.email = document.querySelector('.order-data-email').value : ''

            // Адрес
            document.querySelector('.order-data-adress').value
            ? clientData.adress = document.querySelector('.order-data-adress').value : ''

            // Дополнительная инфа
            document.querySelector('.order-data-additional').value
            ? clientData.additional = document.querySelector('.order-data-additional').value : ''

            // Инфа по товару

            let order = {},
                amount = parseInt(document.querySelector('.product-amount-text-value').innerText)

                order[0] = {
                    id: this.product.id,
                    amount: amount,
                    price: this.product.price * amount
                }

            clientData.order = JSON.stringify(order)

            // Клиент
            document.body.getAttribute('client_id') ?
            clientData.client = document.body.getAttribute('client_id') : ''

            // Номер формы
            clientData.form_id = 1

            let ev = event.target

            axios.interceptors.request.use((req) => {
                    ev.innerText = "Отправляем..."
                    return req
                }
            )

            axios.interceptors.response.use((res) => {
                    return res
                }
            )

            axios
            .post('//localhost:3000/send_order', {
                params: {
                    'clientData': clientData
                }
            }).then(response => {
                response.data == "Нет телефона" ? ev.innerText = "Не введен телефон!" : ev.innerText = "Успех!"
                setTimeout(() => {
                    ev.innerText = "Отправить заказ!"
                    this.sendingForm = 0
                }, 2000)
            })
        },
        increaseValue: function(){
            let parent = this.getParent(event.target, 'product-amount-text'),
                value = parseInt(parent.querySelector('.product-amount-text-value').innerText)
                value < 100 ? parent.querySelector('.product-amount-text-value').innerText = value + 1 : ''

                document.querySelector('.product-final-value').innerText = this.product.price * (value + 1)
        },
        decreaseValue: function(){
            let parent = this.getParent(event.target, 'product-amount-text'),
                value = parseInt(parent.querySelector('.product-amount-text-value').innerText)

                if (value < 2) return false

                parent.querySelector('.product-amount-text-value').innerText = value - 1
                document.querySelector('.product-final-value').innerText = this.product.price * (value - 1)
        },
        getParent: function(el, cls){
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el;
        },
        getClickedElementIndex: function(arr) {
            for (let i = 0; i < arr.length; i++) {
                if (event.target == arr[i]) return i;
            }
        },
        activateTime: function(){
           
           if (event.target.parentNode.querySelector('.time-item-active')) {
               event.target.parentNode.querySelector('.time-item-active').classList.remove('time-item-active')
           }
            event.target.classList.add('time-item-active')
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

            // Календарь для заказа

            pickmeup.defaults.locales['ru'] = {
                days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
            };

            pickmeup('.order-datepicker-insert', {
                'calendars': 2,
                'locale': 'ru',
                'current': 1,
                'class_name': 'order-datepicker',
                'min': new Date,
                'format': 'd.m.Y',
                'select_year': false
            })

            pickmeup('.order-datepicker-insert').show();

            document.querySelector('.order-datepicker-insert').addEventListener('pickmeup-change', function (e) {
                
                document.querySelector('.when-choose').style.display = 'block'
                document.getElementById('choosen-date').innerText = e.detail.formatted_date
            })

            // Маска телефона
            
            let im = new Inputmask("+7 (999) 999-99-99")
                im.mask(document.querySelector(".order-data-phone"))

            document.querySelector('.order-data-phone').addEventListener('keyup', function(){
                event.target.style.outline = '1px solid #94CBE0'
            })
            document.querySelector('.order-data-phone').addEventListener('focus', function(){
                event.target.style.outline = '1px solid #94CBE0'
            })
    }
}
</script>

<style>
@import '../../node_modules/pickmeup/css/pickmeup.css';

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
    font-size: 18px;
    line-height: 24px;
}

.order-details-text {
    font-size: 18px;
    line-height: 24px;  
}

.product-contains {
    margin: 0 0 10px 0;
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

.item-order-w {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.item-order {
    display: block;
    margin: 20px 0;
    border-radius: 3px;
    width: 100%;
    height: 90px;
    font-size: 20px;
    line-height: 90px;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    border: 0;
    outline: 0;
    background: #136A9F;
    transition: background-color .2s;
    user-select: none;
    letter-spacing: 1px;
    font-family: 'Neucha', cursive;
}

.item-order:hover {
    background: #008029;
    transition: background-color .2s;
}

/* Календарь */

.datepicker-title {
    background: #94cbe0;
    color: #fff;
}

.order-datepicker-insert {
    position: relative;
    box-sizing: border-box;
}

.order-datepicker-wrap {
    border: 1px solid #94CBE0;
    box-sizing: border-box;
    border-radius: 3px;
    background: #F6F6F6;
    overflow: hidden;
}

.order-datepicker-insert .pickmeup {
    position: relative;
    display: block;
    border-radius: 0;
    background: #F6F6F6;
    top: 0!important;
    left: 0!important;
}
.order-datepicker-insert .pmu-instance {
    width: 50%;
}
.datepicker-title {
    padding: 12px 20px;
    box-sizing: border-box;
    font-size: 18px;
    line-height: 24px;
    font-weight: bold;
}
.pickmeup .pmu-instance .pmu-month {
    color: #363D40;
    font-size: 18px;
    line-height: 30px;
    font-weight: bold;
    letter-spacing: 2px;
}

.pickmeup .pmu-instance:first-child .pmu-prev,
.pickmeup .pmu-instance:last-child .pmu-next {
    display: block;
    width: 30px;
    height: 30px;
    font-family: 'verdana';
    color: #fff!important;
    text-align: center;
    font-size: 24px;
    line-height: 30px;
    font-weight: bold;
    border-radius: 50%;
    background: #94CBE0;
}

.pickmeup .pmu-instance .pmu-day-of-week {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    color: #292B2C;
    font-weight: bold;
}
.pickmeup .pmu-instance {
    height: auto;
}
.pmu-days {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.pmu-months {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-top: 20px
}

.pmu-months .pmu-button {
    margin-bottom: 5px;
    background: #94CBE0;
}

.pmu-view-months .pmu-instance .pmu-button:hover {
    background: #136A9F;
    color: #fff;
}

.pickmeup .pmu-days .pmu-button {
    width: 35px;
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    border: 1px solid #8A979E;
    box-sizing: border-box;
    margin-bottom: 2px;
    background: #fff;
    color: #576167;
}

.pickmeup .pmu-days .pmu-disabled.pmu-button {
    color: #c8c8c8;
    cursor: default;
}

.pickmeup .pmu-days .pmu-selected.pmu-button {
    background: #E3F1F7!important;
}

.pickmeup .pmu-days .pmu-today.pmu-button {
    background: #F0FEFF;
}

.pickmeup .pmu-days .pmu-disabled.pmu-button {
    color: #DDDDE8;
}

.order-selected-info {
    border: 1px solid #94CBE0;
    border-top: 0;
    background: #F6F6F6;
    padding: 12px 20px;
    border-radius: 0 0 3px 3px;
    margin-top: -2px;
}

.order-info-item {
    padding: 10px 5px 0 0;
    font-size: 18px;
    line-height: 20px;
}

.when-choose {
    display: none;
    padding: 10px 20px 20px 20px;
}

.choosen-date {
    font-weight: bold;
    letter-spacing: 1px;
}

.time-variants {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
}

.time-item {
    width: 18%;
    margin-right: 2.5%;
    padding: 10px 0;
    text-align: center;
    margin-bottom: 10px;
    color: #fff;
    font-size: 18px;
    line-height: 18px;
    text-align: center;
    border-radius: 5px;
    background: #136A9F;
    cursor: pointer;
    user-select: none;
}

.time-item-active {
    background: #008029;
}

.time-item:nth-child(5n) {
    margin-right: 0;
}

.order-details {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
}

.order-details-form {
    display: none;
    width: 100%;
    padding-top: 30px;
}

.order-data-name {
    display: block;
    outline: 1px solid #94CBE0!important;
    border: 0!important;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
    padding: 10px;
    font-size: 18px;
    letter-spacing: 1px;
    line-height: 20px;
    font-family: 'Neucha', cursive;
    color: #757575;
}
.order-data-email {
    display: block;
    outline: 1px solid #94CBE0!important;
    border: 0!important;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
    padding: 10px;
    font-size: 18px;
    line-height: 20px;
    letter-spacing: 1px;
    font-family: 'Neucha', cursive;
    color: #757575;
}
.order-data-phone {
    display: block;
    outline: 1px solid #94CBE0;
    border: 0!important;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
    padding: 10px;
    font-size: 18px;
    line-height: 20px;
    letter-spacing: 1px;
    font-family: 'Neucha', cursive;
    color: #757575;
}
.order-data-adress {
    display: block;
    outline: 1px solid #94CBE0!important;
    border: 0!important;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
    padding: 10px;
    font-size: 18px;
    line-height: 20px;
    letter-spacing: 1px;
    font-family: 'Neucha', cursive;
    color: #757575;
}
.order-data-additional {
    display: block;
    outline: 1px solid #94CBE0!important;
    border: 0!important;
    box-sizing: border-box;
    width: 100%;
    height: 140px;
    margin-bottom: 20px;
    padding: 10px;
    font-size: 18px;
    line-height: 20px;
    letter-spacing: 1px;
    font-family: 'Neucha', cursive;
    resize: vertical;
    color: #757575;
}
.order-data-fields {
    width: 75%;
}
.order-data-fields input::-webkit-input-placeholder {font-size: 18px;line-height: 20px;font-family: 'Neucha', cursive;letter-spacing: 1px;}
.order-data-fields input::-moz-placeholder {font-size: 18px;line-height: 20px;font-family: 'Neucha', cursive;letter-spacing: 1px;}
.order-data-fields input:-moz-placeholder {font-size: 18px;line-height: 20px;font-family: 'Neucha', cursive;letter-spacing: 1px;}
.order-data-fields input:-ms-input-placeholder {font-size: 18px;line-height: 20px;font-family: 'Neucha', cursive;letter-spacing: 1px;}
.order-data-additional::-webkit-input-placeholder {font-size: 18px;line-height: 20px;font-family: 'Neucha', cursive;letter-spacing: 1px;}
.order-data-additional::-moz-placeholder {font-size: 18px;line-height: 20px;font-family: 'Neucha', cursive;letter-spacing: 1px;}
.order-data-additional:-moz-placeholder {font-size: 18px;line-height: 20px;font-family: 'Neucha', cursive;letter-spacing: 1px;}
.order-data-additional:-ms-input-placeholder {font-size: 18px;line-height: 20px;font-family: 'Neucha', cursive;letter-spacing: 1px;}

.send-order {
    display: block;
    background: #136A9F;
    border: 0!important;
    outline: 0!important;
    width: 60%;
    text-align: center;
    height: 50px;
    color: #fff;
    font-size: 16px;
    line-height: 20px;
    font-family: 'Arial';
    font-weight: bold;
    cursor: pointer;
    border-radius: 3px;
    letter-spacing: 1px;
    font-family: 'Neucha', cursive;
    transition: background .3s;
}
.send-order:hover {
    background: #008029;
    transition: background .3s;
}
.item-order-active {
    text-align: left;
    width: 210px;
    padding: 0 20px;
    height: 40px;
    margin: 30px 0;
    line-height: 40px;
    font-size: 14px;
    font-weight: normal;
    color: #fff;
    background-color: #94CBE0;
    background-image: url('../assets/icons/top.svg');
    background-position: 95% center;
    background-size: 20px;
    background-repeat: no-repeat;
}

.item-order-active:hover {
    background-color: #94CBE0;
    background-image: url('../assets/icons/top.svg');
    background-position: 95% center;
    background-size: 20px;
    background-repeat: no-repeat;
}

.order-details-text {
    padding-bottom: 30px;
}

.product-amount-info {
    padding: 10px;
    border-top: 1px solid #E4E4E4;
}
.product-amount-text {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
}

.product-price-text {
    display: flex;
    align-items: center;
}

.product-amount-price {
    font-size: 18px;
    line-height: 24px;
    padding-right: 10px;
}

.product-amount-price-value {
    font-size: 22px;
    line-height: 24px;
    font-weight: bold;
}

.product-amount-text-span {
    font-size: 18px;
    line-height: 24px;
    padding-right: 20px;
    user-select: none;
}
.product-decrease-value {
    font-size: 24px;
    line-height: 30px;
    font-weight: bold;
    padding: 0 10px;
    cursor: pointer;
    user-select: none;
}
.product-increase-value {
    font-size: 24px;
    line-height: 30px;
    font-weight: bold;
    padding: 0 10px;
    cursor: pointer;
    user-select: none;
}

.product-amount-text-value {
    font-size: 22px;
    line-height: 30px;
    cursor: pointer;
    user-select: none;
}

/* Календарь, конец */

</style>