<template>
<div class = "slider-section">
    <div class = "main-slider__wrapper">
        <div class = "main-slider">
            <div class = "main-slider__carousel">
                <router-link :to = "{path: `/catalog/bouquets/1`}">
                    <img :src="require('../assets/pics/bouquets/1/1.jpg')" alt="" class = "main-slider__mainpic">
                </router-link>
            </div>
            <div class = "main-slider__title">
                <p class = "slider-title">
                    <router-link :to = "{path: `/catalog/bouquets/1`}" class = "main-slider__href">Golden Sunshine</router-link>
                </p>
                <p class = "slider-price">
                    <router-link :to = "{path: `/catalog/bouquets/1`}" class = "main-slider__href">12 000 р</router-link>
                </p>
            </div>
            <div class = "main-slider__text">
                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.</span>
            </div>
        </div>
    </div>
    <div class = "info-banners">
        <div class = "info-banner">
            <div class="info-banner__pic">
                <img :src="require('../assets/pics/bouquets/2/1.jpg')" alt="" class = "main-slider__minipic">
            </div>
            <p class = "info-banner__title">Lorem ipsum dolor</p>
            <p class = "info-banner__price">25000р</p>
        </div>
        <div class = "info-banner">
            <div class="info-banner__pic">
                <img :src="require('../assets/pics/bouquets/3/1.jpg')" alt="" class = "main-slider__minipic">
            </div>
            <p class = "info-banner__title">Lorem ipsum dolor</p>
            <p class = "info-banner__price">25000р</p>
        </div>
        <div class = "info-banner">
            <div class="info-banner__pic">
                <img :src="require('../assets/pics/bouquets/4/1.jpg')" alt="" class = "main-slider__minipic">
            </div>
            <p class = "info-banner__title">Lorem ipsum dolor</p>
            <p class = "info-banner__price">25000р</p>
        </div>
        <div class = "info-banner">
            <div class="info-banner__pic">
                <img :src="require('../assets/pics/bouquets/5/1.jpg')" alt="" class = "main-slider__minipic">
            </div>
            <p class = "info-banner__title">Lorem ipsum dolor</p>
            <p class = "info-banner__price">25000р</p>
        </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'SlideSection',
  data(){
      return {}
  }
}
</script>

<style scoped>

    .slider-section {
        display: flex;
        justify-content: space-between;
    }

    .main-slider__carousel {
    }

    .main-slider__mainpic {
        max-width: 100%;
        display: block;
    }

    .main-slider__wrapper {
        width: calc(50% - 15px);
        min-height: 300px;
    }

    .info-banners {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        flex-wrap: wrap;
        width: calc(50% - 15px);
        min-height: 300px;
    }

    .info-banner {
        width: calc(50% - 15px);
        margin-bottom: 30px;
        min-height: 250px;
    }
    
    .info-banner__pic {
        height: 255px;
        position: relative;
    }

    .main-slider__minipic {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }

    .main-slider__title {
        display: flex;
        justify-content: space-between;
        padding: 20px 20px 10px 20px;
        box-sizing: border-box;
    }

    .slider-title {
        color: #363D40;
        font-size: 24px;
        line-height: 30px;
        font-weight: bold;
    }

    .slider-price {
        width: 120px;
        text-align: right;
        font-size: 24px;
        line-height: 30px;
        color: #576167;
    }

    .main-slider__text {
        padding: 10px 20px 10px 20px;
        box-sizing: border-box;
    }

    /* mini sliders */

    .info-banner__title {
        padding-top: 5px;
        font-size: 16px;
        line-height: 18px;
        font-weight: bold;
        text-align: center;
    }

    .info-banner__price {
        padding-top: 5px;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
    }

    .main-slider__href {
        color: #000!important;
        text-decoration: none;
    }

</style>