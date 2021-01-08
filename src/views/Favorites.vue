<template>
    <div>
        <div class="favorite-warning">
            <span class = "bold-text">Здесь <span v-if = "!favorite_items.length">будут</span> собраны понравившиеся Вам товары.</span>
        </div>
        <div class="favorite-items-w">
            <Favorite_item
                v-for = "item in favorite_items"
                :key = "item.id"
                :items = 'item'
            />
        </div>
    </div>
</template>

<script>

import Favorite_item from '../components/Favorite_item'

export default {

    name: 'Favorite',
    data(){
        return {
            
        }
    },
    components: {
        Favorite_item
    },
    computed: {
        favorite_items(){
            return this.$store.state.favorite
        }
    }
}

</script>

<style>

.favorite-warning {
    background: #dbddde;
    border-radius: 3px;
    color: #363D40;
    text-align: center;
    padding: 20px;
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 30px;
}

.favorite-items-w {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

</style>