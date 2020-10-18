<template>

<div>
каталог

<button class = "get-items" @click = "getProducts()">Получить товары</button>

</div>

</template>

<style scoped>

</style>

<script>

//import axios from 'axios'

export default {

    data(){
        return {}
    },
    components: {


    },
    computed: {
        items(){
            console.log('вызов')
            return this.$store.state.catalogItems
        }
    },
    methods: {

        getProducts(){
            console.log(this.items)
        }
    },
  created() {

    this.$store.dispatch('get_catalog')
  }
}

</script>