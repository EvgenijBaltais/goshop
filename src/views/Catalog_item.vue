<template>
    
<div class = "catalog-item">
    <div class = "product-carousel">
        <div class="product-slider">
            <div class="product-slider__mainview">
                <img src="" alt="" class = "product-slider__bimg">
            </div>
            <div class="product-slider__navigation">
                <img src="" alt="" class = "product-slider__simg">
                <img src="" alt="" class = "product-slider__simg">
                <img src="" alt="" class = "product-slider__simg">
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

.product-slider__bimg {
    display: block;
}

.product-slider__simg {
    display: block;
    width: 60px;
    margin-right: 10px;
}

.product-slider__simg:last-child {
    margin-right: 0;
}

.product-slider__navigation {
    display: flex;
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
        getParent: function(el, cls){
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el;
        }
    }
}
</script>