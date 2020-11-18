<template>
  <div>
    <MainLayout/>
  </div>
</template>

<script>

import MainLayout from './layouts/MainLayout'

export default {

  name : 'app',
  components: {
    MainLayout
  },
  created() {
    this.$store.dispatch('get_catalog')
    this.$store.dispatch('get_flowers_types')
    this.$store.dispatch('get_categories_data')
    this.$store.dispatch('get_all_colors')
  }
}

</script>

<style>
@import 'assets/css/style.css';
@import url('https://fonts.googleapis.com/css2?family=Pangolin&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Neucha&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Andika&display=swap');

/*body {font-family: 'Pangolin', cursive;}
body {font-family: 'Andika', sans-serif;}*/
body {font-family: 'Neucha', cursive;}
</style>
