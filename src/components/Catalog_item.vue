<template>
<div class = "catalog__item" :data-id = 'items.id'>

    <div class = "catalog__pic" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/' + items.img + '/1.jpg')})`}"></div>
  
    <div class = "catalog__title">{{items.title}}</div>
    <div class = "catalog__description">{{items.short_description}}</div>
    <div class = "catalog__price">{{items.price}}</div>
</div>
</template>


<script>

export default {
    name: 'Catalog_item',
    props: {
        items: {
            type: Object,
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
    border: 1px solid grey;
    box-sizing: border-box;
    flex-basis: 265px;
    margin-bottom: 25px;
}

.catalog__pic {
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    height: 250px;
}

.catalog__title {
    text-align: center;
    margin: 20px 0 10px 0;
    font-weight: bold;
}

.catalog__price {
    margin: 20px 0 10px 0;
    text-align: center;
    font-weight: bold;
}

.catalog__text {
    text-align: center;
}

.catalog:after {
    content: '';
    flex-basis: 265px;
}

</style>