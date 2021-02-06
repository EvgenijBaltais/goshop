<template>
  <div>
      <DeliveryInfoStripe />
      <SlideSection />
      <BestsellersSection />
      <SectionCarousel 
        v-for = 'item in categories'
        :key = 'item.id'
        :categories = "item"
      />
      <SubscribeBlock />
  </div>
</template>

<script>
// @ is an alias to /src

import DeliveryInfoStripe from '../components/DeliveryInfoStripe'
import SlideSection from '../components/SlideSection'
import BestsellersSection from '../components/BestsellersSection'
import SectionCarousel from '../components/SectionCarousel'
import SubscribeBlock from '../components/SubscribeBlock'

export default {
  name: 'Home',
  data(){
    return {}
  },
  components: {
    DeliveryInfoStripe, SlideSection, SectionCarousel, SubscribeBlock, BestsellersSection
  },
  computed: {
    categories(){
      return this.$store.state.categories
    }
  }
}
</script>