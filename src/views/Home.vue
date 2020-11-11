<template>
  <div>

    {{categories}}

      <DeliveryInfoStripe />
      <SlideSection />
      <SectionCarousel 
        v-for = 'item in categories'
        :key = 'item.id'
        :categories = "item"
        :products = "products"
      />

      <SubscribeBlock />

  </div>
</template>

<script>
// @ is an alias to /src

import DeliveryInfoStripe from '../components/DeliveryInfoStripe'
import SlideSection from '../components/SlideSection'
import SectionCarousel from '../components/SectionCarousel'
import SubscribeBlock from '../components/SubscribeBlock'

export default {
  name: 'Home',
  data(){
    return {}
  },
  components: {
    DeliveryInfoStripe, SlideSection, SectionCarousel, SubscribeBlock
  },
  computed: {
    categories(){
      return this.$store.state.categories
    },
    products(){
      return this.$store.state.productsByCategories[0]
    }
  },
  created() {
      this.$store.dispatch('get_categories_data')
  }
}
</script>