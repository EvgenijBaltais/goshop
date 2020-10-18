<template>
<div class = "slider-section">
    <div class = "main-slider__wrapper">
        <div class = "main-slider">
            <div class = "main-slider__carousel">
            </div>
            <div class = "main-slider__title">
                <p class = "slider-title">Golden Sunshine</p>
                <p class = "slider-price">12 000 р</p>
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
            </div>
            <p class = "info-banner__title">Lorem ipsum dolor</p>
            <p class = "info-banner__price">25000р</p>
        </div>
        <div class = "info-banner">
            <div class="info-banner__pic">
            </div>
            <p class = "info-banner__title">Lorem ipsum dolor</p>
            <p class = "info-banner__price">25000р</p>
        </div>
        <div class = "info-banner">
            <div class="info-banner__pic">
            </div>
            <p class = "info-banner__title">Lorem ipsum dolor</p>
            <p class = "info-banner__price">25000р</p>
        </div>
        <div class = "info-banner">
            <div class="info-banner__pic">	
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

    .main-slider__wrapper {
        width: calc(50% - 15px);
        outline: 1px solid red;
        min-height: 300px;
    }

    .info-banners {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        flex-wrap: wrap;
        width: calc(50% - 15px);
        outline: 1px solid red;
        min-height: 300px;
    }

    .info-banner {
        width: calc(50% - 15px);
        margin-bottom: 30px;
        outline: 1px solid red;
        min-height: 250px;
    }
    

    .main-slider__title {
        display: flex;
        justify-content: space-between;
        padding: 20px 20px 10px 20px;
        box-sizing: border-box;
    }

    .slider-title {
        outline: 1px solid red;
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
        outline: 1px solid red;
    }

    .main-slider__text {
        padding: 10px 20px 10px 20px;
        box-sizing: border-box;
    }

    /* mini sliders */

    .info-banner__title {
        padding-top: 5px;
        font-size: 16px;
        line-height: 20px;
        font-weight: bold;
        text-align: center;
    }

    .info-banner__price {
        padding-top: 5px;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
    }

</style>