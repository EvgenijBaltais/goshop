<template>
    
<div class = "catalog-item">
    <div class = "product-carousel">
        <div class="product-slider">
            <div class="product-slider__mainview">
                <img src="../assets/pics/bouquets/1/1.jpg" alt="" class = "product-slider__bimg">
            </div>
            <div class="product-slider__navigation">
                <div @click = "changeSliderPic" :class = "[product-slider__simg, product-slider__active-img]" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/1.jpg')})`}"></div>
                <div @click = "changeSliderPic" :class = "['product-slider__simg']" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/2.jpg')})`}" data-category = "2" data-item = "1"></div>
                <div @click = "changeSliderPic" class = "product-slider__simg" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/3.jpg')})`}" data-category = "2" data-item = "1"></div>
                <div @click = "changeSliderPic" class = "product-slider__simg" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/1.jpg')})`}" data-category = "2" data-item = "1"></div>
                <div @click = "changeSliderPic" class = "product-slider__simg" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/2.jpg')})`}" data-category = "2" data-item = "1"></div>
                <div @click = "changeSliderPic" class = "product-slider__simg" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/3.jpg')})`}" data-category = "2" data-item = "1"></div>
                <div @click = "changeSliderPic" class = "product-slider__simg" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/1.jpg')})`}" data-category = "2" data-item = "1"></div>
                <div @click = "changeSliderPic" class = "product-slider__simg" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/2.jpg')})`}" data-category = "2" data-item = "1"></div>
                <div @click = "changeSliderPic" class = "product-slider__simg" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/3.jpg')})`}" data-category = "2" data-item = "1"></div>
                <div @click = "changeSliderPic" class = "product-slider__simg" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/1.jpg')})`}" data-category = "2" data-item = "1"></div>
                <div @click = "changeSliderPic" class = "product-slider__simg" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/2.jpg')})`}" data-category = "2" data-item = "1"></div>
                <div @click = "changeSliderPic" class = "product-slider__simg" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/3.jpg')})`}" data-category = "2" data-item = "1"></div>
                <div @click = "changeSliderPic" class = "product-slider__simg" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/3.jpg')})`}" data-category = "2" data-item = "1"></div>
            </div>
        </div>
    </div>
    <div class = "product-description">
        <div class = "product-title">
            <div class="product-description__title">
                <span class = "product-description__span bold-text">Autumn Freesias & Roses</span>
            </div>
            <div class="product-description__price">
                <span class="product-description__span">£32</span>
            </div>
        </div>

        <div class = "product-text">
            <p class = "product-text__p">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, laborum minus et nesciunt qui voluptate quis ipsa voluptatem soluta sed, ad iure provident aspernatur corrupti odit dolore sint quas dicta.</p>
            <p class = "product-text__p">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, laborum minus et nesciunt qui voluptate quis ipsa voluptatem soluta sed, ad iure provident aspernatur corrupti odit dolore sint quas dicta.</p>
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
    </div>
</div>
    
</template>

<style>

.bold-text {
    font-weight: bold;
}

.catalog-item {
    display: flex;
    justify-content: space-between;
}

.product-carousel {
    width: calc(50% - 30px);
    outline: 1px solid green;
}

.product-slider__mainview {
    padding-bottom: 30px;
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
    margin-bottom: 12px;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    cursor: pointer;
}

.product-slider__active-img {
    outline: 1px solid rgb(139,191,211);
}

.product-slider__navigation {
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
    outline: 1px solid green;
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

</style>

<script>

export default {
    name: 'Catalog_item',
    data(){
        return {}
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

                console.log(event.target.getAttribute('data-category'))
                console.log(event.target.getAttribute('data-item'))

                //document.querySelector('.product-slider__bimg').setAttribute('src', '../assets/pics/bouquets/1/1.jpg')
            }

            event.target.classList.add('product-slider__active-img')
        },

        getParent: function(el, cls){
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el;
        }
    }
}
</script>