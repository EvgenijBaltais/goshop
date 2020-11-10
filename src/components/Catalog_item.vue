<template>
<div class = "catalog__item" :data-id = 'items.id'>

    <div class = "catalog__pic" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/' + items.img + '/1.jpg')})`}"></div>
  
    <div class = "catalog__title">{{items.title}}</div>
    <div class = "catalog__price">{{items.price}}</div>

    <div class = "catalog__text">{{items.title}}</div>
</div>
</template>


<script>

export default {
    name: 'Catalog_item',
    props: {
        items: {
            type: Object(),
            default(){}
        }
    },
    data(){
        return {}
    },
    methods: {


    }
}

</script>

<style scoped>

.catalog__item {
    border: 1px solid red;
    box-sizing: border-box;
    flex-basis: 250px;
    min-height: 200px;
    margin-bottom: 25px;
}

.catalog__pic {
    background-repeat: no-repeat;
    background-size: cover;
    height: 150px;
}

.catalog__title {
    text-align: center;
    margin: 10px;
    font-weight: bold;
}

.catalog__price {
    margin: 20px 0;
    text-align: center;
    font-weight: bold;
}

.catalog__text {

    text-align: left;
}

</style>