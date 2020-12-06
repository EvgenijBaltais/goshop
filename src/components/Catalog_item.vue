<template>
<div class = "catalog__item" :data-id = 'items.id'>
    <router-link :to = "{path: `/catalog/${items.id}`}" class = "catalog__piclink">
        <div class = "catalog__pic" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/' + items.img + '/1.jpg')})`}"></div>
    </router-link>
    <router-link :to = "{path: `/catalog/${items.id}`}" class = "catalog__titlelink">
        <div class = "catalog__title">{{items.title}}</div>
    </router-link>
        <div class = "catalog__description">{{items.short_description}}</div>
    <div class = "catalog__price">{{items.price}} руб.</div>
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
    box-sizing: border-box;
    flex-basis: 295px;
    margin-bottom: 25px;
}

.catalog__piclink {
    color: #000;
    text-decoration: none;
}
.catalog__titlelink {
    color: #000;
    text-decoration: none;
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
    margin: 10px 0;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    font-weight: bold;
}

.catalog__description {
    text-align: center;
}

.catalog:after {
    content: '';
    flex-basis: 265px;
}

</style>