<template>
<div class = "search-wrapper">
    <div class="search-warning">
        <span class = "bold-text">Результаты поиска по вашему запросу:</span>
    </div>
    <Search_item v-for = "(item, index) in searchData" :key = 'item.id' :items = "item" :number="index"/>
    <div v-if = "!searchData.length">
        <span class = "search-not-found">
            Ничего не найдено!<br>
            Воспользуйтесь поиском в шапке сайта, чтобы подобрать интересующие Вас товары.
        </span>
    </div>
</div>
</template>

<script>
import Search_item from '../components/Search_item'
export default {

    name: 'SearchPage',
    data(){
        return {
            
        }
    },
    components: {
        Search_item
    },
    mounted(){

        if (this.searchData.data) {
            2
        }
        else {
            // /this.$router.push({path: '/catalog'})
        }
    },
    computed: {
        
        searchData(){
            return this.$store.state.search
        }
    }
}

</script>

<style>

.search-warning {
    background: #dbddde;
    border-radius: 3px;
    color: #363D40;
    text-align: center;
    padding: 20px;
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 30px;
}

.search-wrapper {
    padding-bottom: 50px;
    padding-top: 20px;
    min-height: 200px;
}

.search-not-found {
    font-size: 20px;
    line-height: 24px;
}

</style>