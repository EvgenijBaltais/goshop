<template>
    
<div class = "catalog-item">
    <div class = "product-carousel">
        <div class="product-slider">11

            <div class="product-slider__mainview">

            </div>
            <div class="product-slider__navigation">

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

        <div class="product-contains">
            <div class="product-contains__title">

            </div>
            <div class="product-contains__inside">
                
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
}

.product-contains__title {
    display: flex;
}


</style>

<script>

export default {
    name: 'Catalog_item',
    data(){
        return {}
    }
}
</script>